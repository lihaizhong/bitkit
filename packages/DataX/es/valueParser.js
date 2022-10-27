// Copyright (c) 2021 Sangbaipi
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import Checker from "./checker";
import transform from "./transform";
export default {
    typeOfString: function (fieldValue, defaultValue, key) {
        if (Checker.isSameClass(fieldValue, String)) {
            return fieldValue;
        }
        if (Checker.isSameClass(fieldValue, Number)) {
            return fieldValue.toString();
        }
        if (!Checker.isVoid(fieldValue)) {
            console.warn("\u3010MKFS.typeOfString\u3011".concat(key, " is not a string or number!"), fieldValue);
        }
        return defaultValue;
    },
    typeOfNumber: function (fieldValue, defaultValue, key) {
        if (Checker.isSameClass(fieldValue, Number)) {
            return fieldValue;
        }
        if (Checker.isSameClass(fieldValue, String) &&
            /^\d+$/.test(fieldValue)) {
            return Number(fieldValue);
        }
        if (!Checker.isVoid(fieldValue)) {
            console.warn("\u3010MKFS.typeOfNumber\u3011".concat(key, " is not a number or numeric string"), fieldValue);
        }
        return defaultValue;
    },
    typeOfBoolean: function (fieldValue, defaultValue, key) {
        if (Checker.isSameClass(fieldValue, Boolean)) {
            return fieldValue;
        }
        if (!Checker.isVoid(fieldValue)) {
            console.warn("\u3010MKFS.typeOfBoolean\u3011".concat(key, " is not a boolean"), fieldValue);
        }
        return defaultValue;
    },
    typeOfObject: function (fieldValue, defaultValue, key) {
        if (Checker.isSameClass(fieldValue, Object)) {
            return fieldValue;
        }
        if (!Checker.isVoid(fieldValue)) {
            console.warn("\u3010MKFS.typeOfObject\u3011".concat(key, " is not a plain object"), fieldValue);
        }
        return defaultValue;
    },
    typeOfArray: function (type, fieldValue, defaultValue, key, config) {
        if (Checker.isArray(fieldValue)) {
            return fieldValue.map(function (value) { return transform(config, { type: type }, value, ""); });
        }
        if (!Checker.isVoid(fieldValue)) {
            console.warn("\u3010MKFS.typeOfArray\u3011".concat(key, " is not a array!"), fieldValue);
        }
        return defaultValue;
    },
    typeOfAny: function (fieldValue) {
        return fieldValue;
    },
    typeOfDefault: function (MiddlewareBean, data, config) {
        var middlewareBean = new MiddlewareBean(config);
        middlewareBean.transform(data);
        return middlewareBean.valueOf();
    }
};
//# sourceMappingURL=valueParser.js.map