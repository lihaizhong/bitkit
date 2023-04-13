export const hasOwn = (target: any, property: string | symbol) => {
  if('hasOwn' in Object) {
    return Object.hasOwn(target, property);
  }

  const hasOwn = (Object as ObjectConstructor).prototype.hasOwnProperty

  return hasOwn.call(target, property);
}

/**
 * 判断是否是某种具体类型
 * @param value
 * @param type
 */
export function isSameClass(value: any, type: any): boolean {
  if(value === null || value === undefined) {
    return value === type;
  }

  return value.constructor.toString() === type.toString();
}

/**
 * 时间格式校验
 * @param value
 */
export function isValidDate(value: any): boolean {
  return (
    (
      value instanceof Date ||
      isString(value) ||
      (isNumber(value) && value > 0)
    ) && new Date(value).toString() !== 'Invalid Date'
  );
}

/**
 * 是否是Null
 * @param value
 */
export function isNull(value: any): boolean {
  return value === null;
}

/**
 * 是否是Undefined
 * @param value
 */
export function isUndefined(value: any): boolean {
  return typeof value === 'undefined';
}

/**
 * 判断是否是undefined、null或者空字符串
 * @param value
 */
export function isVoid(value: any): boolean {
  return isUndefined(value) || isNull(value) || value === '';
}

/**
 * 基本类型校验(包含null、undefined、string、number、boolean)
 * @param value
 */
export function isPrimitive(value: any): boolean {
  return (
    value === null ||
    ['undefined', 'string', 'number', 'boolean'].includes(typeof value)
  );
}

/**
 * 是否是字符串
 * @param value
 */
export function isString(value: any): boolean {
  return typeof value === 'string';
}

/**
 * 是否是有效数字
 * @param value
 */
export function isNumber(value: any): boolean {
  return typeof value === 'number' && Number.isFinite(value);
}

/**
 * 是否是布尔类型
 * @param value
 */
export function isBoolean(value: any): boolean {
  return typeof value === 'boolean';
}

/**
 * 是否是函数
 * @param value
 */
export function isFunction(value: any): boolean {
  return typeof value === 'function';
}

/**
 * 是否是数组
 * @param value
 */
export function isArray(value: any): boolean {
  return Array.isArray(value);
}

/**
 * 是否是对象
 * @param value
 */
export function isObject(value: any): boolean {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * 是否是正则表达式
 * @param value
 */
export function isRegExp(value: any): boolean {
  return Object.prototype.toString.call(value) === '[object RegExp]';
}

/**
 * 是否是Error对象
 * @param value
 */
export function isError(value: any): boolean {
  return value instanceof Error;
}

/**
 * 是否是原生的Promise对象
 * @param value
 */
export function isPromise(value: any): boolean {
  return value instanceof Promise;
}

/**
 * 是否是类Promise对象
 * @param value
 */
export function isLikePromise(value: any): boolean {
  return (
    isVoid(value) &&
    (typeof value === 'object' || isFunction(value)) &&
    isFunction(value.then) &&
    isFunction(value.catch)
  );
}

/**
 * 是否为真值
 * @param value
 */
export function isTruthy(value: any): boolean {
  return value === true || value === 1;
}

/**
 * 是否为假值
 * @param value
 */
export function isFalsy(value: any): boolean {
  return value === false || value === 0;
}

export const TypeChecker = {
    isSameClass,

    isValidDate,

    isNull,

    isUndefined,

    isVoid,

    isPrimitive,

    isString,

    isNumber,

    isBoolean,

    isTruthy,

    isFalsy,

    isFunction,

    isArray,

    isObject,

    isRegExp,

    isError,

    isPromise,

    isLikePromise
  };

  export default new Proxy(TypeChecker, {
    get(target: any, p: string | symbol, receiver: any): any {
      if (p === 'not') {
        return Object.create(target)
      }

      if (hasOwn(target, p)) {
        return Reflect.get(target, p, receiver);
      }

      return !Reflect.get(target, p, receiver)
    },

    set(target: any, p: string | symbol, newValue: any, receiver: any): boolean {
      if (typeof newValue !== 'function') {
        throw new Error(`${p.toString()} must be a function!`);
      }

      if (newValue.length !== 1) {
        throw new Error(`${p.toString()} can only be one parameter!`);
      }

      Reflect.set(target, p, newValue, receiver);

      return true;
    }
  })
