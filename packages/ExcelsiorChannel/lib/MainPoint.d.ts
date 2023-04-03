import { CorePoint } from "./CorePoint";
export declare class MainPoint extends CorePoint {
    constructor(frame: HTMLIFrameElement);
    protected handleSignalMessage(event: MessageEvent<any>): void;
}
