"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSink = void 0;
var MessageSink = /** @class */ (function () {
    function MessageSink(payload) {
        this.handlers = {
            notify: [],
            request: [],
            response: [],
            error: []
        };
        this.payload = payload;
    }
    MessageSink.prototype.bootstrap = function () {
        var _this = this;
        // 根据数据规范判断响应类型
        if ('method' in this.payload && 'params' in this.payload) {
            if ('id' in this.payload) {
                this.handlers.request.forEach(function (handler) { return handler(_this.payload); });
            }
            else {
                this.handlers.notify.forEach(function (handler) { return handler(_this.payload); });
            }
        }
        else if ('id' in this.payload && 'result' in this.payload) {
            this.handlers.response.forEach(function (handler) { return handler(_this.payload); });
        }
        else {
            this.handlers.error.forEach(function (handler) { return handler(_this.payload); });
        }
    };
    MessageSink.prototype.clean = function () {
        var _this = this;
        Object.keys(this.handlers).forEach(function (key) {
            _this.handlers[key] = [];
        });
    };
    MessageSink.prototype.onNotify = function (fn) {
        this.handlers.notify.push(fn);
    };
    MessageSink.prototype.onRequest = function (fn) {
        this.handlers.request.push(fn);
    };
    MessageSink.prototype.onResponse = function (fn) {
        this.handlers.response.push(fn);
    };
    MessageSink.prototype.onError = function (fn) {
        this.handlers.error.push(fn);
    };
    return MessageSink;
}());
exports.MessageSink = MessageSink;
//# sourceMappingURL=MessageSink.js.map