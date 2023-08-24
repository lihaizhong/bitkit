var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./popular/idcard-validator", "./popular/tempo"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Tempo = exports.IdCardValidator = void 0;
    var idcard_validator_1 = require("./popular/idcard-validator");
    Object.defineProperty(exports, "IdCardValidator", { enumerable: true, get: function () { return idcard_validator_1.IdCardValidator; } });
    var tempo_1 = require("./popular/tempo");
    Object.defineProperty(exports, "Tempo", { enumerable: true, get: function () { return __importDefault(tempo_1).default; } });
});
