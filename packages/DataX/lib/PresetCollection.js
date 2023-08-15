"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresetCollection = exports.BasicPresets = void 0;
var type_checker_1 = require("@lihzsky/type-checker");
exports.BasicPresets = {
    Boolean: "boolean",
    String: "string",
    Number: "number",
    Object: "object",
    Array: "array",
    Any: "any",
};
var PresetCollection = exports.PresetCollection = /** @class */ (function () {
    function PresetCollection() {
    }
    PresetCollection.check = function (type, preset) {
        switch (type) {
            case exports.BasicPresets.Boolean:
                return (0, type_checker_1.checkOfStrict)(preset, Boolean);
            case exports.BasicPresets.String:
                return (0, type_checker_1.checkOfStrict)(preset, String);
            case exports.BasicPresets.Number:
                return (0, type_checker_1.checkOfStrict)(preset, Number);
            case exports.BasicPresets.Object:
                return (0, type_checker_1.checkOfStrict)(preset, Object);
            case exports.BasicPresets.Array:
                return (0, type_checker_1.checkOfStrict)(preset, Array);
            default:
                return false;
        }
    };
    PresetCollection.get = function (name) {
        if ((0, type_checker_1.isString)(name)) {
            return PresetCollection.presets.get(name);
        }
        return name;
    };
    PresetCollection.set = function (name, preset) {
        PresetCollection.presets.set(name, preset);
    };
    PresetCollection.presets = new Map();
    return PresetCollection;
}());
//# sourceMappingURL=PresetCollection.js.map