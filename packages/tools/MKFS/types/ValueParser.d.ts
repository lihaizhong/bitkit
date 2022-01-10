declare class ValueParser {
    typeOfString(fieldValue: string | number, defaultValue: any): any;
    typeOfNumber(fieldValue: string | number, defaultValue: any): any;
    typeOfBoolean(fieldValue: boolean, defaultValue: any): any;
    typeOfObject(fieldValue: object, defaultValue: any): any;
    typeOfArray(type: any, fieldValue: any[], defaultValue: any, config: any): any;
    typeOfAny(fieldValue: any): any;
    typeOfDefault(CustomBean: any, data: any, config: any): any;
}
declare const _default: ValueParser;
export default _default;
