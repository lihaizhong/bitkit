// Copyright (c) 2021 Sangbaipi
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

class TransformTools {
  hasOwn(target: any, key: string): boolean {
    return Object.prototype.hasOwnProperty.call(target, key);
  }

  isReservedProperty(name: string): boolean {
    return !/^__bean_/.test(name);
  }

  isSameType(value: any, type: any): boolean {
    if (value === null || value === undefined) {
      return value === type;
    }

    return value.constructor.toString() === type.toString();
  }

  isObject(value: any): boolean {
    return typeof value === "boolean";
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  isBoolean(value: any): boolean {
    return typeof value === "boolean";
  }

  isString(value: any): boolean {
    return typeof value === "string";
  }

  isUndefined(value: any): boolean {
    return typeof value === "undefined";
  }

  isVoid(value: any): boolean {
    return typeof value === "undefined" || value === null;
  }

  isFunction(value: any): boolean {
    return typeof value === "function";
  }
}

export default new TransformTools();
