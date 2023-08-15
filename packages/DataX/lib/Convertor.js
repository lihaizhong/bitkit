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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convertor = void 0;
var type_checker_1 = require("@lihzsky/type-checker");
var PresetCollection_1 = require("./PresetCollection");
var valueParser_1 = require("./valueParser");
var Convertor = /** @class */ (function () {
    function Convertor() {
    }
    /**
     * 设置默认值
     * @param {any} type 数据类型
     * @param {any} defaultValue 用户定义的默认数值
     * @param {any} placeholderValue 系统定义的默认数值
     * @returns {any}
     */
    Convertor.prototype.getDefaultValue = function (type, defaultValue, placeValue) {
        if (PresetCollection_1.PresetCollection.check(type, placeValue) || type_checker_1.TypeChecker.isNull(defaultValue)) {
            return defaultValue;
        }
        return placeValue;
    };
    /**
     * 解析field对应的值
     * @param {object} target
     * @param {string|function} field
     * @param {string} defaultField
     */
    Convertor.prototype.parseFieldValue = function (target, field, defaultField) {
        if (type_checker_1.TypeChecker.isObject(target)) {
            if (type_checker_1.TypeChecker.isString(field)) {
                return target[field];
            }
            if (type_checker_1.TypeChecker.isFunction(field)) {
                return field(target);
            }
            if (type_checker_1.TypeChecker.isString(defaultField) &&
                /^[a-zA-Z_]+\w*$/.test(defaultField)) {
                return target[defaultField];
            }
        }
        return target;
    };
    Convertor.prototype.parseFieldConfig = function (fieldConfig, data) {
        var fieldName = fieldConfig.name, type = fieldConfig.type, itemType = fieldConfig.itemType, customFieldName = fieldConfig.field, defaultValue = fieldConfig.defaultValue;
        var fieldValue = this.parseFieldValue(data, customFieldName, fieldName);
        return {
            type: type,
            itemType: itemType,
            fieldName: fieldName,
            fieldValue: fieldValue,
            defaultValue: defaultValue,
        };
    };
    /**
     * 设置各种类型的值
     * @param {object} fieldConfig 字段配置信息
     * @param {any} data 数据
     */
    Convertor.prototype.convertDefinedField = function (fieldConfig, data) {
        var _this = this;
        var _a = this.parseFieldConfig(fieldConfig, data), type = _a.type, itemType = _a.itemType, fieldName = _a.fieldName, fieldValue = _a.fieldValue, defaultValue = _a.defaultValue;
        var valueParser = new valueParser_1.ValueParser();
        switch (type) {
            case PresetCollection_1.BasicPresets.Any:
                return fieldValue;
            case PresetCollection_1.BasicPresets.String:
                return valueParser.toString(fieldName, fieldValue, this.getDefaultValue(type, defaultValue, ""));
            case PresetCollection_1.BasicPresets.Number:
                return valueParser.toNumber(fieldName, fieldValue, this.getDefaultValue(type, defaultValue, null));
            case PresetCollection_1.BasicPresets.Boolean:
                return valueParser.toBoolean(fieldName, fieldValue, this.getDefaultValue(type, defaultValue, null));
            case PresetCollection_1.BasicPresets.Object:
                return valueParser.toObject(fieldName, fieldValue, this.getDefaultValue(type, defaultValue, {}));
            case PresetCollection_1.BasicPresets.Array:
                return valueParser.toArray(fieldName, fieldValue, this.getDefaultValue(type, defaultValue, []), function (subItem, subIndex) { return _this.convertDefinedField({
                    type: itemType,
                    name: "".concat(fieldName, "[").concat(subIndex, "]")
                }, subItem); });
            default:
                return this.convertObject(type, fieldValue || null);
        }
    };
    Convertor.prototype.convertArray = function (name, data) {
        var _this = this;
        return data.map(function (item) { return _this.convertObject(name, item); });
    };
    Convertor.prototype.convertObject = function (name, data) {
        var _this = this;
        var preset = PresetCollection_1.PresetCollection.get(name);
        var keys = Object.keys(preset);
        var values = {};
        // 收集已配置的数据
        values = keys.reduce(function (formatValues, key) {
            formatValues[key] = _this.convertDefinedField(__assign(__assign({}, preset[key]), { name: key }), data);
            return formatValues;
        }, values);
        // 收集未配置的数据
        values = Object.keys(data).reduce(function (formatValues, key) {
            if (!keys.includes(key)) {
                formatValues[key] = data[key];
            }
            return formatValues;
        }, values);
        return values;
    };
    return Convertor;
}());
exports.Convertor = Convertor;
//# sourceMappingURL=Convertor.js.map