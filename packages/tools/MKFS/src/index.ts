// Copyright (c) 2021 Sangbaipi
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { Any } from "./Types";
import Tools from "./tools";
import transform from "./transform";
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
  private __bean_target__: any = null;

  private __bean_config__: ITransformBean.GlobalOptions = {
    // 是否使用
    loose: false,

    // 是否清理undefined属性
    // * 使用时，loose配置必须为true
    abandonUndefinedValue: false,

    // 开启后，只遍历已配置的属性
    strict: false
  };

  static Types = { Any };

  constructor(config?: ITransformBean.GlobalOptions) {
    if (Tools.isObject(config)) {
      this.__bean_config__ = config as ITransformBean.GlobalOptions;
    }
  }

  transform(data: any = {}) {
    const target: any = {};
    const keys = Object.keys(this).filter((key) =>
      Tools.isReservedProperty(key)
    );
    const rawKeys = Object.keys(data);
    let defaultKeys: string[] = [];

    if (!this.__bean_config__.strict && rawKeys.length > keys.length) {
      defaultKeys = rawKeys.filter((key) => !keys.includes(key));
    }

    // 设置已配置的属性
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const config: ITransformBean.FieldConfig = (this as any)[key];

      config["__name__"] = key;

      if (typeof config === "object") {
        const value = transform(this.__bean_config__, config, data, key);

        // 判断是否丢弃undefined的数据
        if (this.__bean_config__.abandonUndefinedValue && Tools.isUndefined(value)) {
          continue;
        }

        target[key] = value;
      } else if (!this.__bean_config__.strict) {
        defaultKeys.push(key);
      }
    }

    // 设置未配置的属性
    if (!this.__bean_config__.strict && Tools.isArray(defaultKeys)) {
      for (let i = 0; i < defaultKeys.length; i++) {
        const key = defaultKeys[i];
        const value = transform(
          this.__bean_config__,
          { __name__: key, type: Any },
          data,
          key
        );

        // 判断是否丢弃undefined的数据
        if (this.__bean_config__.abandonUndefinedValue && Tools.isUndefined(value)) {
          continue;
        }

        target[key] = value;
      }
    }

    // 静止扩展属性
    Object.preventExtensions(target);
    // 保证前面获取keys时，this的属性是纯净的
    this.__bean_target__ = target;
  }

  valueOf(): any {
    return { ...this.__bean_target__ };
  }

  toString(): string {
    return JSON.stringify(this.__bean_target__);
  }
}
