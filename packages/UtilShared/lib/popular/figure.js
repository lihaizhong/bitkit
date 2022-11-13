var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@lihzsky/type-checker"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Figure = void 0;
    const type_checker_1 = __importDefault(require("@lihzsky/type-checker"));
    exports.Figure = {
        toYuan(value) {
            if (type_checker_1.default.isNumber(value)) {
                return (value / 100).toFixed(2);
            }
            return '0.00';
        },
        toFen(value) {
            if (type_checker_1.default.isString(value) && /^\d+(?:\.\d+)?$/.test(value)) {
                return Number(value) * 100;
            }
            return 0;
        },
        toPercent(value) {
            if (type_checker_1.default.isNumber(value)) {
                return (value / 100) + '%';
            }
            return '';
        }
    };
});
