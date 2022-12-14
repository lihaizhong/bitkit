import { ITransformBean } from "../typings";
declare const _default: {
    /**
     * 解析成字符串
     * @param fieldValue
     * @param defaultValue
     * @param key
     * @returns
     */
    typeOfString(fieldValue: string | number, defaultValue: any, key: string): string;
    /**
     * 解析成数字
     * @param fieldValue
     * @param defaultValue
     * @param key
     * @returns
     */
    typeOfNumber(fieldValue: string | number, defaultValue: any, key: string): number;
    /**
     * 解析成布尔
     * @param fieldValue
     * @param defaultValue
     * @param key
     * @returns
     */
    typeOfBoolean(fieldValue: boolean, defaultValue: any, key: string): boolean;
    /**
     * 解析成对象
     * @param fieldValue
     * @param defaultValue
     * @param key
     * @returns
     */
    typeOfObject(fieldValue: object, defaultValue: any, key: string): Record<string, any>;
    /**
     * 解析成数组
     * @param fieldValue
     * @param defaultValue
     * @param key
     * @param fieldConfig
     * @param config
     * @returns
     */
    typeOfArray(fieldValue: any[], defaultValue: any, key: string, fieldConfig: ITransformBean.FieldConfig, config: ITransformBean.GlobalOptions, parser: any): any[];
    /**
     * 不对任何值进行解析，直接输出
     * @param fieldValue
     * @returns
     */
    typeOfAny(fieldValue: any): any;
    /**
     * 解析继承自DataX的类型
     * @param MiddlewareBean
     * @param data
     * @param key
     * @param config
     * @returns
     */
    typeOfDefault(MiddlewareBean: any, data: any, key: string, config: any): any;
};
export default _default;
