"use strict";
exports.__esModule = true;
exports.TypeChecker = exports.isFalsy = exports.isTruthy = exports.isLikePromise = exports.isPromise = exports.isError = exports.isRegExp = exports.isObject = exports.isArray = exports.isFunction = exports.isBoolean = exports.isNumber = exports.isString = exports.isPrimitive = exports.isVoid = exports.isUndefined = exports.isNull = exports.isValidDate = exports.isSameClass = exports.hasOwn = void 0;
var hasOwn = function (target, property) {
    if ('hasOwn' in Object) {
        return Object.hasOwn(target, property);
    }
    var hasOwn = Object.prototype.hasOwnProperty;
    return hasOwn.call(target, property);
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
exports.TypeChecker = {
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
exports["default"] = new Proxy(exports.TypeChecker, {
    get: function (target, p, receiver) {
        if (p === 'not') {
            return Object.create(target);
        }
        if ((0, exports.hasOwn)(target, p)) {
            return Reflect.get(target, p, receiver);
        }
        return function (value) { return !Reflect.get(target, p, receiver)(value); };
    },
    set: function (target, p, newValue, receiver) {
        if (typeof newValue !== 'function') {
            throw new Error("".concat(p.toString(), " must be a function!"));
        }
        if (newValue.length !== 1) {
            throw new Error("".concat(p.toString(), " can only be one parameter!"));
        }
        Reflect.set(target, p, newValue, receiver);
        return true;
    }
});
//# sourceMappingURL=index.js.map