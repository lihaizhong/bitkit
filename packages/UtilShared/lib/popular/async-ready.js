(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AsyncReady {
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
    exports.default = AsyncReady;
    AsyncReady.ReadyStatus = {
        initialize: 'INITIALIZE',
        pending: 'PENDING',
        completed: 'COMPLETED'
    };
});
