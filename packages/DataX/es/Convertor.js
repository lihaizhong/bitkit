var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import TypeChecker from "./checker";
import { checkOfStrict } from "@lihzsky/type-checker";
import { DataX } from "./DataX";
import { debug } from "./log";
import { Any } from "./Types";
import ValueParser from "./valueParser";
var Convertor = /** @class */ (function () {
    function Convertor(name, options) {
        this.name = name;
        this.options = options;
    }
    /**
     * 设置默认值
     * @param {any} type 数据类型
     * @param {any} defaultValue 用户定义的默认数值
     * @param {any} placeholderValue 系统定义的默认数值
     * @param {any} options 数据类型判断
     * @returns {any}
     */
    Convertor.prototype.getDefaultValue = function (type, defaultValue, placeValue, options) {
        if (options.loose || checkOfStrict(defaultValue, type) || TypeChecker.isNull(defaultValue)) {
            return defaultValue;
        }
        return placeValue;
    };
    /**
     * 生成字段配置信息
     * @param {any} fieldConfig
     * @returns {any}
     */
    Convertor.prototype.generateFieldOptions = function (fieldConfig) {
        var _this = this;
        var fieldOptionKeys = ['loose'];
        var OPTION_MAPPING = {
            loose: 'looseFields'
        };
        return fieldOptionKeys.reduce(function (fieldOptions, key) {
            if (!TypeChecker.isVoid(fieldConfig[key])) {
                fieldOptions[key] = fieldConfig[key];
            }
            else {
                var globalOptionKey = OPTION_MAPPING[key];
                fieldOptions[key] = _this.options[globalOptionKey];
            }
            return fieldOptions;
        }, {});
    };
    /**
     * 解析field对应的值
     * @param {object} target
     * @param {string|function} field
     * @param {string} defaultField
     */
    Convertor.prototype.parseFieldValue = function (target, field, defaultField) {
        if (TypeChecker.isObject(target)) {
            if (TypeChecker.isString(field)) {
                return target[field];
            }
            if (TypeChecker.isFunction(field)) {
                return field(target);
            }
            if (TypeChecker.isString(defaultField) && defaultField !== "") {
                return target[defaultField];
            }
        }
        return target;
    };
    /**
     * 设置各种类型的值
     * @param {object} fieldConfig 字段配置信息
     * @param {any} data 数据
     */
    Convertor.prototype.convert = function (fieldConfig, data, CustomValueParser) {
        var type = fieldConfig.type, itemType = fieldConfig.itemType, field = fieldConfig.field, defaultValue = fieldConfig.defaultValue;
        var fieldValue = this.parseFieldValue(data, field, this.name);
        var options = this.generateFieldOptions(fieldConfig);
        debug('DataX.convert', this.name, fieldConfig, options, data);
        switch (type) {
            case Any:
                return ValueParser.typeOfAny(fieldValue);
            case String:
                return ValueParser.typeOfString(fieldValue, this.getDefaultValue(type, defaultValue, "", options), this.name);
            case Number:
                return ValueParser.typeOfNumber(fieldValue, this.getDefaultValue(type, defaultValue, null, options), this.name);
            case Boolean:
                return ValueParser.typeOfBoolean(fieldValue, this.getDefaultValue(type, defaultValue, null, options), this.name);
            case Array:
                return ValueParser.typeOfArray(fieldValue, this.getDefaultValue(type, defaultValue, [], options), this.name, __assign(__assign({}, options), { type: itemType }), this.options, CustomValueParser);
            case Object:
                return ValueParser.typeOfObject(fieldValue, this.getDefaultValue(type, defaultValue, {}, options), this.name);
            default:
                if (type instanceof DataX) {
                    return ValueParser.typeOfDefault(type, fieldValue, this.name, this.options);
                }
                return CustomValueParser(this.name, fieldConfig, fieldValue, options);
        }
    };
    return Convertor;
}());
export { Convertor };
//# sourceMappingURL=Convertor.js.map