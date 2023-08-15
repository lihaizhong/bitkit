import { checkOfStrict, isArray, isObject, isVoid } from "@lihzsky/type-checker";
var ValueParser = /** @class */ (function () {
    function ValueParser() {
    }
    /**
     * 解析成字符串
     */
    ValueParser.prototype.toString = function (fieldName, fieldValue, defaultValue) {
        if (checkOfStrict(fieldValue, String)) {
            return fieldValue;
        }
        if (checkOfStrict(fieldValue, Number)) {
            return fieldValue.toString();
        }
        if (!isVoid(fieldValue)) {
            console.warn("DataX.toString", "".concat(fieldName, " is not a string or number!"), fieldValue);
        }
        return defaultValue;
    };
    /**
     * 解析成数字
     */
    ValueParser.prototype.toNumber = function (fieldName, fieldValue, defaultValue) {
        if (checkOfStrict(fieldValue, Number)) {
            return fieldValue;
        }
        if (checkOfStrict(fieldValue, String) &&
            /^\d+$/.test(fieldValue)) {
            return Number(fieldValue);
        }
        if (!isVoid(fieldValue)) {
            console.warn("DataX.toNumber", "".concat(fieldName, " is not a number or numeric string"), fieldValue);
        }
        return defaultValue;
    };
    /**
     * 解析成布尔
     */
    ValueParser.prototype.toBoolean = function (fieldName, fieldValue, defaultValue) {
        if (checkOfStrict(fieldValue, Boolean)) {
            return fieldValue;
        }
        if (!isVoid(fieldValue)) {
            console.warn("DataX.toBoolean", "".concat(fieldName, " is not a boolean"), fieldValue);
        }
        return defaultValue;
    };
    /**
     * 解析成对象
     */
    ValueParser.prototype.toObject = function (fieldName, fieldValue, defaultValue) {
        if (isObject(fieldValue)) {
            return fieldValue;
        }
        if (!isVoid(fieldValue)) {
            console.warn("DataX.toObject", "".concat(fieldName, " is not a plain object"), fieldValue);
        }
        return defaultValue;
    };
    /**
       * 解析成数组
       */
    ValueParser.prototype.toArray = function (fieldName, fieldValue, defaultValue, callback) {
        if (!isArray(fieldValue)) {
            console.warn("DataX.toArray", "".concat(fieldName, " is not a array!"), fieldValue);
        }
        return (fieldValue || defaultValue).map(callback);
    };
    return ValueParser;
}());
export { ValueParser };
//# sourceMappingURL=valueParser.js.map