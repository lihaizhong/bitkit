export type MessageSinkCallback = (data: any) => void | Promise<void>;

export class MessageSink {
  private payload: any;

  private handlers: Record<string, MessageSinkCallback[]>

  constructor(payload: any) {
    this.payload = payload;
    this.handlers = {
      notify: [],
      request: [],
      response: [],
      error: []
    }
  }

  bootstrap() {
    if ('method' in this.payload && 'params' in this.payload) {
      if ('id' in this.payload) {
        this.handlers.request.forEach(
          (handler: MessageSinkCallback) => handler(this.payload)
        )
      } else {
        this.handlers.notify.forEach(
          (handler: MessageSinkCallback) => handler(this.payload)
        )
      }
    } else if ('result' in this.payload) {
      this.handlers.response.forEach(
        (handler: MessageSinkCallback) => handler(this.payload)
      )
    } else {
      this.handlers.error.forEach(
        (handler: MessageSinkCallback) => handler(this.payload)
      )
    }
  }

  clean() {
    this.handlers = {
      notify: [],
      request: [],
      response: [],
      error: []
    }
  }

  onNotify(fn: MessageSinkCallback) {
    this.handlers.notify.push(fn)
  }

  onRequest(fn: MessageSinkCallback) {
    this.handlers.request.push(fn)
  }

  onResponse(fn: MessageSinkCallback) {
    this.handlers.response.push(fn)
  }

  onError(fn: MessageSinkCallback) {
    this.handlers.error.push(fn)
  }
}
