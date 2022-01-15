// Copyright (c) 2021 Sangbaipi
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import Tools from "./tools";
import transform from "./transform";
export default {
    typeOfString: function (fieldValue, defaultValue, key) {
        if (Tools.isSameType(fieldValue, String)) {
            return fieldValue;
        }
        if (Tools.isSameType(fieldValue, Number)) {
            return fieldValue.toString();
        }
        if (!Tools.isVoid(fieldValue)) {
            console.warn("\u3010MKFS.typeOfString\u3011" + key + " is not a string or number!", fieldValue);
        }
        return defaultValue;
    },
    typeOfNumber: function (fieldValue, defaultValue, key) {
        if (Tools.isSameType(fieldValue, Number)) {
            return fieldValue;
        }
        if (Tools.isSameType(fieldValue, String) &&
            /^\d+$/.test(fieldValue)) {
            return Number(fieldValue);
        }
        if (!Tools.isVoid(fieldValue)) {
            console.warn("\u3010MKFS.typeOfNumber\u3011" + key + " is not a number or numeric string", fieldValue);
        }
        return defaultValue;
    },
    typeOfBoolean: function (fieldValue, defaultValue, key) {
        if (Tools.isSameType(fieldValue, Boolean)) {
            return fieldValue;
        }
        if (!Tools.isVoid(fieldValue)) {
            console.warn("\u3010MKFS.typeOfBoolean\u3011" + key + " is not a boolean", fieldValue);
        }
        return defaultValue;
    },
    typeOfObject: function (fieldValue, defaultValue, key) {
        if (Tools.isSameType(fieldValue, Object)) {
            return fieldValue;
        }
        if (!Tools.isVoid(fieldValue)) {
            console.warn("\u3010MKFS.typeOfObject\u3011" + key + " is not a plain object", fieldValue);
        }
        return defaultValue;
    },
    typeOfArray: function (type, fieldValue, defaultValue, key, config) {
        if (Tools.isArray(fieldValue)) {
            return fieldValue.map(function (value) { return transform(config, { type: type }, value, ""); });
        }
        if (!Tools.isVoid(fieldValue)) {
            console.warn("\u3010MKFS.typeOfArray\u3011" + key + " is not a array!", fieldValue);
        }
        return defaultValue;
    },
    typeOfAny: function (fieldValue) {
        return fieldValue;
    },
    typeOfDefault: function (MiddlewareBean, data, config) {
        var middlewareBean = new MiddlewareBean(config);
        middlewareBean.transform(data);
        return new middlewareBean.valueOf();
    }
};
//# sourceMappingURL=valueParser.js.map