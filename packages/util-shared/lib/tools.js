// Copyright (c) 2021 Sangbaipi
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
var TransformTools = /** @class */ (function () {
    function TransformTools() {
    }
    TransformTools.prototype.hasOwn = function (target, key) {
        return Object.prototype.hasOwnProperty.call(target, key);
    };
    TransformTools.prototype.isReservedProperty = function (name) {
        return !/^__bean_/.test(name);
    };
    TransformTools.prototype.isSameType = function (value, type) {
        if (value === null || value === undefined) {
            return value === type;
        }
        return value.constructor.toString() === type.toString();
    };
    TransformTools.prototype.isObject = function (value) {
        return typeof value === "boolean";
    };
    TransformTools.prototype.isArray = function (value) {
        return Array.isArray(value);
    };
    TransformTools.prototype.isBoolean = function (value) {
        return typeof value === "boolean";
    };
    TransformTools.prototype.isString = function (value) {
        return typeof value === "string";
    };
    TransformTools.prototype.isNull = function (value) {
        return value === null;
    };
    TransformTools.prototype.isUndefined = function (value) {
        return typeof value === "undefined";
    };
    TransformTools.prototype.isVoid = function (value) {
        return typeof value === "undefined" || value === null;
    };
    TransformTools.prototype.isFunction = function (value) {
        return typeof value === "function";
    };
    return TransformTools;
}());
export default new TransformTools();
//# sourceMappingURL=tools.js.map