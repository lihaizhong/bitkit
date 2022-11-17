"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var checker_1 = __importDefault(require("./checker"));
var Convertor_1 = require("./Convertor");
exports["default"] = {
    typeOfString: function (fieldValue, defaultValue, key) {
        if (checker_1["default"].isSameClass(fieldValue, String)) {
            return fieldValue;
        }
        if (checker_1["default"].isSameClass(fieldValue, Number)) {
            return fieldValue.toString();
        }
        if (!checker_1["default"].isVoid(fieldValue)) {
            console.warn("\u3010MKFS.typeOfString\u3011".concat(key, " is not a string or number!"), fieldValue);
        }
        return defaultValue;
    },
    typeOfNumber: function (fieldValue, defaultValue, key) {
        if (checker_1["default"].isSameClass(fieldValue, Number)) {
            return fieldValue;
        }
        if (checker_1["default"].isSameClass(fieldValue, String) &&
            /^\d+$/.test(fieldValue)) {
            return Number(fieldValue);
        }
        if (!checker_1["default"].isVoid(fieldValue)) {
            console.warn("\u3010MKFS.typeOfNumber\u3011".concat(key, " is not a number or numeric string"), fieldValue);
        }
        return defaultValue;
    },
    typeOfBoolean: function (fieldValue, defaultValue, key) {
        if (checker_1["default"].isSameClass(fieldValue, Boolean)) {
            return fieldValue;
        }
        if (!checker_1["default"].isVoid(fieldValue)) {
            console.warn("\u3010MKFS.typeOfBoolean\u3011".concat(key, " is not a boolean"), fieldValue);
        }
        return defaultValue;
    },
    typeOfObject: function (fieldValue, defaultValue, key) {
        if (checker_1["default"].isSameClass(fieldValue, Object)) {
            return fieldValue;
        }
        if (!checker_1["default"].isVoid(fieldValue)) {
            console.warn("\u3010MKFS.typeOfObject\u3011".concat(key, " is not a plain object"), fieldValue);
        }
        return defaultValue;
    },
    typeOfArray: function (fieldValue, defaultValue, key, fieldConfig, config) {
        if (checker_1["default"].isArray(fieldValue)) {
            return fieldValue.map(function (value, index) {
                var convertor = new Convertor_1.Convertor("__DATA_X_ITEM__".concat(key, "_").concat(index, "__"), config);
                return convertor.transform(fieldConfig, value);
            });
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
        if (checker_1["default"].isVoid(MiddlewareBean)) {
            return data;
        }
        var middlewareBean = new MiddlewareBean(config);
        middlewareBean.transform(data);
        return middlewareBean.valueOf();
    }
};
//# sourceMappingURL=valueParser.js.map