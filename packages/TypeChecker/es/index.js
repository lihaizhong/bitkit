export var hasOwn = function (target, property) {
    if ('hasOwn' in Object) {
        return Object.hasOwn(target, property);
    }
    var hasOwn = Object.prototype.hasOwnProperty;
    return hasOwn.call(target, property);
};
/**
 * 判断是否是某种具体类型
 * @param value
 * @param type
 */
export function isSameClass(value, type) {
    if (value === null || value === undefined) {
        return value === type;
    }
    return value.constructor.toString() === type.toString();
}
/**
 * 时间格式校验
 * @param value
 */
export function isValidDate(value) {
    return ((value instanceof Date ||
        isString(value) ||
        (isNumber(value) && value > 0)) && new Date(value).toString() !== 'Invalid Date');
}
/**
 * 是否是Null
 * @param value
 */
export function isNull(value) {
    return value === null;
}
/**
 * 是否是Undefined
 * @param value
 */
export function isUndefined(value) {
    return typeof value === 'undefined';
}
/**
 * 判断是否是undefined、null或者空字符串
 * @param value
 */
export function isVoid(value) {
    return isUndefined(value) || isNull(value) || value === '';
}
/**
 * 基本类型校验(包含null、undefined、string、number、boolean)
 * @param value
 */
export function isPrimitive(value) {
    return (value === null ||
        ['undefined', 'string', 'number', 'boolean'].includes(typeof value));
}
/**
 * 是否是字符串
 * @param value
 */
export function isString(value) {
    return typeof value === 'string';
}
/**
 * 是否是有效数字
 * @param value
 */
export function isNumber(value) {
    return typeof value === 'number' && Number.isFinite(value);
}
/**
 * 是否是布尔类型
 * @param value
 */
export function isBoolean(value) {
    return typeof value === 'boolean';
}
/**
 * 是否是函数
 * @param value
 */
export function isFunction(value) {
    return typeof value === 'function';
}
/**
 * 是否是数组
 * @param value
 */
export function isArray(value) {
    return Array.isArray(value);
}
/**
 * 是否是对象
 * @param value
 */
export function isObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}
/**
 * 是否是正则表达式
 * @param value
 */
export function isRegExp(value) {
    return Object.prototype.toString.call(value) === '[object RegExp]';
}
/**
 * 是否是Error对象
 * @param value
 */
export function isError(value) {
    return value instanceof Error;
}
/**
 * 是否是原生的Promise对象
 * @param value
 */
export function isPromise(value) {
    return value instanceof Promise;
}
/**
 * 是否是类Promise对象
 * @param value
 */
export function isLikePromise(value) {
    return (isVoid(value) &&
        (typeof value === 'object' || isFunction(value)) &&
        isFunction(value.then) &&
        isFunction(value["catch"]));
}
/**
 * 是否为真值
 * @param value
 */
export function isTruthy(value) {
    return value === true || value === 1;
}
/**
 * 是否为假值
 * @param value
 */
export function isFalsy(value) {
    return value === false || value === 0;
}
export var TypeChecker = {
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
export default new Proxy(TypeChecker, {
    get: function (target, p, receiver) {
        if (p === 'not') {
            return Object.create(target);
        }
        if (hasOwn(target, p)) {
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