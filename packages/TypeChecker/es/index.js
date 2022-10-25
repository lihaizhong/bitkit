export var hasOwn = function (target, property) {
    if ('hasOwn' in Object) {
        return Object.hasOwn(target, property);
    }
    return Object.prototype.hasOwnProperty.call(target, property);
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
            hasOwn(_this.extensions, key) &&
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
export { TypeChecker };
var typeChecker = new TypeChecker();
export default new Proxy(typeChecker, {
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