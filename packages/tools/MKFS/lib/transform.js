// Copyright (c) 2021 Sangbaipi
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { Any } from "./Types";
import Tools from "./tools";
import ValueParser from "./ValueParser";
function getFieldProfile(config, fieldConfig) {
    var keys = ["loose"];
    return keys.reduce(function (_config, key) {
        if (!Tools.isVoid(fieldConfig[key])) {
            _config[key] = fieldConfig[key];
            return _config;
        }
        var value = config[key];
        switch (key) {
            case "loose":
                if (Tools.isBoolean(value)) {
                    _config[key] = value;
                }
                else if (Tools.isArray(value)) {
                    _config[key] = value.includes(fieldConfig.__name__);
                }
                else {
                    _config[key] = false;
                }
                break;
            default:
                _config[key] = value;
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
    if (options.loose || Tools.isSameType(defaultValue, type)) {
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
    if (Tools.isString(field)) {
        return target[field];
    }
    if (Tools.isFunction(field)) {
        return field(target);
    }
    if (Tools.isString(key) && key !== "") {
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
    var type = fieldConfig.type, itemType = fieldConfig.itemType, field = fieldConfig.field, defaultValue = fieldConfig.defaultValue;
    var fieldValue = parseFieldValue(data, field, key);
    var options = getFieldProfile(config, fieldConfig);
    switch (type) {
        case Any:
            return ValueParser.typeOfAny(fieldValue);
        case String:
            return ValueParser.typeOfString(fieldValue, getDefaultValue(type, defaultValue, "", options));
        case Number:
            return ValueParser.typeOfNumber(fieldValue, getDefaultValue(type, defaultValue, null, options));
        case Boolean:
            return ValueParser.typeOfBoolean(fieldValue, getDefaultValue(type, defaultValue, null, options));
        case Array:
            return ValueParser.typeOfArray(itemType, fieldValue, getDefaultValue(type, defaultValue, [], options), config);
        case Object:
            return ValueParser.typeOfObject(fieldValue, getDefaultValue(type, defaultValue, {}, options));
        default:
            return ValueParser.typeOfDefault(type, fieldValue, config);
    }
}
//# sourceMappingURL=transform.js.map