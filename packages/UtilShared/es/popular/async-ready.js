export default class AsyncReady {
    constructor(option) {
        this.status = AsyncReady.ReadyStatus.initialize;
        this.callbacks = [];
        this.options = Object.assign({ only: false }, option);
    }
    static callReadyFunc(callback, ...args) {
        if (typeof callback === "function") {
            return callback(...args);
        }
        return null;
    }
    updateParams(params) {
        this.params = params;
    }
    ready(callback) {
        if (this.status === AsyncReady.ReadyStatus.completed) {
            AsyncReady.callReadyFunc(callback, this.params);
        }
        else {
            if (this.options.only) {
                this.callbacks = [callback];
            }
            else {
                this.callbacks.push(callback);
            }
        }
    }
    wait() {
        this.status = AsyncReady.ReadyStatus.pending;
    }
    reset() {
        this.status = AsyncReady.ReadyStatus.initialize;
    }
    complete() {
        this.status = AsyncReady.ReadyStatus.completed;
        this.callbacks.forEach(callback => AsyncReady.callReadyFunc(callback, this.params));
        this.callbacks = [];
    }
}
AsyncReady.ReadyStatus = {
    initialize: 'INITIALIZE',
    pending: 'PENDING',
    completed: 'COMPLETED'
};
