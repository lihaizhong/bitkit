import { isArray } from "@lihzsky/type-checker";
import { Convertor } from "./Convertor";
import { BasicPresets, PresetCollection } from "./PresetCollection";
var DataX = /** @class */ (function () {
    function DataX() {
    }
    DataX.register = function (name, config) {
        PresetCollection.set(name, config);
    };
    DataX.format = function (data, name) {
        var convertor = new Convertor();
        if (isArray(data)) {
            return convertor.convertArray(name, data);
        }
        return convertor.convertObject(name, data);
    };
    return DataX;
}());
export { DataX };
export { BasicPresets };
//# sourceMappingURL=index.js.map