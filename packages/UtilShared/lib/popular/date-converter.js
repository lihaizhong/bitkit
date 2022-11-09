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
    exports.dateConverter = void 0;
    function getDateInstance(value) {
        const INVALID_DATE = "Invalid Date";
        if (value instanceof Date) {
            return value;
        }
        else if (typeof value === "number" && new Date(value).toUTCString() !== INVALID_DATE) {
            return new Date(value);
        }
        else if (typeof value === "string") {
        }
        return null;
    }
    function dateConverter(value, format = "yyyy/MM/dd hh:mm:ss") {
        const date = getDateInstance(value);
        if (date === null) {
            return "";
        }
        const map = {
            y: () => date.getFullYear(),
            M: () => date.getMonth() + 1,
            d: () => date.getDate(),
            h: () => date.getHours(),
            m: () => date.getMinutes(),
            s: () => date.getSeconds(),
            q: () => Math.floor((date.getMonth() + 3) / 3),
            S: () => date.getMilliseconds(), //毫秒
        };
        return format.replace(/([yMdhmsqS])+/g, (all, t) => {
            let fn = map[t];
            if (t === "y") {
                return String(fn()).substring(4 - all.length);
            }
            if (typeof fn === "function") {
                let valStr = String(fn());
                if (all.length > 1) {
                    valStr = "0" + valStr;
                    valStr = valStr.substring(valStr.length - 2);
                }
                return valStr;
            }
            return all;
        });
    }
    exports.dateConverter = dateConverter;
});
