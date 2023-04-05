"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.MainPoint = void 0;
var CorePoint_1 = require("./CorePoint");
var signals_1 = require("./constants/signals");
var Journal_1 = require("./utils/Journal");
var MainPoint = /** @class */ (function (_super) {
    __extends(MainPoint, _super);
    function MainPoint(frame) {
        var _this = _super.call(this) || this;
        var channel = new MessageChannel();
        _this.connect(channel.port1);
        frame.addEventListener('load', function () {
            var _a;
            // 发起连接请求
            (_a = frame.contentWindow) === null || _a === void 0 ? void 0 : _a.postMessage(signals_1.POINT_SIGNALS.CONNECT, '*', [channel.port2]);
            Journal_1.journal.debug('发起连接请求...');
        });
        return _this;
    }
    MainPoint.prototype.handleSignalMessage = function (event) {
        if (event.data === signals_1.POINT_SIGNALS.OK) {
            Journal_1.journal.debug('握手完成！');
            this.ready();
        }
    };
    return MainPoint;
}(CorePoint_1.CorePoint));
exports.MainPoint = MainPoint;
//# sourceMappingURL=MainPoint.js.map