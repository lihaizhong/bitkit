export const hasOwn = (target: any, property: string) => {
  if('hasOwn' in Object) {
    return Object.hasOwn(target, property);
  }

  const hasOwn = (Object as ObjectConstructor).prototype.hasOwnProperty

  return hasOwn.call(target, property);
}

export type TValidator = (value: any, type?: any) => boolean;

export interface ITypes {
  isSameClass: TValidator;
  isValidDate: TValidator;
  isNull: TValidator;
  isUndefined: TValidator;
  isVoid: TValidator;
  isPrimitive: TValidator;
  isString: TValidator;
  isNumber: TValidator;
  isBoolean: TValidator;
  isTruthy: TValidator;
  isFalsy: TValidator;
  isFunction: TValidator;
  isArray: TValidator;
  isObject: TValidator;
  isRegExp: TValidator;
  isError: TValidator;
  isPromise: TValidator;
  isLikePromise: TValidator;
  [key: string]: TValidator;
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

export class Checker {
  // 反向扩展类型校验集合
  not: Partial<ITypes> = {};

  // 扩展类型校验集合
  extensions: ITypes = {
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

    isLikePromise,
  };

  constructor() {
    const keys: string[] = Object.keys(this.extensions).filter((key) => (
      /^is.+/.test(key) &&
      hasOwn(this.extensions, key) &&
      !['isTruthy', 'isFalsy'].includes[key]
    ));

    this.reverse(keys);
  }

  /**
   * 注入反向扩展类型校验
   * @param property
   */
  private injectReverseValidator(property: string): void {
    this.not[property] = (value: any, type?: string) => {
      if(property in this.extensions) {
        return !this.extensions[property](value, type);
      }
    }
  }

  /**
   * 反向扩展类型校验
   * @param properties
   */
  private reverse(properties: string | string[]): void {
    if(this.extensions.isString(properties)) {
      this.injectReverseValidator(properties as string);
    } else if(this.extensions.isArray(properties)) {
      (properties as string[]).forEach(
        (property: string) =>
          this.injectReverseValidator(property)
      );
    }
  }

  /**
   * 扩展类型判断
   * @param name 名称
   * @param validator 校验函数
   * @param addonToNot 是否添加到not模块中
   */
  extend(name: string, validator: TValidator, addonToNot: boolean = false): void {
    if(this.extensions[name]) {
      console.warn(`扩展类型${name}已存在，建议更换一个名称！`);
    }

    this.extensions[name] = validator;

    if(addonToNot) {
      this.reverse(name);
    }
  }
}

const checker = new Checker();

export default new Proxy(checker, {
  get(target: Checker, p: string) {
    if(target.extensions[p]) {
      return Reflect.get(target.extensions, p);
    }

    return Reflect.get(target, p);
  },
  set(_target: Checker, _value: any) {
    throw new Error('TypeChecker不支持直接扩展，请使用TypeChecker.extend方法代替！');
  }
}) as Checker & ITypes;
