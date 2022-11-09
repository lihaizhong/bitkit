(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./popular/identity-code-validator", "./popular/date-converter"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.dateConverter = exports.IdentityCodeValidator = void 0;
    var identity_code_validator_1 = require("./popular/identity-code-validator");
    Object.defineProperty(exports, "IdentityCodeValidator", { enumerable: true, get: function () { return identity_code_validator_1.IdentityCodeValidator; } });
    var date_converter_1 = require("./popular/date-converter");
    Object.defineProperty(exports, "dateConverter", { enumerable: true, get: function () { return date_converter_1.dateConverter; } });
});
