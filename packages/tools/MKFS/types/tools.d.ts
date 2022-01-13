declare class TransformTools {
    hasOwn(target: any, key: string): boolean;
    isReservedProperty(name: string): boolean;
    isSameType(value: any, type: any): boolean;
    isObject(value: any): boolean;
    isArray(value: any): boolean;
    isBoolean(value: any): boolean;
    isString(value: any): boolean;
    isNull(value: any): boolean;
    isUndefined(value: any): boolean;
    isVoid(value: any): boolean;
    isFunction(value: any): boolean;
}
declare const _default: TransformTools;
export default _default;
