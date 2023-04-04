export type PointController = (...params: any[]) => any;
export type PointSubscriptionCallback = (data: any) => void;
export interface PointSubscription {
    success: Record<string, PointSubscriptionCallback>;
    error: Record<string, PointSubscriptionCallback>;
}
export declare class CorePoint {
    private port;
    private body;
    private queue;
    private controllers;
    private subscriptions;
    protected isReady: boolean;
    static checkIdentification(id: string): boolean;
    /**
     * 获取协议类型
     * @param data
     * @returns
     */
    private getProtocolType;
    /**
     * 处理json-rpc协议消息
     * @param event
     */
    protected handleJsonRPCMessage(event: MessageEvent): void;
    /**
     * 处理信号消息
     * @param event
     */
    protected handleSignalMessage(event: MessageEvent): void;
    /**
     * 建立通信连接
     * @param port
     */
    protected connect(port: MessagePort): void;
    /**
     * 连接成功后，统一处理等待的消息
     */
    protected ready(): void;
    /**
     * 标准的消息处理
     * @param type
     * @param data
     */
    private postNormalizeMessage;
    /**
     * 处理标准的成功消息
     * @param id
     * @param result
     */
    protected postSuccessMessage(id: string, result: any): void;
    /**
     * 处理标准的失败消息
     * @param id
     * @param statusText
     */
    protected postErrorMessage(id: string, statusText: string): void;
    /**
     * 声明远程调用的函数
     * @param method
     * @param fn
     */
    declare(method: string, fn: PointController): void;
    /**
     * 发送通知消息
     * @param method
     * @param params
     */
    notify(method: string, ...params: any[]): void;
    /**
     * 调用远程函数
     * @param method
     * @param params
     * @returns
     */
    invoke(method: string, ...params: any[]): string;
    /**
     * 订阅返回成功的消息，仅invoke有效
     * @param id
     * @param fn
     */
    subscribe(id: string, fn: PointSubscriptionCallback): void;
    /**
     * 订阅返回失败的消息，仅invoke有效
     * @param id
     * @param fn
     */
    error(id: string, fn: PointSubscriptionCallback): void;
}
