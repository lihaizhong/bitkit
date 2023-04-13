import { ITransformBean } from "../typings"
import TypeChecker from "./checker"
import { checkOfStrict } from "@lihzsky/type-checker"
import { DataX } from "./DataX"
import { debug } from "./log"
import { Any } from "./Types"
import ValueParser from "./valueParser"

export class Convertor {
  private options: ITransformBean.GlobalOptions

  private name: string

  constructor(name: string, options: ITransformBean.GlobalOptions) {
    this.name = name
    this.options = options
  }

  /**
   * 设置默认值
   * @param {any} type 数据类型
   * @param {any} defaultValue 用户定义的默认数值
   * @param {any} placeholderValue 系统定义的默认数值
   * @param {any} options 数据类型判断
   * @returns {any}
   */
  private getDefaultValue(
    type: any,
    defaultValue: any,
    placeValue: any,
    options: ITransformBean.FieldOptions
  ): any {
    if (options.loose || checkOfStrict(defaultValue, type) || TypeChecker.isNull(defaultValue)) {
      return defaultValue
    }

    return placeValue
  }

  /**
   * 生成字段配置信息
   * @param {any} fieldConfig
   * @returns {any}
   */
  private generateFieldOptions(fieldConfig: ITransformBean.FieldConfig): ITransformBean.FieldOptions {
    const fieldOptionKeys: string[] = ['loose']
    const OPTION_MAPPING = {
      loose: 'looseFields'
    }

    return fieldOptionKeys.reduce(
      (fieldOptions: Partial<ITransformBean.FieldOptions>, key: string) => {
        if (!TypeChecker.isVoid(fieldConfig[key])) {
          fieldOptions[key] = fieldConfig[key]
        } else {
          const globalOptionKey = OPTION_MAPPING[key]

          fieldOptions[key] = this.options[globalOptionKey]
        }

        return fieldOptions
      },
      {}
    ) as ITransformBean.FieldOptions
  }

  /**
   * 解析field对应的值
   * @param {object} target
   * @param {string|function} field
   * @param {string} defaultField
   */
  private parseFieldValue(target: any, field: any, defaultField: string): any {
    if (TypeChecker.isObject(target)) {
      if (TypeChecker.isString(field)) {
        return target[field]
      }

      if (TypeChecker.isFunction(field)) {
        return field(target)
      }

      if (TypeChecker.isString(defaultField) && defaultField !== "") {
        return target[defaultField]
      }
    }

    return target
  }

  /**
   * 设置各种类型的值
   * @param {object} fieldConfig 字段配置信息
   * @param {any} data 数据
   */
  convert(fieldConfig: ITransformBean.FieldConfig, data: any, CustomValueParser: ITransformBean.GlobalOptions['parser']): any {
    const { type, itemType, field, defaultValue } = fieldConfig
    const fieldValue: any = this.parseFieldValue(data, field, this.name)
    const options: ITransformBean.FieldOptions = this.generateFieldOptions(fieldConfig)

    debug('DataX.convert', this.name, fieldConfig, options, data)

    switch (type) {
      case Any:
        return ValueParser.typeOfAny(fieldValue)
      case String:
        return ValueParser.typeOfString(
          fieldValue,
          this.getDefaultValue(type, defaultValue, "", options),
          this.name
        )
      case Number:
        return ValueParser.typeOfNumber(
          fieldValue,
          this.getDefaultValue(type, defaultValue, null, options),
          this.name
        )
      case Boolean:
        return ValueParser.typeOfBoolean(
          fieldValue,
          this.getDefaultValue(type, defaultValue, null, options),
          this.name
        )
      case Array:
        return ValueParser.typeOfArray(
          fieldValue,
          this.getDefaultValue(type, defaultValue, [], options),
          this.name,
          { ...options, type: itemType },
          this.options,
          CustomValueParser
        )
      case Object:
        return ValueParser.typeOfObject(
          fieldValue,
          this.getDefaultValue(type, defaultValue, {}, options),
          this.name
        )
      default:
        if (type instanceof DataX) {
          return ValueParser.typeOfDefault(type, fieldValue, this.name, this.options)
        }

        return CustomValueParser(this.name, fieldConfig, fieldValue, options)
    }
  }
}
