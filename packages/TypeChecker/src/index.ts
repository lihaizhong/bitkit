export const hasOwn = (target: any, property: string | symbol) => {
  if ('hasOwn' in Object) {
    return Object.hasOwn(target, property);
  }

  const hasOwn = (Object as ObjectConstructor).prototype.hasOwnProperty

  return hasOwn.call(target, property);
}

/**
 * 判断是否是某种具体类型
 * * strong
 * @param value
 * @param type
 */
export function checkOfStrict(value: any, type: any): boolean {
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
export function isDate(value: any): boolean {
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
 * * strong
 * @param value
 */
export function isNull(value: any): boolean {
  return value === null;
}

/**
 * 是否是Undefined
 * * strong
 * @param value
 */
export function isUndefined(value: any): boolean {
  return typeof value === 'undefined';
}

/**
 * 判断是否是undefined、null或者空字符串
 * * strong
 * @param value
 */
export function isVoid(value: any): boolean {
  return isUndefined(value) || isNull(value) || value === '';
}

/**
 * 基本类型校验(包含null、undefined、string、number、boolean、symbol)
 * * strong
 * @param value
 */
export function isPrimitive(value: any): boolean {
  return (
    value === null ||
    ['undefined', 'string', 'number', 'boolean', 'symbol'].includes(typeof value)
  );
}

/**
 * 是否是字符串
 * * strong
 * @param value
 */
export function isString(value: any): boolean {
  return typeof value === 'string';
}

/**
 * 是否是有效数字
 * * strong
 * @param value
 */
export function isNumber(value: any): boolean {
  return typeof value === 'number' && Number.isFinite(value);
}

/**
 * 是否是布尔类型
 * * strong
 * @param value
 */
export function isBoolean(value: any): boolean {
  return typeof value === 'boolean';
}

/**
 * 是否是函数
 * * strong
 * @param value
 */
export function isFunction(value: any): boolean {
  return typeof value === 'function';
}

/**
 * 是否是数组
 * * strong
 * @param value
 */
export function isArray(value: any): boolean {
  return Array.isArray(value);
}

/**
 * 是否是对象
 * * strong
 * @param value
 */
export function isObject(value: any): boolean {
  return checkOfStrict(value, Object);
}

/**
 * 是否是正则表达式
 * * strong
 * @param value
 */
export function isRegExp(value: any): boolean {
  return checkOfStrict(value, RegExp);
}

/**
 * 是否是Error对象
 * * loose
 * @param value
 */
export function isError(value: any): boolean {
  return value instanceof Error;
}

/**
 * 是否是原生的Promise对象
 * * loose
 * @param value
 */
export function isPromise(value: any): boolean {
  return value instanceof Promise;
}

/**
 * 是否为真值
 * * loose
 * @param value
 */
export function isTruthy(value: any): boolean {
  return value === true || value === 1;
}

/**
 * 是否为假值
 * * loose
 * @param value
 */
export function isFalsy(value: any): boolean {
  return value === false || value === 0;
}

export const TypeChecker = {
  isDate,

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

  isPromise
};

export type TypeCheckerFn = (value: any) => boolean

export interface TypeCheckerIntr {
  isDate: TypeCheckerFn;

  isNull: TypeCheckerFn;

  isUndefined: TypeCheckerFn;

  isVoid: TypeCheckerFn;

  isPrimitive: TypeCheckerFn;

  isString: TypeCheckerFn;

  isNumber: TypeCheckerFn;

  isBoolean: TypeCheckerFn;

  isTruthy: TypeCheckerFn;

  isFalsy: TypeCheckerFn;

  isFunction: TypeCheckerFn;

  isArray: TypeCheckerFn;

  isObject: TypeCheckerFn;

  isRegExp: TypeCheckerFn;

  isError: TypeCheckerFn;

  isPromise: TypeCheckerFn;

  [key: string]: TypeCheckerFn;
}

export default new Proxy<TypeCheckerIntr>(TypeChecker, {
  get(target: TypeCheckerIntr, p: string | symbol, receiver: any): TypeCheckerFn | TypeCheckerIntr {
    if (p === 'not') {
      return new Proxy(TypeChecker, {
        get(t: TypeCheckerIntr, p: string | symbol, receiver: any): TypeCheckerFn {
          return (value: any) => !Reflect.get(t, p, receiver)(value)
        },

        set(): never {
          throw new Error('don\'t extend method!')
        }
      });
    }

    if (hasOwn(target, p)) {
      return Reflect.get(target, p, receiver);
    }
  },

  set(target: TypeCheckerIntr, p: string | symbol, newValue: any, receiver: any): boolean {
    if (typeof newValue !== 'function') {
      throw new Error(`${p.toString()} must be a function!`);
    }

    if (newValue.length !== 1) {
      throw new Error(`${p.toString()} can only be one parameter!`);
    }

    Reflect.set(target, p, newValue, receiver);

    return true;
  }
}) as TypeCheckerIntr & { not: TypeCheckerIntr }
