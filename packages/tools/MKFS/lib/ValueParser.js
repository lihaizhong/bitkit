// Copyright (c) 2021 Sangbaipi
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import Tools from "./tools";
import transform from "./transform";
var ValueParser = /** @class */ (function () {
    function ValueParser() {
    }
    ValueParser.prototype.typeOfString = function (fieldValue, defaultValue) {
        if (Tools.isSameType(fieldValue, String)) {
            return fieldValue;
        }
        if (Tools.isSameType(fieldValue, Number)) {
            return fieldValue.toString();
        }
        return defaultValue;
    };
    ValueParser.prototype.typeOfNumber = function (fieldValue, defaultValue) {
        if (Tools.isSameType(fieldValue, Number)) {
            return fieldValue;
        }
        if (Tools.isSameType(fieldValue, String) &&
            /^\d+$/.test(fieldValue)) {
            return Number(fieldValue);
        }
        return defaultValue;
    };
    ValueParser.prototype.typeOfBoolean = function (fieldValue, defaultValue) {
        if (Tools.isSameType(fieldValue, Boolean)) {
            return fieldValue;
        }
        return defaultValue;
    };
    ValueParser.prototype.typeOfObject = function (fieldValue, defaultValue) {
        if (Tools.isSameType(fieldValue, Object)) {
            return fieldValue;
        }
        return defaultValue;
    };
    ValueParser.prototype.typeOfArray = function (type, fieldValue, defaultValue, config) {
        return (fieldValue || defaultValue).map(function (value) {
            return transform(config, { type: type }, value, "");
        });
    };
    ValueParser.prototype.typeOfAny = function (fieldValue) {
        return fieldValue;
    };
    ValueParser.prototype.typeOfDefault = function (CustomBean, data, config) {
        return new CustomBean(data).valueOf(config);
    };
    return ValueParser;
}());
export default new ValueParser();
//# sourceMappingURL=ValueParser.js.map