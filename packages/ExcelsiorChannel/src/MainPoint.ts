import { CorePoint } from "./CorePoint";
import { POINT_SIGNALS } from "./constants/signals";
import { journal } from "./utils/Journal";

export class MainPoint extends CorePoint {
  constructor(frame: HTMLIFrameElement) {
    super();

    const channel: MessageChannel = new MessageChannel();

    this.connect(channel.port1);
    frame.addEventListener('load', () => {
      // 发起连接请求
      frame.contentWindow?.postMessage(POINT_SIGNALS.CONNECT, '*', [channel.port2]);
      journal.debug('发起连接请求...');
    });
  }

  protected handleSignalMessage(event: MessageEvent<any>): void {
      if (event.data === POINT_SIGNALS.OK) {
        journal.debug('握手完成！');
        this.ready();
      }
  }
}
