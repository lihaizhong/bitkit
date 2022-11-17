import Checker from "./checker"
import { Convertor } from "./Convertor"
import { Any } from "./Types"
import { ITransformBean } from "../typings"

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

  static globals = {
    config: {
      looseFields: false,
      abandonUndefinedValue: false,
      strict: true
    },
    set(config: ITransformBean.GlobalOptions) {
      Object.assign(DataX.globals.config, config)
    }
  }

  static transformArray(data: any[], fieldConfig: ITransformBean.FieldConfig | DataX, config?: ITransformBean.GlobalOptions) {
    const convertor = new Convertor("__DATA_X_ITEM__ROOT__", config)

    if (fieldConfig instanceof DataX) {
      return convertor.transform({ type: fieldConfig }, data)
    }

    if (Checker.isObject(fieldConfig) && fieldConfig.type instanceof DataX) {
      return convertor.transform(fieldConfig, data)
    }

    throw new Error('【MKFS.typeOfString】second param must be a type of DataX!')
  }

  constructor(config?: ITransformBean.GlobalOptions) {
    if (Checker.isObject(config)) {
      Object.assign(this.__bean_config__, DataX.globals.config, config)
    }
  }

  transform(data: any) {
    // 初始化原生数据，使之能作为一个对象输入
    const rawData: Record<string, any> = Object.assign({}, data)
    // 结果对象
    const target: any = {}
    // 获取所有的用户定义字段
    const keys = Object.keys(this).filter((key) =>
      Checker.isReservedProperty(key)
    )
    // 获取数据包含的字段
    const rawKeys = Object.keys(rawData)
    // 获取所有非用户定义字段
    let defaultKeys: string[] = []

    // 收集所有非用户定义字段
    if (!this.__bean_config__.strict) {
      defaultKeys = rawKeys.filter((key) => !keys.includes(key))
    }

    // 设置已配置的属性
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      // 获取已定义属性的配置信息
      const config: ITransformBean.FieldConfig = (this as any)[key]

      // 只有object类型的config会被处理
      if (typeof config === "object") {
        const convertor = new Convertor(key, this.__bean_config__)
        // 调用核心的转换函数
        const value = convertor.transform(config, rawData)

        // 判断是否丢弃undefined的数据
        if (this.__bean_config__.abandonUndefinedValue && Checker.isUndefined(value)) {
          continue
        }

        target[key] = value
      } else if (!this.__bean_config__.strict) {
        // 收集非标准的用户定义字段
        defaultKeys.push(key)
      }
    }

    // 设置未配置的属性
    if (!this.__bean_config__.strict) {
      for (let i = 0; i < defaultKeys.length; i++) {
        const key = defaultKeys[i]
        const convertor = new Convertor(key, this.__bean_config__)
        const value = convertor.transform({ type: Any }, rawData)

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
