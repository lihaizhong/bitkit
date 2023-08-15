"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueParser = void 0;
var type_checker_1 = require("@lihzsky/type-checker");
var ValueParser = /** @class */ (function () {
    function ValueParser() {
    }
    /**
     * 解析成字符串
     */
    ValueParser.prototype.toString = function (fieldName, fieldValue, defaultValue) {
        if ((0, type_checker_1.checkOfStrict)(fieldValue, String)) {
            return fieldValue;
        }
        if ((0, type_checker_1.checkOfStrict)(fieldValue, Number)) {
            return fieldValue.toString();
        }
        if (!(0, type_checker_1.isVoid)(fieldValue)) {
            console.warn("DataX.toString", "".concat(fieldName, " is not a string or number!"), fieldValue);
        }
        return defaultValue;
    };
    /**
     * 解析成数字
     */
    ValueParser.prototype.toNumber = function (fieldName, fieldValue, defaultValue) {
        if ((0, type_checker_1.checkOfStrict)(fieldValue, Number)) {
            return fieldValue;
        }
        if ((0, type_checker_1.checkOfStrict)(fieldValue, String) &&
            /^\d+$/.test(fieldValue)) {
            return Number(fieldValue);
        }
        if (!(0, type_checker_1.isVoid)(fieldValue)) {
            console.warn("DataX.toNumber", "".concat(fieldName, " is not a number or numeric string"), fieldValue);
        }
        return defaultValue;
    };
    /**
     * 解析成布尔
     */
    ValueParser.prototype.toBoolean = function (fieldName, fieldValue, defaultValue) {
        if ((0, type_checker_1.checkOfStrict)(fieldValue, Boolean)) {
            return fieldValue;
        }
        if (!(0, type_checker_1.isVoid)(fieldValue)) {
            console.warn("DataX.toBoolean", "".concat(fieldName, " is not a boolean"), fieldValue);
        }
        return defaultValue;
    };
    /**
     * 解析成对象
     */
    ValueParser.prototype.toObject = function (fieldName, fieldValue, defaultValue) {
        if ((0, type_checker_1.isObject)(fieldValue)) {
            return fieldValue;
        }
        if (!(0, type_checker_1.isVoid)(fieldValue)) {
            console.warn("DataX.toObject", "".concat(fieldName, " is not a plain object"), fieldValue);
        }
        return defaultValue;
    };
    /**
       * 解析成数组
       */
    ValueParser.prototype.toArray = function (fieldName, fieldValue, defaultValue, callback) {
        if (!(0, type_checker_1.isArray)(fieldValue)) {
            console.warn("DataX.toArray", "".concat(fieldName, " is not a array!"), fieldValue);
        }
        return (fieldValue || defaultValue).map(callback);
    };
    return ValueParser;
}());
exports.ValueParser = ValueParser;
//# sourceMappingURL=valueParser.js.map