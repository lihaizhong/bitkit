// Copyright (c) 2021 Sangbaipi
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import Checker from "./checker"
import transform from "./transform"

export default {
  typeOfString(fieldValue: string | number, defaultValue: any, key: string) {
    if (Checker.isSameClass(fieldValue, String)) {
      return fieldValue
    }

    if (Checker.isSameClass(fieldValue, Number)) {
      return fieldValue.toString()
    }

    if (!Checker.isVoid(fieldValue)){
      console.warn(`【MKFS.typeOfString】${key} is not a string or number!`, fieldValue)
    }

    return defaultValue
  },

  typeOfNumber(fieldValue: string | number, defaultValue: any, key: string) {
    if (Checker.isSameClass(fieldValue, Number)) {
      return fieldValue
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

  typeOfBoolean(fieldValue: boolean, defaultValue: any, key: string) {
    if (Checker.isSameClass(fieldValue, Boolean)) {
      return fieldValue
    }

    if (!Checker.isVoid(fieldValue)) {
      console.warn(`【MKFS.typeOfBoolean】${key} is not a boolean`, fieldValue)
    }

    return defaultValue
  },

  typeOfObject(fieldValue: object, defaultValue: any, key: string) {
    if (Checker.isSameClass(fieldValue, Object)) {
      return fieldValue
    }

    if (!Checker.isVoid(fieldValue)) {
      console.warn(`【MKFS.typeOfObject】${key} is not a plain object`, fieldValue)
    }

    return defaultValue
  },

  typeOfArray(type: any, fieldValue: any[], defaultValue: any, key: string, config: any) {
    if (Checker.isArray(fieldValue)) {
      return fieldValue.map((value) => transform(config, { type }, value, ""))
    }

    if (!Checker.isVoid(fieldValue)) {
      console.warn(`【MKFS.typeOfArray】${key} is not a array!`, fieldValue)
    }

    return defaultValue
  },

  typeOfAny(fieldValue: any) {
    return fieldValue
  },

  typeOfDefault(MiddlewareBean: any, data: any, config: any) {
    if (Checker.isVoid(MiddlewareBean)) {
      return MiddlewareBean
    }

    const middlewareBean = new MiddlewareBean(config)

    middlewareBean.transform(data)

    return middlewareBean.valueOf()
  }
}
