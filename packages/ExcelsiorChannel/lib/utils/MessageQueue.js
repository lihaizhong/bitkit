"use strict";
exports.__esModule = true;
exports.MessageQueue = void 0;
var MessageQueue = /** @class */ (function () {
    function MessageQueue() {
        this.queue = [];
    }
    MessageQueue.prototype.push = function (body) {
        this.queue.push(body);
    };
    MessageQueue.prototype.pop = function () {
        return this.queue.shift();
    };
    return MessageQueue;
}());
exports.MessageQueue = MessageQueue;
//# sourceMappingURL=MessageQueue.js.map