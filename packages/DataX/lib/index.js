"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicPresets = exports.DataX = void 0;
var type_checker_1 = require("@lihzsky/type-checker");
var Convertor_1 = require("./Convertor");
var PresetCollection_1 = require("./PresetCollection");
Object.defineProperty(exports, "BasicPresets", { enumerable: true, get: function () { return PresetCollection_1.BasicPresets; } });
var DataX = /** @class */ (function () {
    function DataX() {
    }
    DataX.register = function (name, config) {
        PresetCollection_1.PresetCollection.set(name, config);
    };
    DataX.format = function (data, name) {
        var convertor = new Convertor_1.Convertor();
        if ((0, type_checker_1.isArray)(data)) {
            return convertor.convertArray(name, data);
        }
        return convertor.convertObject(name, data);
    };
    return DataX;
}());
exports.DataX = DataX;
//# sourceMappingURL=index.js.map