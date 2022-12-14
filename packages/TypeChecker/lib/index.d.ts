export declare const hasOwn: (target: any, property: string) => any;
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
export declare function isSameClass(value: any, type: any): boolean;
/**
 * 时间格式校验
 * @param value
 */
export declare function isValidDate(value: any): boolean;
/**
 * 是否是Null
 * @param value
 */
export declare function isNull(value: any): boolean;
/**
 * 是否是Undefined
 * @param value
 */
export declare function isUndefined(value: any): boolean;
/**
 * 判断是否是undefined、null或者空字符串
 * @param value
 */
export declare function isVoid(value: any): boolean;
/**
 * 基本类型校验(包含null、undefined、string、number、boolean)
 * @param value
 */
export declare function isPrimitive(value: any): boolean;
/**
 * 是否是字符串
 * @param value
 */
export declare function isString(value: any): boolean;
/**
 * 是否是有效数字
 * @param value
 */
export declare function isNumber(value: any): boolean;
/**
 * 是否是布尔类型
 * @param value
 */
export declare function isBoolean(value: any): boolean;
/**
 * 是否是函数
 * @param value
 */
export declare function isFunction(value: any): boolean;
/**
 * 是否是数组
 * @param value
 */
export declare function isArray(value: any): boolean;
/**
 * 是否是对象
 * @param value
 */
export declare function isObject(value: any): boolean;
/**
 * 是否是正则表达式
 * @param value
 */
export declare function isRegExp(value: any): boolean;
/**
 * 是否是Error对象
 * @param value
 */
export declare function isError(value: any): boolean;
/**
 * 是否是原生的Promise对象
 * @param value
 */
export declare function isPromise(value: any): boolean;
/**
 * 是否是类Promise对象
 * @param value
 */
export declare function isLikePromise(value: any): boolean;
/**
 * 是否为真值
 * @param value
 */
export declare function isTruthy(value: any): boolean;
/**
 * 是否为假值
 * @param value
 */
export declare function isFalsy(value: any): boolean;
export declare class Checker {
    not: Partial<ITypes>;
    extensions: ITypes;
    constructor();
    /**
     * 注入反向扩展类型校验
     * @param property
     */
    private injectReverseValidator;
    /**
     * 反向扩展类型校验
     * @param properties
     */
    private reverse;
    /**
     * 扩展类型判断
     * @param name 名称
     * @param validator 校验函数
     * @param addonToNot 是否添加到not模块中
     */
    extend(name: string, validator: TValidator, addonToNot?: boolean): void;
}
declare const _default: Checker & ITypes;
export default _default;
