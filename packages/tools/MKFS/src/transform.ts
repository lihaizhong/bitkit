// Copyright (c) 2021 Sangbaipi
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { Any } from "./Types"
import Tools from "./tools"
import ValueParser from "./valueParser"
import { ITransformBean } from "./typings"

function getConfigKey(key: string): string | void {
  switch (key) {
    case "loose":
      return "looseFields"
    default:
  }
}

function getFieldProfile(
  config: ITransformBean.GlobalOptions,
  fieldConfig: ITransformBean.FieldConfig
): ITransformBean.FieldOptions {
  const keys: string[] = ["loose"]

  return keys.reduce((_config: any, key: string) => {
    if (!Tools.isVoid(fieldConfig[key])) {
      _config[key] = fieldConfig[key]

      return _config
    }

    const configKey = getConfigKey(key)
    if (Tools.isString(configKey)) {
      const value: any = (config as Record<string, any>)[configKey as string]

    switch (key) {
      case "loose":
        if (Tools.isBoolean(value)) {
          _config[key] = value
        } else if (Tools.isArray(value)) {
          _config[key] = value.includes(fieldConfig.__name__ as string)
        } else {
          _config[key] = false
        }
        break
      default:
        _config[key] = value
    }
    }


    return _config
  }, {})
}

/**
 * 设置默认值
 * @param {any} type 数据类型
 * @param {any} defaultValue 用户定义的默认数值
 * @param {any} placeholderValue 系统定义的默认数值
 * @param {any} options 数据类型判断
 */
function getDefaultValue(
  type: any,
  defaultValue: any,
  placeholderValue: any,
  options: ITransformBean.FieldOptions
): any {
  if (options.loose || Tools.isSameType(defaultValue, type) || Tools.isNull(defaultValue)) {
    return defaultValue
  }

  return placeholderValue
}

/**
 * 解析field对应的值
 * @param {object} target
 * @param {string|function} field
 * @param {string} key
 */
function parseFieldValue(target: any, field: any, key: string): any {
  if (Tools.isString(field)) {
    return target[field]
  }

  if (Tools.isFunction(field)) {
    return field(target)
  }

  if (Tools.isString(key) && key !== "") {
    return target[key]
  }

  return target
}

/**
 * 设置各种类型的值
 * @param {object} config 配置信息
 * @param {object} fieldConfig 字段配置信息
 * @property {any} type 字段类型。必传
 * @property {any} itemType 数组项的字段类型。如果是数组，必传
 * @param {any} data 数据
 * @param {string} key 数据的key值
 */
export default function transform(
  config: ITransformBean.GlobalOptions,
  fieldConfig: ITransformBean.FieldConfig,
  data: any,
  key: string
): any {
  const { __name__: name, type, itemType, field, defaultValue } = fieldConfig
  const fieldValue: any = parseFieldValue(data, field, key)
  const options: ITransformBean.FieldOptions = getFieldProfile(config, fieldConfig)

  switch (type) {
    case Any:
      return ValueParser.typeOfAny(fieldValue)
    case String:
      return ValueParser.typeOfString(
        fieldValue,
        getDefaultValue(type, defaultValue, "", options),
        name
      )
    case Number:
      return ValueParser.typeOfNumber(
        fieldValue,
        getDefaultValue(type, defaultValue, null, options),
        name
      )
    case Boolean:
      return ValueParser.typeOfBoolean(
        fieldValue,
        getDefaultValue(type, defaultValue, null, options),
        name
      )
    case Array:
      return ValueParser.typeOfArray(
        itemType,
        fieldValue,
        getDefaultValue(type, defaultValue, [], options),
        name,
        config
      )
    case Object:
      return ValueParser.typeOfObject(
        fieldValue,
        getDefaultValue(type, defaultValue, {}, options),
        name
      )
    default:
      return ValueParser.typeOfDefault(type, fieldValue, config)
  }
}
