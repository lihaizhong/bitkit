declare const _default: {
    typeOfString(fieldValue: string | number, defaultValue: any, key: string): any;
    typeOfNumber(fieldValue: string | number, defaultValue: any, key: string): any;
    typeOfBoolean(fieldValue: boolean, defaultValue: any, key: string): any;
    typeOfObject(fieldValue: object, defaultValue: any, key: string): any;
    typeOfArray(type: any, fieldValue: any[], defaultValue: any, key: string, config: any): any;
    typeOfAny(fieldValue: any): any;
    typeOfDefault(MiddlewareBean: any, data: any, config: any): any;
};
export default _default;
