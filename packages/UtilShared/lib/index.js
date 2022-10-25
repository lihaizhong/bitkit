(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./you-need-suggest", "./popular/form-validator", "./popular/identity-code-validator", "./popular/date-converter"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.dateConverter = exports.IdentityCodeValidator = exports.formValidate = exports.LevenshteinDistanceCompare = exports.YouNeedSuggestion = void 0;
    var you_need_suggest_1 = require("./you-need-suggest");
    Object.defineProperty(exports, "YouNeedSuggestion", { enumerable: true, get: function () { return you_need_suggest_1.YouNeedSuggestion; } });
    Object.defineProperty(exports, "LevenshteinDistanceCompare", { enumerable: true, get: function () { return you_need_suggest_1.LevenshteinDistanceCompare; } });
    var form_validator_1 = require("./popular/form-validator");
    Object.defineProperty(exports, "formValidate", { enumerable: true, get: function () { return form_validator_1.formValidate; } });
    var identity_code_validator_1 = require("./popular/identity-code-validator");
    Object.defineProperty(exports, "IdentityCodeValidator", { enumerable: true, get: function () { return identity_code_validator_1.IdentityCodeValidator; } });
    var date_converter_1 = require("./popular/date-converter");
    Object.defineProperty(exports, "dateConverter", { enumerable: true, get: function () { return date_converter_1.dateConverter; } });
});
