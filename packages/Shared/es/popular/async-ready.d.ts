export type IAsyncReadyOption = {
    only: boolean;
};
export default class AsyncReady {
    static ReadyStatus: {
        initialize: string;
        pending: string;
        completed: string;
    };
    static callReadyFunc(callback: any, ...args: any[]): any;
    private status;
    private callbacks;
    private params;
    private options;
    constructor(option: IAsyncReadyOption);
    updateParams(params: any): void;
    ready(callback: any): void;
    wait(): void;
    reset(): void;
    complete(): void;
}
