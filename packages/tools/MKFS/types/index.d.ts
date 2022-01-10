import { Any } from "./Types";
import { ITransformBean } from "./typings";
/**
 * config
 *  * type {any} 必填，表示类型  可以是String、Number、Boolean、Array、泛型
 *  * itemType {any} 必填（数组），表示数组子集类型
 *  * defaultValue {string} 选填，表示默认值，如果不指定，Bean类会根据类型指定字符串
 *  * field {string|function} 选填，表示后台对应的字段，如果不指定，就是当前的key。field可以是一个方法，参数为data，主要用于自定义数据
 *  - reverseField {function} 选填，只有在field为function时，需要将当前的值返还给field字段，用于后台提交，参数为data
 */
export default class TransformBean {
    private __bean_target__;
    private __bean_config__;
    static Types: {
        Any: typeof Any;
    };
    constructor(config?: ITransformBean.GlobalOptions);
    transform(data?: any): void;
    valueOf(): any;
    toString(): string;
}
