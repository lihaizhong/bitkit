import { FieldConfig, PresetConfig } from "typings";
export declare class Convertor {
    /**
     * 设置默认值
     * @param {any} type 数据类型
     * @param {any} defaultValue 用户定义的默认数值
     * @param {any} placeholderValue 系统定义的默认数值
     * @returns {any}
     */
    private getDefaultValue;
    /**
     * 解析field对应的值
     * @param {object} target
     * @param {string|function} field
     * @param {string} defaultField
     */
    private parseFieldValue;
    private parseFieldConfig;
    /**
     * 设置各种类型的值
     * @param {object} fieldConfig 字段配置信息
     * @param {any} data 数据
     */
    convertDefinedField(fieldConfig: FieldConfig, data: any): any;
    convertArray(name: string | PresetConfig, data: any[]): Record<string, any>[];
    convertObject(name: string | PresetConfig, data: Record<string, any>): Record<string, any>;
}
