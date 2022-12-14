var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { DataX } from "./DataX";
export var info = function (namespace, message) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return console.info.apply(console, __spreadArray(["\u3010".concat(namespace, "\u3011").concat(message)], args, false));
};
export var warn = function (namespace, message) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return console.warn.apply(console, __spreadArray(["\u3010".concat(namespace, "\u3011").concat(message)], args, false));
};
export var error = function (namespace, message) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return console.error.apply(console, __spreadArray(["\u3010".concat(namespace, "\u3011").concat(message)], args, false));
};
export var debug = function (namespace) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return DataX.globals.config.debug ? console.debug.apply(console, __spreadArray(["\u3010".concat(namespace, "\u3011")], args, false)) : null;
};
export var throwError = function (namespace, message) { return new Error("\u3010".concat(namespace, "\u3011").concat(message)); };
//# sourceMappingURL=log.js.map