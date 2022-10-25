"use strict";
exports.__esModule = true;
exports.TypeChecker = exports.isFalsy = exports.isTruthy = exports.isLikePromise = exports.isPromise = exports.isError = exports.isRegExp = exports.isObject = exports.isArray = exports.isFunction = exports.isBoolean = exports.isNumber = exports.isString = exports.isPrimitive = exports.isVoid = exports.isUndefined = exports.isNull = exports.isValidDate = exports.isSameClass = exports.hasOwn = void 0;
var hasOwn = function (target, property) {
    if ('hasOwn' in Object) {
        return Object.hasOwn(target, property);
    }
    return Object.prototype.hasOwnProperty.call(target, property);
};
exports.hasOwn = hasOwn;
/**
 * 判断是否是某种具体类型
 * @param value
 * @param type
 */
function isSameClass(value, type) {
    if (value === null || value === undefined) {
        return value === type;
    }
    return value.constructor.toString() === type.toString();
}
exports.isSameClass = isSameClass;
/**
 * 时间格式校验
 * @param value
 */
function isValidDate(value) {
    return ((value instanceof Date ||
        isString(value) ||
        (isNumber(value) && value > 0)) && new Date(value).toString() !== 'Invalid Date');
}
exports.isValidDate = isValidDate;
/**
 * 是否是Null
 * @param value
 */
function isNull(value) {
    return value === null;
}
exports.isNull = isNull;
/**
 * 是否是Undefined
 * @param value
 */
function isUndefined(value) {
    return typeof value === 'undefined';
}
exports.isUndefined = isUndefined;
/**
 * 判断是否是undefined、null或者空字符串
 * @param value
 */
function isVoid(value) {
    return isUndefined(value) || isNull(value) || value === '';
}
exports.isVoid = isVoid;
/**
 * 基本类型校验(包含null、undefined、string、number、boolean)
 * @param value
 */
function isPrimitive(value) {
    return (value === null ||
        ['undefined', 'string', 'number', 'boolean'].includes(typeof value));
}
exports.isPrimitive = isPrimitive;
/**
 * 是否是字符串
 * @param value
 */
function isString(value) {
    return typeof value === 'string';
}
exports.isString = isString;
/**
 * 是否是有效数字
 * @param value
 */
function isNumber(value) {
    return typeof value === 'number' && Number.isFinite(value);
}
exports.isNumber = isNumber;
/**
 * 是否是布尔类型
 * @param value
 */
function isBoolean(value) {
    return typeof value === 'boolean';
}
exports.isBoolean = isBoolean;
/**
 * 是否是函数
 * @param value
 */
function isFunction(value) {
    return typeof value === 'function';
}
exports.isFunction = isFunction;
/**
 * 是否是数组
 * @param value
 */
function isArray(value) {
    return Array.isArray(value);
}
exports.isArray = isArray;
/**
 * 是否是对象
 * @param value
 */
function isObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}
exports.isObject = isObject;
/**
 * 是否是正则表达式
 * @param value
 */
function isRegExp(value) {
    return Object.prototype.toString.call(value) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
/**
 * 是否是Error对象
 * @param value
 */
function isError(value) {
    return value instanceof Error;
}
exports.isError = isError;
/**
 * 是否是原生的Promise对象
 * @param value
 */
function isPromise(value) {
    return value instanceof Promise;
}
exports.isPromise = isPromise;
/**
 * 是否是类Promise对象
 * @param value
 */
function isLikePromise(value) {
    return (isVoid(value) &&
        (typeof value === 'object' || isFunction(value)) &&
        isFunction(value.then) &&
        isFunction(value["catch"]));
}
exports.isLikePromise = isLikePromise;
/**
 * 是否为真值
 * @param value
 */
function isTruthy(value) {
    return value === true || value === 1;
}
exports.isTruthy = isTruthy;
/**
 * 是否为假值
 * @param value
 */
function isFalsy(value) {
    return value === false || value === 0;
}
exports.isFalsy = isFalsy;
var TypeChecker = /** @class */ (function () {
    function TypeChecker() {
        var _this = this;
        // 反向扩展类型校验集合
        this.not = {};
        // 扩展类型校验集合
        this.extensions = {
            isSameClass: isSameClass,
            isValidDate: isValidDate,
            isNull: isNull,
            isUndefined: isUndefined,
            isVoid: isVoid,
            isPrimitive: isPrimitive,
            isString: isString,
            isNumber: isNumber,
            isBoolean: isBoolean,
            isTruthy: isTruthy,
            isFalsy: isFalsy,
            isFunction: isFunction,
            isArray: isArray,
            isObject: isObject,
            isRegExp: isRegExp,
            isError: isError,
            isPromise: isPromise,
            isLikePromise: isLikePromise
        };
        var keys = Object.keys(this.extensions).filter(function (key) { return (/^is.+/.test(key) &&
            (0, exports.hasOwn)(_this.extensions, key) &&
            !['isTruthy', 'isFalsy'].includes[key]); });
        this.reverse(keys);
    }
    /**
     * 注入反向扩展类型校验
     * @param property
     */
    TypeChecker.prototype.injectReverseValidator = function (property) {
        var _this = this;
        this.not[property] = function (value, type) {
            if (property in _this.extensions) {
                return !_this.extensions[property](value, type);
            }
        };
    };
    /**
     * 反向扩展类型校验
     * @param properties
     */
    TypeChecker.prototype.reverse = function (properties) {
        var _this = this;
        if (this.extensions.isString(properties)) {
            this.injectReverseValidator(properties);
        }
        else if (this.extensions.isArray(properties)) {
            properties.forEach(function (property) {
                return _this.injectReverseValidator(property);
            });
        }
    };
    /**
     * 扩展类型判断
     * @param name 名称
     * @param validator 校验函数
     * @param addonToNot 是否添加到not模块中
     */
    TypeChecker.prototype.extend = function (name, validator, addonToNot) {
        if (addonToNot === void 0) { addonToNot = false; }
        if (this.extensions[name]) {
            console.warn("\u6269\u5C55\u7C7B\u578B".concat(name, "\u5DF2\u5B58\u5728\uFF0C\u5EFA\u8BAE\u66F4\u6362\u4E00\u4E2A\u540D\u79F0\uFF01"));
        }
        this.extensions[name] = validator;
        if (addonToNot) {
            this.reverse(name);
        }
    };
    return TypeChecker;
}());
exports.TypeChecker = TypeChecker;
var typeChecker = new TypeChecker();
exports["default"] = new Proxy(typeChecker, {
    get: function (target, p) {
        if (target.extensions[p]) {
            return Reflect.get(target.extensions, p);
        }
        return Reflect.get(target, p);
    },
    set: function (_target, _value) {
        throw new Error('TypeChecker不支持扩展！');
    }
});
//# sourceMappingURL=index.js.map