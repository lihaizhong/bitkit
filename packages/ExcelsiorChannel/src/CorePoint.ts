import { MessageStatus, MessageTypeEnum } from "./constants/message";
import { POINT_SIGNAL_REG } from "./constants/signals";
import { journal } from "./utils/Journal";
import { MessageBody, MessageNotification, MessageRequest, MessageResponse } from "./utils/MessageBody";
import { MessageQueue, MessageReadyBody } from "./utils/MessageQueue";
import { MessageSink } from "./utils/MessageSink";

export type PointController = (...params: any[]) => any;

export class CorePoint {
  private port: MessagePort | null = null;

  private body: MessageBody<any> = new MessageBody();

  private queue: MessageQueue = new MessageQueue();

  private controllers: Record<string, PointController> = {};

  private subscriptions: Record<string, { success: (value: any) => void, error: (error: any) => void }> = {};

  protected isReady: boolean = false;

  /**
   * 检查唯一标识是否合法
   * @param id
   * @returns
   */
  static checkIdentification(id: string): boolean {
    return typeof id === 'string' && id !== '';
  }

  /**
   * 获取协议类型
   * @param data
   * @returns
   */
  static getProtocolType(data: any): string {
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
        journal.success('notify success!', '---- 请求体 ----', data);
      } catch (ex) {
        // 捕获未知的异常情况
        journal.error('notify fail!', '---- 请求体 ----', data, '---- 错误信息 ----', ex);
      }
    });

    // 处理请求消息
    sink.onRequest(async (data: MessageRequest<any>) => {
      try {
        const { method, params } = data;

        // 检查id是否合法
        if (!CorePoint.checkIdentification(data.id)) {
          throw new Error('NotWellFormed');
        }

        // 检查调用的方法是否存在
        if (!(typeof this.controllers[method] === 'function')) {
          throw new Error('NotFound');
        }

        const fn = this.controllers[method];

        // 检查方法的参数个数是否一致
        if (fn.length > params.length) {
          throw new Error('InvalidMethodParameters');
        }

        const result = await fn(...params);

        journal.success('request success!', '---- 请求体 ----', data, '---- 响应体 ----', result);
        // 获取执行结果，并发送成功消息
        this.postSuccessMessage(data.id, result || null);
      } catch (ex) {
        journal.error('request fail!', '---- 请求体 ----', data, '---- 错误信息 ----', ex);
        // 捕获未知的异常情况并发送错误消息
        this.postErrorMessage(data.id, ex.message);
      }
    })

    // 处理响应消息
    sink.onResponse(async (data: MessageResponse<any>) => {
      journal.success('response invoked!', data);

      if (CorePoint.checkIdentification(data.id)) {
        const { success } = this.subscriptions[data.id] || {};

        if (typeof success === 'function') {
          success(data.result);
        }
      }
    });

    // 处理错误消息
    sink.onError(async (data: MessageResponse<any>) => {
      journal.error('error invoked!', data);

      if (CorePoint.checkIdentification(data.id)) {
        const { error } = this.subscriptions[data.id] || {};

        if (typeof error === 'function') {
          error(data.error);
        }
      }
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
    // 端口绑定
    this.port = port;
    // 消息监听
    port.onmessage = (event: MessageEvent) => {
      // 根据协议类型，处理通信消息
      switch (CorePoint.getProtocolType(event.data)) {
        case MessageBody.type:
          this.handleJsonRPCMessage(event);
          break
        case 'signal':
          this.handleSignalMessage(event);
          break
        default:
          journal.error('invalid json-rpc. not conforming to spec.');
          this.postErrorMessage('unknown error', 'InvalidRPC');
      }
    }
  }

  /**
   * 连接成功后，统一处理等待的消息
   */
  protected ready() {
    let data: MessageReadyBody | undefined;

    this.isReady = true;
    // 循环调用等待队列，直到所有消息发送完成
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
    // 检查连接是否建立，若未建立，则将消息推入等待队列。
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
   * @param statusText
   */
  protected postErrorMessage(id: string, statusText: string): void {
    const { code, type, message } = MessageStatus[statusText] || MessageStatus['InternalRPCError'];
    const payload = this.body.error(id, code, message, type);

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
   * 发送通知消息（只关心消息发送）
   * @param method
   * @param params
   */
  notify(method: string, ...params: any[]): void {
    const payload = this.body.notify(method, params);

    this.postNormalizeMessage(MessageTypeEnum.NOTIFY, payload);
  }

  /**
   * 调用远程函数（消息发送完成后，可以通过订阅的方式获取返回值）
   * @param method
   * @param params
   * @returns
   */
  invoke(method: string, ...params: any[]): Promise<any> {
    const payload = this.body.request(method, params);

    this.postNormalizeMessage(MessageTypeEnum.REQUEST, payload);

    return new Promise((resolve, reject) => {
      this.subscriptions[payload.id] = {
        success: resolve,
        error: reject
      };
    });
  }
}
