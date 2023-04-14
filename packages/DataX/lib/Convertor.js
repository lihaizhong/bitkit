"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convertor = void 0;
var checker_1 = __importDefault(require("./checker"));
var type_checker_1 = require("@lihzsky/type-checker");
var DataX_1 = require("./DataX");
var log_1 = require("./log");
var Types_1 = require("./Types");
var valueParser_1 = __importDefault(require("./valueParser"));
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
        if (options.loose || (0, type_checker_1.checkOfStrict)(defaultValue, type) || checker_1.default.isNull(defaultValue)) {
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
            if (!checker_1.default.isVoid(fieldConfig[key])) {
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
        if (checker_1.default.isObject(target)) {
            if (checker_1.default.isString(field)) {
                return target[field];
            }
            if (checker_1.default.isFunction(field)) {
                return field(target);
            }
            if (checker_1.default.isString(defaultField) && defaultField !== "") {
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
        (0, log_1.debug)('DataX.convert', this.name, fieldConfig, options, data);
        switch (type) {
            case Types_1.Any:
                return valueParser_1.default.typeOfAny(fieldValue);
            case String:
                return valueParser_1.default.typeOfString(fieldValue, this.getDefaultValue(type, defaultValue, "", options), this.name);
            case Number:
                return valueParser_1.default.typeOfNumber(fieldValue, this.getDefaultValue(type, defaultValue, null, options), this.name);
            case Boolean:
                return valueParser_1.default.typeOfBoolean(fieldValue, this.getDefaultValue(type, defaultValue, null, options), this.name);
            case Array:
                return valueParser_1.default.typeOfArray(fieldValue, this.getDefaultValue(type, defaultValue, [], options), this.name, __assign(__assign({}, options), { type: itemType }), this.options, CustomValueParser);
            case Object:
                return valueParser_1.default.typeOfObject(fieldValue, this.getDefaultValue(type, defaultValue, {}, options), this.name);
            default:
                if (type instanceof DataX_1.DataX) {
                    return valueParser_1.default.typeOfDefault(type, fieldValue, this.name, this.options);
                }
                return CustomValueParser(this.name, fieldConfig, fieldValue, options);
        }
    };
    return Convertor;
}());
exports.Convertor = Convertor;
//# sourceMappingURL=Convertor.js.map