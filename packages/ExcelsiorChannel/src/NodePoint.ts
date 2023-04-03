import { CorePoint } from "./CorePoint";
import { POINT_SIGNALS } from "./constants/signals";
import { journal } from "./utils/Journal";

export class NodePoint extends CorePoint {
  constructor() {
    super();

    window.addEventListener('message', (event: MessageEvent) => {
      if (event.data === POINT_SIGNALS.CONNECT) {
        const [port] = event.ports

        this.isReady = true;
        this.connect(port);
        journal.debug('连接成功！');
        port.postMessage(POINT_SIGNALS.OK);
        this.ready();
      }
    });
  }
}
