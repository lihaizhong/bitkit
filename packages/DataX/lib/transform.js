"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Types_1 = require("./Types");
var checker_1 = __importDefault(require("./checker"));
var valueParser_1 = __importDefault(require("./valueParser"));
function getConfigKey(key) {
    switch (key) {
        case "loose":
            return "looseFields";
        default:
    }
}
function getFieldProfile(config, fieldConfig) {
    var keys = ["loose"];
    return keys.reduce(function (_config, key) {
        if (!checker_1["default"].isVoid(fieldConfig[key])) {
            _config[key] = fieldConfig[key];
            return _config;
        }
        var configKey = getConfigKey(key);
        if (checker_1["default"].isString(configKey)) {
            var value = config[configKey];
            switch (key) {
                case "loose":
                    if (checker_1["default"].isBoolean(value)) {
                        _config[key] = value;
                    }
                    else if (checker_1["default"].isArray(value)) {
                        _config[key] = value.includes(fieldConfig.__name__);
                    }
                    else {
                        _config[key] = false;
                    }
                    break;
                default:
                    _config[key] = value;
            }
        }
        return _config;
    }, {});
}
/**
 * 设置默认值
 * @param {any} type 数据类型
 * @param {any} defaultValue 用户定义的默认数值
 * @param {any} placeholderValue 系统定义的默认数值
 * @param {any} options 数据类型判断
 */
function getDefaultValue(type, defaultValue, placeholderValue, options) {
    if (options.loose || checker_1["default"].isSameClass(defaultValue, type) || checker_1["default"].isNull(defaultValue)) {
        return defaultValue;
    }
    return placeholderValue;
}
/**
 * 解析field对应的值
 * @param {object} target
 * @param {string|function} field
 * @param {string} key
 */
function parseFieldValue(target, field, key) {
    if (!checker_1["default"].isObject(target)) {
        return target;
    }
    if (checker_1["default"].isString(field)) {
        return target[field];
    }
    if (checker_1["default"].isFunction(field)) {
        return field(target);
    }
    if (checker_1["default"].isString(key) && key !== "") {
        return target[key];
    }
    return target;
}
/**
 * 设置各种类型的值
 * @param {object} config 配置信息
 * @param {object} fieldConfig 字段配置信息
 * @property {any} type 字段类型。必传
 * @property {any} itemType 数组项的字段类型。如果是数组，必传
 * @param {any} data 数据
 * @param {string} key 数据的key值
 */
function transform(config, fieldConfig, data, key) {
    var name = fieldConfig.__name__, type = fieldConfig.type, itemType = fieldConfig.itemType, field = fieldConfig.field, defaultValue = fieldConfig.defaultValue;
    var fieldValue = parseFieldValue(data, field, key);
    var options = getFieldProfile(config, fieldConfig);
    switch (type) {
        case Types_1.Any:
            return valueParser_1["default"].typeOfAny(fieldValue);
        case String:
            return valueParser_1["default"].typeOfString(fieldValue, getDefaultValue(type, defaultValue, "", options), name);
        case Number:
            return valueParser_1["default"].typeOfNumber(fieldValue, getDefaultValue(type, defaultValue, null, options), name);
        case Boolean:
            return valueParser_1["default"].typeOfBoolean(fieldValue, getDefaultValue(type, defaultValue, null, options), name);
        case Array:
            return valueParser_1["default"].typeOfArray(itemType, fieldValue, getDefaultValue(type, defaultValue, [], options), name, config);
        case Object:
            return valueParser_1["default"].typeOfObject(fieldValue, getDefaultValue(type, defaultValue, {}, options), name);
        default:
            return valueParser_1["default"].typeOfDefault(type, fieldValue, config);
    }
}
exports["default"] = transform;
//# sourceMappingURL=transform.js.map