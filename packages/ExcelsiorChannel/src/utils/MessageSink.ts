export type MessageSinkCallback = (data: any) => void | Promise<void>;

export interface MessageSinkHandler {
  notify: MessageSinkCallback[];
  request: MessageSinkCallback[];
  response: MessageSinkCallback[];
  error: MessageSinkCallback[];
}

export class MessageSink {
  private payload: any;

  private handlers: MessageSinkHandler = {
    notify: [],
    request: [],
    response: [],
    error: []
  };

  constructor(payload: any) {
    this.payload = payload;
  }

  bootstrap(): void {
    // 根据数据规范判断响应类型
    if ('method' in this.payload && 'params' in this.payload) {
      if ('id' in this.payload) {
        this.handlers.request.forEach((handler: MessageSinkCallback) => handler(this.payload));
      } else {
        this.handlers.notify.forEach((handler: MessageSinkCallback) => handler(this.payload));
      }
    } else if ('id' in this.payload && 'result' in this.payload) {
      this.handlers.response.forEach((handler: MessageSinkCallback) => handler(this.payload));
    } else {
      this.handlers.error.forEach((handler: MessageSinkCallback) => handler(this.payload));
    }
  }

  clean(): void {
    Object.keys(this.handlers).forEach((key: string) => {
      this.handlers[key] = [];
    });
  }

  onNotify(fn: MessageSinkCallback): void {
    this.handlers.notify.push(fn);
  }

  onRequest(fn: MessageSinkCallback): void {
    this.handlers.request.push(fn);
  }

  onResponse(fn: MessageSinkCallback): void {
    this.handlers.response.push(fn);
  }

  onError(fn: MessageSinkCallback): void {
    this.handlers.error.push(fn);
  }
}
