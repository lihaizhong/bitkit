import { MessageStatus, MessageTypeEnum } from "./constants/message";
import { POINT_SIGNAL_REG } from "./constants/signals";
import { journal } from "./utils/Journal";
import { MessageBody, MessageNotification, MessageRequest, MessageResponse } from "./utils/MessageBody";
import { MessageQueue, MessageReadyBody } from "./utils/MessageQueue";
import { MessageSink } from "./utils/MessageSink";

export type PointController = (...params: any[]) => any;

export type PointSubscriptionCallback = (data: any) => void;

export interface PointSubscription {
  success: Record<string, PointSubscriptionCallback>;
  error: Record<string, PointSubscriptionCallback>;
}

export class CorePoint {
  private port: MessagePort | null = null;

  private body: MessageBody<any> = new MessageBody();

  private queue: MessageQueue = new MessageQueue();

  private controllers: Record<string, PointController> = {};

  private subscriptions: PointSubscription = {
    success: {},
    error: {}
  };

  protected isReady: boolean = false;

  static checkIdentification(id: string): boolean {
    return typeof id === 'string' && id !== '';
  }

  /**
   * 获取协议类型
   * @param data
   * @returns
   */
  private getProtocolType(data: any): string {
    if (MessageBody.checkProtocol(data)) {
      return MessageBody.type;
    }

    if (typeof data === 'string' && POINT_SIGNAL_REG.test(data)) {
      return 'signal';
    }

    return '';
  }

  /**
   * 处理json-rpc协议消息
   * @param event
   */
  protected handleJsonRPCMessage(event: MessageEvent): void {
    const sink = new MessageSink(event.data);

    // 处理通知消息
    sink.onNotify(async (data: MessageNotification<any>) => {
      try {
        const { method, params } = data;

        // 检查调用的方法是否存在
        if (!(typeof this.controllers[method] === 'function')) {
          throw new Error(`method[${method}] does not declare!`);
        }

        const fn = this.controllers[method];

        // 检查方法的参数个数是否一致
        if (fn.length !== params.length) {
          throw new Error(`method[${method}] invalid method parameters`);
        }

        await fn(...params)
        journal.success('notify success!', data);
      } catch (ex) {
        // 捕获未知的异常情况
        journal.error('notify fail!', data, ex);
      }
    });

    // 处理请求消息
    sink.onRequest(async (data: MessageRequest<any>) => {
      try {
        const { method, params } = data;

        // 检查id是否合法
        if (!CorePoint.checkIdentification(data.id)) {
          this.postErrorMessage(data.id, 'NotWellFormed');
          return;
        }

        // 检查调用的方法是否存在
        if (!(typeof this.controllers[method] === 'function')) {
          this.postErrorMessage(data.id, 'NotFound');
          return;
        }

        const fn = this.controllers[method];

        // 检查方法的参数个数是否一致
        if (fn.length > params.length) {
          this.postErrorMessage(data.id, 'InvalidMethodParameters');
          return;
        }

        const result = await fn(...params);

        this.postSuccessMessage(data.id, result || null);
        journal.success('request success!', data, result);
      } catch (ex) {
        // 捕获未知的异常情况并发送错误消息
        this.postErrorMessage(data.id, 'InternalRPCError');
        journal.error('request fail!', data, ex);
      }
    })

    // 处理响应消息
    sink.onResponse(async (data: MessageResponse<any>) => {
      const { success } = this.subscriptions;

      journal.success('response success!', data.result);

      if (typeof success[data.id] === 'function') {
        try {
          // 得到响应后执行订阅消息
          await success[data.id](data.result);
          delete success[data.id];
          journal.success('success subscription success!', data.result);
        } catch (ex) {
          // 捕获未知的异常情况
          journal.error('success subscription fail!', data.result, ex);
        }
      }
    });

    // 处理错误消息
    sink.onError(async (data: MessageResponse<any>) => {
      if (CorePoint.checkIdentification(data.id)) {
        const { error } = this.subscriptions;

        if (typeof error[data.id] === 'function') {
          try {
            // 得到响应后执行订阅消息
            await error[data.id](data.error);
            delete error[data.id];
            journal.success('error subscription success!', data.error);
          } catch (ex) {
            // 捕获未知的异常情况
            journal.error('error subscription fail!', data.error, ex);
          }
        }
      }

      journal.error(data.error);
    });

    sink.bootstrap();
  }

  /**
   * 处理信号消息
   * @param event
   */
  protected handleSignalMessage(event: MessageEvent): void { }

  /**
   * 建立通信连接
   * @param port
   */
  protected connect(port: MessagePort) {
    this.port = port;

    port.onmessage = (event: MessageEvent) => {
      // 根据协议类型，处理通信消息
      switch (this.getProtocolType(event.data)) {
        case MessageBody.type:
          this.handleJsonRPCMessage(event);
          break
        case 'signal':
          this.handleSignalMessage(event);
          break
        default:
          this.postErrorMessage('UNKNOWN', 'InvalidRPC');
      }
    }
  }

  /**
   * 连接成功后，统一处理等待的消息
   */
  protected ready() {
    let data: MessageReadyBody | undefined;

    while (data = this.queue.pop()) {
      this.port?.postMessage(data.body);
    }
  }

  /**
   * 标准的消息处理
   * @param type
   * @param data
   */
  private postNormalizeMessage(type: number, data: any): void {
    if (this.isReady) {
      this.port?.postMessage(data);
    } else {
      this.queue.push({ type, body: data });
    }
  }

  /**
   * 处理标准的成功消息
   * @param id
   * @param result
   */
  protected postSuccessMessage(id: string, result: any): void {
    const payload = this.body.response(id, result);

    this.postNormalizeMessage(MessageTypeEnum.RESPONSE, payload);
  }

  /**
   * 处理标准的失败消息
   * @param id
   * @param type
   */
  protected postErrorMessage(id: string, type: string): void {
    const errorInfo: any = MessageStatus[type];
    const payload = this.body.error(id, errorInfo.code, errorInfo.message);

    this.postNormalizeMessage(MessageTypeEnum.ERROR, payload);
  }

  /**
   * 声明远程调用的函数
   * @param method
   * @param fn
   */
  declare(method: string, fn: PointController): void {
    this.controllers[method] = fn;
  }

  /**
   * 发送通知消息
   * @param method
   * @param params
   */
  notify(method: string, ...params: any[]): void {
    const payload = this.body.notify(method, params);

    this.postNormalizeMessage(MessageTypeEnum.NOTIFY, payload);
  }

  /**
   * 调用远程函数
   * @param method
   * @param params
   * @returns
   */
  invoke(method: string, ...params: any[]): string {
    const payload = this.body.request(method, params);

    this.postNormalizeMessage(MessageTypeEnum.REQUEST, payload);

    return payload.id;
  }

  /**
   * 订阅返回成功的消息，仅invoke有效
   * @param id
   * @param fn
   */
  subscribe(id: string, fn: PointSubscriptionCallback): void {
    if (CorePoint.checkIdentification(id)) {
      this.subscriptions.success[id] = fn;
    }
  }

  /**
   * 订阅返回失败的消息，仅invoke有效
   * @param id
   * @param fn
   */
  error(id: string, fn: PointSubscriptionCallback): void {
    if (CorePoint.checkIdentification(id)) {
      this.subscriptions.error[id] = fn;
    }
  }
}
