import Checker from "./checker"
import { Convertor } from "./Convertor"
import { ITransformBean } from "../typings"

export default {
  typeOfString(fieldValue: string | number, defaultValue: any, key: string): string {
    if (Checker.isSameClass(fieldValue, String)) {
      return fieldValue as string
    }

    if (Checker.isSameClass(fieldValue, Number)) {
      return fieldValue.toString()
    }

    if (!Checker.isVoid(fieldValue)){
      console.warn(`【MKFS.typeOfString】${key} is not a string or number!`, fieldValue)
    }

    return defaultValue
  },

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
      console.warn(`【MKFS.typeOfNumber】${key} is not a number or numeric string`, fieldValue)
    }

    return defaultValue
  },

  typeOfBoolean(fieldValue: boolean, defaultValue: any, key: string): boolean {
    if (Checker.isSameClass(fieldValue, Boolean)) {
      return fieldValue
    }

    if (!Checker.isVoid(fieldValue)) {
      console.warn(`【MKFS.typeOfBoolean】${key} is not a boolean`, fieldValue)
    }

    return defaultValue
  },

  typeOfObject(fieldValue: object, defaultValue: any, key: string): Record<string, any> {
    if (Checker.isSameClass(fieldValue, Object)) {
      return fieldValue
    }

    if (!Checker.isVoid(fieldValue)) {
      console.warn(`【MKFS.typeOfObject】${key} is not a plain object`, fieldValue)
    }

    return defaultValue
  },

  typeOfArray(
    fieldValue: any[],
    defaultValue: any,
    key: string,
    fieldConfig: ITransformBean.FieldConfig,
    config: ITransformBean.GlobalOptions
  ): any[] {
    if (Checker.isArray(fieldValue)) {
      return fieldValue.map((value: any, index: number) => {
        const convertor = new Convertor(`__DATA_X_ITEM__${key}_${index}__`, config)

        return convertor.transform(fieldConfig, value)
      })
    }

    if (!Checker.isVoid(fieldValue)) {
      console.warn(`【MKFS.typeOfArray】${key} is not a array!`, fieldValue)
    }

    return defaultValue
  },

  typeOfAny(fieldValue: any): any {
    return fieldValue
  },

  typeOfDefault(MiddlewareBean: any, data: any, config: any): any {
    if (Checker.isVoid(MiddlewareBean)) {
      return data
    }

    const middlewareBean = new MiddlewareBean(config)

    middlewareBean.transform(data)

    return middlewareBean.valueOf()
  }
}
