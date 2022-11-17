import { ITransformBean } from "./typings";
declare const _default: {
    typeOfString(fieldValue: string | number, defaultValue: any, key: string): string;
    typeOfNumber(fieldValue: string | number, defaultValue: any, key: string): number;
    typeOfBoolean(fieldValue: boolean, defaultValue: any, key: string): boolean;
    typeOfObject(fieldValue: object, defaultValue: any, key: string): Record<string, any>;
    typeOfArray(fieldValue: any[], defaultValue: any, key: string, fieldConfig: ITransformBean.FieldConfig, config: ITransformBean.GlobalOptions): any[];
    typeOfAny(fieldValue: any): any;
    typeOfDefault(MiddlewareBean: any, data: any, config: any): any;
};
export default _default;
