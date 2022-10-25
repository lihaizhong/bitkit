import { ITransformBean } from "./typings";
/**
 * 设置各种类型的值
 * @param {object} config 配置信息
 * @param {object} fieldConfig 字段配置信息
 * @property {any} type 字段类型。必传
 * @property {any} itemType 数组项的字段类型。如果是数组，必传
 * @param {any} data 数据
 * @param {string} key 数据的key值
 */
export default function transform(config: ITransformBean.GlobalOptions, fieldConfig: ITransformBean.FieldConfig, data: any, key: string): any;
