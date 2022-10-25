"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// Copyright (c) 2021 Sangbaipi
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
var checker_1 = __importDefault(require("./checker"));
var transform_1 = __importDefault(require("./transform"));
exports["default"] = {
    typeOfString: function (fieldValue, defaultValue, key) {
        if (checker_1["default"].isSameType(fieldValue, String)) {
            return fieldValue;
        }
        if (checker_1["default"].isSameType(fieldValue, Number)) {
            return fieldValue.toString();
        }
        if (!checker_1["default"].isVoid(fieldValue)) {
            console.warn("\u3010MKFS.typeOfString\u3011".concat(key, " is not a string or number!"), fieldValue);
        }
        return defaultValue;
    },
    typeOfNumber: function (fieldValue, defaultValue, key) {
        if (checker_1["default"].isSameType(fieldValue, Number)) {
            return fieldValue;
        }
        if (checker_1["default"].isSameType(fieldValue, String) &&
            /^\d+$/.test(fieldValue)) {
            return Number(fieldValue);
        }
        if (!checker_1["default"].isVoid(fieldValue)) {
            console.warn("\u3010MKFS.typeOfNumber\u3011".concat(key, " is not a number or numeric string"), fieldValue);
        }
        return defaultValue;
    },
    typeOfBoolean: function (fieldValue, defaultValue, key) {
        if (checker_1["default"].isSameType(fieldValue, Boolean)) {
            return fieldValue;
        }
        if (!checker_1["default"].isVoid(fieldValue)) {
            console.warn("\u3010MKFS.typeOfBoolean\u3011".concat(key, " is not a boolean"), fieldValue);
        }
        return defaultValue;
    },
    typeOfObject: function (fieldValue, defaultValue, key) {
        if (checker_1["default"].isSameType(fieldValue, Object)) {
            return fieldValue;
        }
        if (!checker_1["default"].isVoid(fieldValue)) {
            console.warn("\u3010MKFS.typeOfObject\u3011".concat(key, " is not a plain object"), fieldValue);
        }
        return defaultValue;
    },
    typeOfArray: function (type, fieldValue, defaultValue, key, config) {
        if (checker_1["default"].isArray(fieldValue)) {
            return fieldValue.map(function (value) { return (0, transform_1["default"])(config, { type: type }, value, ""); });
        }
        if (!checker_1["default"].isVoid(fieldValue)) {
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