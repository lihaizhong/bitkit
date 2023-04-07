"use strict";
exports.__esModule = true;
exports.journal = exports.Journal = void 0;
var Journal = /** @class */ (function () {
    function Journal(inst) {
        if (inst === void 0) { inst = console; }
        this.label = null;
        this.inst = inst;
    }
    Journal.style = function (background, color) {
        if (color === void 0) { color = '#FFFFFF'; }
        return "padding: 2px 4px; background: ".concat(background, "; color: ").concat(color, "; border-radius: 4px;");
    };
    Journal.prototype.printf = function (label, messages, cb) {
        if (messages.length < 2) {
            messages.forEach(cb);
        }
        else {
            this.inst.group(this.label || label);
            messages.forEach(cb);
            this.inst.groupEnd();
        }
    };
    Journal.prototype.group = function (label) {
        this.label = label.toLocaleUpperCase();
        return {
            success: this.success.bind(this),
            info: this.info.bind(this),
            debug: this.debug.bind(this),
            warn: this.warn.bind(this),
            error: this.error.bind(this)
        };
    };
    Journal.prototype.log = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this.inst).log.apply(_a, args);
    };
    Journal.prototype.success = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.printf('SUCCESS', args, function (message) {
            _this.inst.log('%csuccess', Journal.style('#68B984'), message);
        });
        this.label = null;
    };
    Journal.prototype.info = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.printf('INFO', args, function (message) {
            _this.inst.info('%cinfo', Journal.style('#B2A4FF'), message);
        });
        this.label = null;
    };
    Journal.prototype.debug = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.printf('DEBUG', args, function (message) {
            _this.inst.debug('%cdebug', Journal.style('#3DB2FF'), message);
        });
        this.label = null;
    };
    Journal.prototype.warn = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.printf('WARNING', args, function (message) {
            _this.inst.warn('%cwarning', Journal.style('#FFB830'), message);
        });
        this.label = null;
    };
    Journal.prototype.error = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.printf('ERROR', args, function (message) {
            _this.inst.error('%cerror', Journal.style('#FF2442'), message);
        });
        this.label = null;
    };
    return Journal;
}());
exports.Journal = Journal;
exports.journal = new Journal();
//# sourceMappingURL=Journal.js.map