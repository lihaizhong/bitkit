import Checker from "./checker";
import { Convertor } from "./Convertor";
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
    typeOfArray: function (fieldValue, defaultValue, key, fieldConfig, config) {
        if (Checker.isArray(fieldValue)) {
            return fieldValue.map(function (value, index) {
                var convertor = new Convertor("__DATA_X_ITEM__".concat(key, "_").concat(index, "__"), config);
                return convertor.transform(fieldConfig, value);
            });
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
        if (Checker.isVoid(MiddlewareBean)) {
            return data;
        }
        var middlewareBean = new MiddlewareBean(config);
        middlewareBean.transform(data);
        return middlewareBean.valueOf();
    }
};
//# sourceMappingURL=valueParser.js.map