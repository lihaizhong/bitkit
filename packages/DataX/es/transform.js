import { Any } from "./Types";
import Checker from "./checker";
import ValueParser from "./valueParser";
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
        if (!Checker.isVoid(fieldConfig[key])) {
            _config[key] = fieldConfig[key];
            return _config;
        }
        var configKey = getConfigKey(key);
        if (Checker.isString(configKey)) {
            var value = config[configKey];
            switch (key) {
                case "loose":
                    if (Checker.isBoolean(value)) {
                        _config[key] = value;
                    }
                    else if (Checker.isArray(value)) {
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
    if (options.loose || Checker.isSameClass(defaultValue, type) || Checker.isNull(defaultValue)) {
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
    if (Checker.isString(field)) {
        return target[field];
    }
    if (Checker.isFunction(field)) {
        return field(target);
    }
    if (Checker.isString(key) && key !== "") {
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
export default function transform(config, fieldConfig, data, key) {
    var name = fieldConfig.__name__, type = fieldConfig.type, itemType = fieldConfig.itemType, field = fieldConfig.field, defaultValue = fieldConfig.defaultValue;
    var fieldValue = parseFieldValue(data, field, key);
    var options = getFieldProfile(config, fieldConfig);
    switch (type) {
        case Any:
            return ValueParser.typeOfAny(fieldValue);
        case String:
            return ValueParser.typeOfString(fieldValue, getDefaultValue(type, defaultValue, "", options), name);
        case Number:
            return ValueParser.typeOfNumber(fieldValue, getDefaultValue(type, defaultValue, null, options), name);
        case Boolean:
            return ValueParser.typeOfBoolean(fieldValue, getDefaultValue(type, defaultValue, null, options), name);
        case Array:
            return ValueParser.typeOfArray(itemType, fieldValue, getDefaultValue(type, defaultValue, [], options), name, config);
        case Object:
            return ValueParser.typeOfObject(fieldValue, getDefaultValue(type, defaultValue, {}, options), name);
        default:
            return ValueParser.typeOfDefault(type, fieldValue, config);
    }
}
//# sourceMappingURL=transform.js.map