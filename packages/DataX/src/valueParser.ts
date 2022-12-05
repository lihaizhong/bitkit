import { ITransformBean } from "../typings"
import Checker from "./checker"
import { Convertor } from "./Convertor"
import { warn } from "./log"

export default {
  /**
   * 解析成字符串
   * @param fieldValue
   * @param defaultValue
   * @param key
   * @returns
   */
  typeOfString(fieldValue: string | number, defaultValue: any, key: string): string {
    if (Checker.isSameClass(fieldValue, String)) {
      return fieldValue as string
    }

    if (Checker.isSameClass(fieldValue, Number)) {
      return fieldValue.toString()
    }

    if (!Checker.isVoid(fieldValue)){
      warn('DataX.typeOfString', `${key} is not a string or number!`, fieldValue)
    }

    return defaultValue
  },

  /**
   * 解析成数字
   * @param fieldValue
   * @param defaultValue
   * @param key
   * @returns
   */
  typeOfNumber(fieldValue: string | number, defaultValue: any, key: string): number {
    if (Checker.isSameClass(fieldValue, Number)) {
      return fieldValue as number
    }

    if (
      Checker.isSameClass(fieldValue, String) &&
      /^\d+$/.test(fieldValue as unknown as string)
    ) {
      return Number(fieldValue)
    }

    if (!Checker.isVoid(fieldValue)) {
      warn('DataX.typeOfNumber', `${key} is not a number or numeric string`, fieldValue)
    }

    return defaultValue
  },

  /**
   * 解析成布尔
   * @param fieldValue
   * @param defaultValue
   * @param key
   * @returns
   */
  typeOfBoolean(fieldValue: boolean, defaultValue: any, key: string): boolean {
    if (Checker.isSameClass(fieldValue, Boolean)) {
      return fieldValue
    }

    if (!Checker.isVoid(fieldValue)) {
      warn('DataX.typeOfBoolean', `${key} is not a boolean`, fieldValue)
    }

    return defaultValue
  },

  /**
   * 解析成对象
   * @param fieldValue
   * @param defaultValue
   * @param key
   * @returns
   */
  typeOfObject(fieldValue: object, defaultValue: any, key: string): Record<string, any> {
    if (Checker.isSameClass(fieldValue, Object)) {
      return fieldValue
    }

    if (!Checker.isVoid(fieldValue)) {
      console.warn('DataX.typeOfObject', `${key} is not a plain object`, fieldValue)
    }

    return defaultValue
  },

  /**
   * 解析成数组
   * @param fieldValue
   * @param defaultValue
   * @param key
   * @param fieldConfig
   * @param config
   * @returns
   */
  typeOfArray(
    fieldValue: any[],
    defaultValue: any,
    key: string,
    fieldConfig: ITransformBean.FieldConfig,
    config: ITransformBean.GlobalOptions
  ): any[] {
    if (Checker.isArray(fieldValue)) {
      const { convert } = fieldConfig

      if (Checker.isFunction(convert)) {
        return convert(Convertor, key, fieldConfig, config)
      }

      return fieldValue.map((value: any, index: number) => {
        const convertor = new Convertor(`__DATA_X_ITEM__${key}_${index}__`, config)

        return convertor.convert(fieldConfig, value)
      })
    }

    if (!Checker.isVoid(fieldValue)) {
      warn('DataX.typeOfArray', `${key} is not a array!`, fieldValue)
    }

    return defaultValue
  },

  /**
   * 不对任何值进行解析，直接输出
   * @param fieldValue
   * @returns
   */
  typeOfAny(fieldValue: any): any {
    return fieldValue
  },

  /**
   * 解析继承自DataX的类型
   * @param MiddlewareBean
   * @param data
   * @param key
   * @param config
   * @returns
   */
  typeOfDefault(MiddlewareBean: any, data: any, key: string, config: any): any {
    if (Checker.isVoid(MiddlewareBean)) {
      return data
    }

    try {
      const middlewareBean = new MiddlewareBean(config)

      middlewareBean.transform(data)

      return middlewareBean.valueOf()
    } catch (ex) {
      warn('DataX.typeOfDefault', `${key} is not a constructor`, MiddlewareBean, data)

      return data
    }
  }
}
