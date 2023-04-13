"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var type_checker_1 = __importDefault(require("@lihzsky/type-checker"));
type_checker_1["default"].isReservedProperty = function (value) { return !/^__bean_/.test(value); };
exports["default"] = type_checker_1["default"];
//# sourceMappingURL=checker.js.map