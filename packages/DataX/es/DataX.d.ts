import { Any } from "./Types";
import { ITransformBean } from "./typings";
/**
 * ** Global Config
 *  * loose 是否自动填充默认值。如果值为undefined，将根据类型自动填充默认值
 *  * abandonUndefinedValue 如果值为undefined，直接过滤，需要配合loose一起使用
 *  * strict 如果没有配置，则不添加
 * ** Item Config
 *  * type {any} 必填，表示类型  可以是String、Number、Boolean、Array、泛型
 *  * itemType {any} 必填（数组），表示数组子集类型
 *  * defaultValue {string} 选填，表示默认值，如果不指定，Bean类会根据类型指定字符串
 *  * field {string|function} 选填，表示后台对应的字段，如果不指定，就是当前的key。field可以是一个方法，参数为data，主要用于自定义数据
 *  // reverse {function} 选填，表示前端对应字段由多个字段组成时，如何进行拆分。参数为data，主要用于自定义数据
 */
export declare class DataX {
    private __bean_target__;
    private __bean_config__;
    static Types: {
        Any: typeof Any;
    };
    static globals: {
        config: {
            looseFields: boolean;
            abandonUndefinedValue: boolean;
            strict: boolean;
        };
        set(config: ITransformBean.GlobalOptions): void;
    };
    static transformArray(data: any[], fieldConfig: ITransformBean.FieldConfig | DataX, config?: ITransformBean.GlobalOptions): any;
    constructor(config?: ITransformBean.GlobalOptions);
    transform(data: any): void;
    valueOf(): any;
    toString(): string;
}
