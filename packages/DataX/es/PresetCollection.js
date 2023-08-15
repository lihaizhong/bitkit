import { checkOfStrict, isString } from "@lihzsky/type-checker";
export var BasicPresets = {
    Boolean: "boolean",
    String: "string",
    Number: "number",
    Object: "object",
    Array: "array",
    Any: "any",
};
export var PresetCollection = /** @class */ (function () {
    function PresetCollection() {
    }
    PresetCollection.check = function (type, preset) {
        switch (type) {
            case BasicPresets.Boolean:
                return checkOfStrict(preset, Boolean);
            case BasicPresets.String:
                return checkOfStrict(preset, String);
            case BasicPresets.Number:
                return checkOfStrict(preset, Number);
            case BasicPresets.Object:
                return checkOfStrict(preset, Object);
            case BasicPresets.Array:
                return checkOfStrict(preset, Array);
            default:
                return false;
        }
    };
    PresetCollection.get = function (name) {
        if (isString(name)) {
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