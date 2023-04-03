var MessageSink = /** @class */ (function () {
    function MessageSink(payload) {
        this.payload = payload;
        this.handlers = {
            notify: [],
            request: [],
            response: [],
            error: []
        };
    }
    MessageSink.prototype.bootstrap = function () {
        var _this = this;
        if ('method' in this.payload && 'params' in this.payload) {
            if ('id' in this.payload) {
                this.handlers.request.forEach(function (handler) { return handler(_this.payload); });
            }
            else {
                this.handlers.notify.forEach(function (handler) { return handler(_this.payload); });
            }
        }
        else if ('result' in this.payload) {
            this.handlers.response.forEach(function (handler) { return handler(_this.payload); });
        }
        else {
            this.handlers.error.forEach(function (handler) { return handler(_this.payload); });
        }
    };
    MessageSink.prototype.clean = function () {
        this.handlers = {
            notify: [],
            request: [],
            response: [],
            error: []
        };
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
export { MessageSink };
//# sourceMappingURL=MessageSink.js.map