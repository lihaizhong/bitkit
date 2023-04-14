"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeChecker = exports.isFalsy = exports.isTruthy = exports.isPromise = exports.isError = exports.isRegExp = exports.isObject = exports.isArray = exports.isFunction = exports.isBoolean = exports.isNumber = exports.isString = exports.isPrimitive = exports.isVoid = exports.isUndefined = exports.isNull = exports.isDate = exports.checkOfStrict = exports.hasOwn = void 0;
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
 * * strong
 * @param value
 * @param type
 */
function checkOfStrict(value, type) {
    if (value === null || value === undefined) {
        return value === type;
    }
    return value.constructor.toString() === type.toString();
}
exports.checkOfStrict = checkOfStrict;
/**
 * 时间格式校验
 * * loose
 * @param value
 */
function isDate(value) {
    return ((value instanceof Date ||
        isString(value) ||
        (isNumber(value) && value > 0)) && new Date(value).toString() !== 'Invalid Date');
}
exports.isDate = isDate;
/**
 * 是否是Null
 * * strong
 * @param value
 */
function isNull(value) {
    return value === null;
}
exports.isNull = isNull;
/**
 * 是否是Undefined
 * * strong
 * @param value
 */
function isUndefined(value) {
    return typeof value === 'undefined';
}
exports.isUndefined = isUndefined;
/**
 * 判断是否是undefined、null或者空字符串
 * * strong
 * @param value
 */
function isVoid(value) {
    return isUndefined(value) || isNull(value) || value === '';
}
exports.isVoid = isVoid;
/**
 * 基本类型校验(包含null、undefined、string、number、boolean、symbol)
 * * strong
 * @param value
 */
function isPrimitive(value) {
    return (value === null ||
        ['undefined', 'string', 'number', 'boolean', 'symbol'].includes(typeof value));
}
exports.isPrimitive = isPrimitive;
/**
 * 是否是字符串
 * * strong
 * @param value
 */
function isString(value) {
    return typeof value === 'string';
}
exports.isString = isString;
/**
 * 是否是有效数字
 * * strong
 * @param value
 */
function isNumber(value) {
    return typeof value === 'number' && Number.isFinite(value);
}
exports.isNumber = isNumber;
/**
 * 是否是布尔类型
 * * strong
 * @param value
 */
function isBoolean(value) {
    return typeof value === 'boolean';
}
exports.isBoolean = isBoolean;
/**
 * 是否是函数
 * * strong
 * @param value
 */
function isFunction(value) {
    return typeof value === 'function';
}
exports.isFunction = isFunction;
/**
 * 是否是数组
 * * strong
 * @param value
 */
function isArray(value) {
    return Array.isArray(value);
}
exports.isArray = isArray;
/**
 * 是否是对象
 * * strong
 * @param value
 */
function isObject(value) {
    return checkOfStrict(value, Object);
}
exports.isObject = isObject;
/**
 * 是否是正则表达式
 * * strong
 * @param value
 */
function isRegExp(value) {
    return checkOfStrict(value, RegExp);
}
exports.isRegExp = isRegExp;
/**
 * 是否是Error对象
 * * loose
 * @param value
 */
function isError(value) {
    return value instanceof Error;
}
exports.isError = isError;
/**
 * 是否是原生的Promise对象
 * * loose
 * @param value
 */
function isPromise(value) {
    return value instanceof Promise;
}
exports.isPromise = isPromise;
/**
 * 是否为真值
 * * loose
 * @param value
 */
function isTruthy(value) {
    return value === true || value === 1;
}
exports.isTruthy = isTruthy;
/**
 * 是否为假值
 * * loose
 * @param value
 */
function isFalsy(value) {
    return value === false || value === 0;
}
exports.isFalsy = isFalsy;
exports.TypeChecker = {
    isDate: isDate,
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
    isPromise: isPromise
};
exports.default = new Proxy(exports.TypeChecker, {
    get: function (target, p, receiver) {
        if (p === 'not') {
            return new Proxy(exports.TypeChecker, {
                get: function (t, p, receiver) {
                    return function (value) { return !Reflect.get(t, p, receiver)(value); };
                },
                set: function () {
                    throw new Error('don\'t extend method!');
                }
            });
        }
        if ((0, exports.hasOwn)(target, p)) {
            return Reflect.get(target, p, receiver);
        }
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