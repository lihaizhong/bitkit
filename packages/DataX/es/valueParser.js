import { checkOfStrict } from "@lihzsky/type-checker";
import { Convertor } from "./Convertor";
import TypeChecker from "./checker";
import { warn } from "./log";
export default {
    /**
     * 解析成字符串
     * @param fieldValue
     * @param defaultValue
     * @param key
     * @returns
     */
    typeOfString: function (fieldValue, defaultValue, key) {
        if (checkOfStrict(fieldValue, String)) {
            return fieldValue;
        }
        if (checkOfStrict(fieldValue, Number)) {
            return fieldValue.toString();
        }
        if (!TypeChecker.isVoid(fieldValue)) {
            warn('DataX.typeOfString', "".concat(key, " is not a string or number!"), fieldValue);
        }
        return defaultValue;
    },
    /**
     * 解析成数字
     * @param fieldValue
     * @param defaultValue
     * @param key
     * @returns
     */
    typeOfNumber: function (fieldValue, defaultValue, key) {
        if (checkOfStrict(fieldValue, Number)) {
            return fieldValue;
        }
        if (checkOfStrict(fieldValue, String) &&
            /^\d+$/.test(fieldValue)) {
            return Number(fieldValue);
        }
        if (!TypeChecker.isVoid(fieldValue)) {
            warn('DataX.typeOfNumber', "".concat(key, " is not a number or numeric string"), fieldValue);
        }
        return defaultValue;
    },
    /**
     * 解析成布尔
     * @param fieldValue
     * @param defaultValue
     * @param key
     * @returns
     */
    typeOfBoolean: function (fieldValue, defaultValue, key) {
        if (checkOfStrict(fieldValue, Boolean)) {
            return fieldValue;
        }
        if (!TypeChecker.isVoid(fieldValue)) {
            warn('DataX.typeOfBoolean', "".concat(key, " is not a boolean"), fieldValue);
        }
        return defaultValue;
    },
    /**
     * 解析成对象
     * @param fieldValue
     * @param defaultValue
     * @param key
     * @returns
     */
    typeOfObject: function (fieldValue, defaultValue, key) {
        if (checkOfStrict(fieldValue, Object)) {
            return fieldValue;
        }
        if (!TypeChecker.isVoid(fieldValue)) {
            console.warn('DataX.typeOfObject', "".concat(key, " is not a plain object"), fieldValue);
        }
        return defaultValue;
    },
    /**
     * 解析成数组
     * @param fieldValue
     * @param defaultValue
     * @param key
     * @param fieldConfig
     * @param config
     * @returns
     */
    typeOfArray: function (fieldValue, defaultValue, key, fieldConfig, config, parser) {
        if (TypeChecker.isArray(fieldValue)) {
            var convert = fieldConfig.convert;
            if (TypeChecker.isFunction(convert)) {
                return convert(Convertor, key, fieldConfig, config);
            }
            return fieldValue.map(function (value, index) {
                var convertor = new Convertor("__DATA_X_ITEM__".concat(key, "_").concat(index, "__"), config);
                return convertor.convert(fieldConfig, value, parser);
            });
        }
        if (!TypeChecker.isVoid(fieldValue)) {
            warn('DataX.typeOfArray', "".concat(key, " is not a array!"), fieldValue);
        }
        return defaultValue;
    },
    /**
     * 不对任何值进行解析，直接输出
     * @param fieldValue
     * @returns
     */
    typeOfAny: function (fieldValue) {
        return fieldValue;
    },
    /**
     * 解析继承自DataX的类型
     * @param MiddlewareBean
     * @param data
     * @param key
     * @param config
     * @returns
     */
    typeOfDefault: function (MiddlewareBean, data, key, config) {
        if (TypeChecker.isVoid(MiddlewareBean)) {
            return data;
        }
        try {
            var middlewareBean = new MiddlewareBean(config);
            middlewareBean.transform(data);
            return middlewareBean.valueOf();
        }
        catch (ex) {
            warn('DataX.typeOfDefault', "".concat(key, " is not a constructor"), MiddlewareBean, data);
            return data;
        }
    }
};
//# sourceMappingURL=valueParser.js.map