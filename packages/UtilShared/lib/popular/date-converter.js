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
    function dateConverter(date, format = "yyyy/MM/dd hh:mm:ss") {
        if (typeof date === "string") {
            const mts = date.match(/(\/Date\((\d+)\)\/)/);
            if (mts && mts.length >= 3) {
                date = parseInt(mts[2]);
            }
        }
        const _date = new Date(date);
        if (!_date || _date.toUTCString() == "Invalid Date") {
            return "";
        }
        const map = {
            y: () => _date.getFullYear(),
            M: () => _date.getMonth() + 1,
            d: () => _date.getDate(),
            h: () => _date.getHours(),
            m: () => _date.getMinutes(),
            s: () => _date.getSeconds(),
            q: () => Math.floor((_date.getMonth() + 3) / 3),
            S: () => _date.getMilliseconds(), //毫秒
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
