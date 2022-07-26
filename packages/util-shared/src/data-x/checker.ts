import { isSameType, isObject, isArray, isBoolean, isString, isNull, isUndefined, isVoid, isFunction } from "../popular/type-checker"

class TransformChecker {
  hasOwn(target: any, key: string): boolean {
    return Object.prototype.hasOwnProperty.call(target, key)
  }

  isReservedProperty(name: string): boolean {
    return !/^__bean_/.test(name)
  }

  isSameType(value: any, type: any): boolean {
    return isSameType(value, type)
  }

  isObject(value: any): boolean {
    return isObject(value)
  }

  isArray(value: any): boolean {
    return isArray(value)
  }

  isBoolean(value: any): boolean {
    return isBoolean(value)
  }

  isString(value: any): boolean {
    return isString(value)
  }

  isNull(value: any): boolean {
    return isNull(value)
  }

  isUndefined(value: any): boolean {
    return isUndefined(value)
  }

  isVoid(value: any): boolean {
    return isVoid(value)
  }

  isFunction(value: any): boolean {
    return isFunction(value)
  }
}

export default new TransformChecker()
