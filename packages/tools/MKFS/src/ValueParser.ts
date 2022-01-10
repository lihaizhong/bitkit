// Copyright (c) 2021 Sangbaipi
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import Tools from "./tools";
import transform from "./transform";

class ValueParser {
  typeOfString(fieldValue: string | number, defaultValue: any) {
    if (Tools.isSameType(fieldValue, String)) {
      return fieldValue;
    }

    if (Tools.isSameType(fieldValue, Number)) {
      return fieldValue.toString();
    }

    return defaultValue;
  }

  typeOfNumber(fieldValue: string | number, defaultValue: any) {
    if (Tools.isSameType(fieldValue, Number)) {
      return fieldValue;
    }

    if (
      Tools.isSameType(fieldValue, String) &&
      /^\d+$/.test(fieldValue as unknown as string)
    ) {
      return Number(fieldValue);
    }

    return defaultValue;
  }

  typeOfBoolean(fieldValue: boolean, defaultValue: any) {
    if (Tools.isSameType(fieldValue, Boolean)) {
      return fieldValue;
    }

    return defaultValue;
  }

  typeOfObject(fieldValue: object, defaultValue: any) {
    if (Tools.isSameType(fieldValue, Object)) {
      return fieldValue;
    }

    return defaultValue;
  }

  typeOfArray(type: any, fieldValue: any[], defaultValue: any, config: any) {
    return (fieldValue || defaultValue).map((value) =>
      transform(config, { type }, value, "")
    );
  }

  typeOfAny(fieldValue: any) {
    return fieldValue;
  }

  typeOfDefault(CustomBean: any, data: any, config: any) {
    return new CustomBean(data).valueOf(config);
  }
}

export default new ValueParser();
