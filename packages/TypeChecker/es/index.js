export var hasOwn = function (target, property) {
    if ('hasOwn' in Object) {
        return Object.hasOwn(target, property);
    }
    var hasOwn = Object.prototype.hasOwnProperty;
    return hasOwn.call(target, property);
};
/**
 * 判断是否是某种具体类型
 * * strong
 * @param value
 * @param type
 */
export function checkOfStrict(value, type) {
    if (value === null || value === undefined) {
        return value === type;
    }
    return value.constructor.toString() === type.toString();
}
/**
 * 时间格式校验
 * * loose
 * @param value
 */
export function isDate(value) {
    return ((value instanceof Date ||
        isString(value) ||
        (isNumber(value) && value > 0)) && new Date(value).toString() !== 'Invalid Date');
}
/**
 * 是否是Null
 * * strong
 * @param value
 */
export function isNull(value) {
    return value === null;
}
/**
 * 是否是Undefined
 * * strong
 * @param value
 */
export function isUndefined(value) {
    return typeof value === 'undefined';
}
/**
 * 判断是否是undefined、null或者空字符串
 * * strong
 * @param value
 */
export function isVoid(value) {
    return isUndefined(value) || isNull(value) || value === '';
}
/**
 * 基本类型校验(包含null、undefined、string、number、boolean、symbol)
 * * strong
 * @param value
 */
export function isPrimitive(value) {
    return (value === null ||
        ['undefined', 'string', 'number', 'boolean', 'symbol'].includes(typeof value));
}
/**
 * 是否是字符串
 * * strong
 * @param value
 */
export function isString(value) {
    return typeof value === 'string';
}
/**
 * 是否是有效数字
 * * strong
 * @param value
 */
export function isNumber(value) {
    return typeof value === 'number' && Number.isFinite(value);
}
/**
 * 是否是布尔类型
 * * strong
 * @param value
 */
export function isBoolean(value) {
    return typeof value === 'boolean';
}
/**
 * 是否是函数
 * * strong
 * @param value
 */
export function isFunction(value) {
    return typeof value === 'function';
}
/**
 * 是否是数组
 * * strong
 * @param value
 */
export function isArray(value) {
    return Array.isArray(value);
}
/**
 * 是否是对象
 * * strong
 * @param value
 */
export function isObject(value) {
    return checkOfStrict(value, Object);
}
/**
 * 是否是正则表达式
 * * strong
 * @param value
 */
export function isRegExp(value) {
    return checkOfStrict(value, RegExp);
}
/**
 * 是否是Error对象
 * * loose
 * @param value
 */
export function isError(value) {
    return value instanceof Error;
}
/**
 * 是否是原生的Promise对象
 * * loose
 * @param value
 */
export function isPromise(value) {
    return value instanceof Promise;
}
/**
 * 是否为真值
 * * loose
 * @param value
 */
export function isTruthy(value) {
    return value === true || value === 1;
}
/**
 * 是否为假值
 * * loose
 * @param value
 */
export function isFalsy(value) {
    return value === false || value === 0;
}
export var TypeChecker = {
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
export default new Proxy(TypeChecker, {
    get: function (target, p, receiver) {
        if (p === 'not') {
            return new Proxy(TypeChecker, {
                get: function (t, p, receiver) {
                    return function (value) { return !Reflect.get(t, p, receiver)(value); };
                },
                set: function () {
                    throw new Error('don\'t extend method!');
                }
            });
        }
        if (hasOwn(target, p)) {
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