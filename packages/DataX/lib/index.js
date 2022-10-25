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
exports.__esModule = true;
exports.DataX = void 0;
var Types_1 = require("./Types");
var checker_1 = __importDefault(require("./checker"));
var transform_1 = __importDefault(require("./transform"));
/**
 * ** Global Config
 *  * loose 是否自动填充默认值。如果值为undefined，将根据类型自动填充默认值
 *  * abandonUndefinedValue 如果值为undefined，直接过滤，需要配合loose一起使用
 *  * strict 如果没有配置，则不添加
 * ** Item Config
 *  * type {any} 必填，表示类型  可以是String、Number、Boolean、Array、泛型
 *  * itemType {any} 必填（数组），表示数组子集类型
 *  * defaultValue {string} 选填，表示默认值，如果不指定，Bean类会根据类型指定字符串
 *  * field {string|function} 选填，表示后台对应的字段，如果不指定，就是当前的key。field可以是一个方法，参数为data，主要用于自定义数据
 *  // reverse {function} 选填，表示前端对应字段由多个字段组成时，如何进行拆分。参数为data，主要用于自定义数据
 */
var DataX = /** @class */ (function () {
    function DataX(config) {
        this.__bean_target__ = null;
        this.__bean_config__ = {};
        if (checker_1["default"].isObject(config)) {
            Object.assign(this.__bean_config__, DataX.globalConfig, config);
        }
    }
    DataX.setGlobalConfig = function (config) {
        Object.assign(DataX.globalConfig, config);
    };
    DataX.prototype.transform = function (data) {
        if (data === void 0) { data = {}; }
        var target = {};
        var keys = Object.keys(this).filter(function (key) {
            return checker_1["default"].isReservedProperty(key);
        });
        var rawKeys = Object.keys(data);
        var defaultKeys = [];
        if (!this.__bean_config__.strict && rawKeys.length > keys.length) {
            defaultKeys = rawKeys.filter(function (key) { return !keys.includes(key); });
        }
        // 设置已配置的属性
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var config = this[key];
            config["__name__"] = key;
            if (typeof config === "object") {
                var value = (0, transform_1["default"])(this.__bean_config__, config, data, key);
                // 判断是否丢弃undefined的数据
                if (this.__bean_config__.abandonUndefinedValue && checker_1["default"].isUndefined(value)) {
                    continue;
                }
                target[key] = value;
            }
            else if (!this.__bean_config__.strict) {
                defaultKeys.push(key);
            }
        }
        // 设置未配置的属性
        if (!this.__bean_config__.strict && checker_1["default"].isArray(defaultKeys)) {
            for (var i = 0; i < defaultKeys.length; i++) {
                var key = defaultKeys[i];
                var value = (0, transform_1["default"])(this.__bean_config__, { __name__: key, type: Types_1.Any }, data, key);
                // 判断是否丢弃undefined的数据
                if (this.__bean_config__.abandonUndefinedValue && checker_1["default"].isUndefined(value)) {
                    continue;
                }
                target[key] = value;
            }
        }
        // 静止扩展属性
        Object.preventExtensions(target);
        // 保证前面获取keys时，this的属性是纯净的
        this.__bean_target__ = target;
    };
    DataX.prototype.valueOf = function () {
        return __assign({}, this.__bean_target__);
    };
    DataX.prototype.toString = function () {
        return JSON.stringify(this.__bean_target__);
    };
    DataX.Types = { Any: Types_1.Any };
    DataX.globalConfig = {
        looseFields: false,
        abandonUndefinedValue: false,
        strict: true
    };
    return DataX;
}());
exports.DataX = DataX;
//# sourceMappingURL=index.js.map