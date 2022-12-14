import { ITransformBean } from "../typings";
export declare class Convertor {
    private options;
    private name;
    constructor(name: string, options: ITransformBean.GlobalOptions);
    /**
     * 设置默认值
     * @param {any} type 数据类型
     * @param {any} defaultValue 用户定义的默认数值
     * @param {any} placeholderValue 系统定义的默认数值
     * @param {any} options 数据类型判断
     * @returns {any}
     */
    private getDefaultValue;
    /**
     * 生成字段配置信息
     * @param {any} fieldConfig
     * @returns {any}
     */
    private generateFieldOptions;
    /**
     * 解析field对应的值
     * @param {object} target
     * @param {string|function} field
     * @param {string} defaultField
     */
    private parseFieldValue;
    /**
     * 设置各种类型的值
     * @param {object} fieldConfig 字段配置信息
     * @param {any} data 数据
     */
    convert(fieldConfig: ITransformBean.FieldConfig, data: any, CustomValueParser: ITransformBean.GlobalOptions['parser']): any;
}
