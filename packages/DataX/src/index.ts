import { Any } from "./Types"
import Checker from "./checker"
import transform from "./transform"
import { ITransformBean } from "./typings"

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
export class DataX {
  private __bean_target__: any = null

  private __bean_config__: ITransformBean.GlobalOptions = {}

  static Types = { Any }

  static globalConfig = {
    looseFields: false,
    abandonUndefinedValue: false,
    strict: true
  }

  static setGlobalConfig(config: ITransformBean.GlobalOptions) {
    Object.assign(DataX.globalConfig, config)
  }

  constructor(config?: ITransformBean.GlobalOptions) {
    if (Checker.isObject(config)) {
      Object.assign(this.__bean_config__, DataX.globalConfig, config)
    }
  }

  transform(data: any = {}) {
    const target: any = {}
    const keys = Object.keys(this).filter((key) =>
      Checker.isReservedProperty(key)
    )
    const rawKeys = Object.keys(data)
    let defaultKeys: string[] = []

    if (!this.__bean_config__.strict && rawKeys.length > keys.length) {
      defaultKeys = rawKeys.filter((key) => !keys.includes(key))
    }

    // 设置已配置的属性
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const config: ITransformBean.FieldConfig = (this as any)[key]

      config["__name__"] = key

      if (typeof config === "object") {
        const value = transform(this.__bean_config__, config, data, key)

        // 判断是否丢弃undefined的数据
        if (this.__bean_config__.abandonUndefinedValue && Checker.isUndefined(value)) {
          continue
        }

        target[key] = value
      } else if (!this.__bean_config__.strict) {
        defaultKeys.push(key)
      }
    }

    // 设置未配置的属性
    if (!this.__bean_config__.strict && Checker.isArray(defaultKeys)) {
      for (let i = 0; i < defaultKeys.length; i++) {
        const key = defaultKeys[i]
        const value = transform(
          this.__bean_config__,
          { __name__: key, type: Any },
          data,
          key
        )

        // 判断是否丢弃undefined的数据
        if (this.__bean_config__.abandonUndefinedValue && Checker.isUndefined(value)) {
          continue
        }

        target[key] = value
      }
    }

    // 静止扩展属性
    Object.preventExtensions(target)
    // 保证前面获取keys时，this的属性是纯净的
    this.__bean_target__ = target
  }

  valueOf(): any {
    return { ...this.__bean_target__ }
  }

  toString(): string {
    return JSON.stringify(this.__bean_target__)
  }
}
