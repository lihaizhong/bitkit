var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.formValidate = void 0;
    function formValidate(schema = []) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let error = "form error";
                const isValidForm = schema.every((item) => {
                    const { rule, message } = item;
                    if ((typeof rule === "function" && rule()) || rule) {
                        return true;
                    }
                    if (typeof message === "string" && message !== "") {
                        error = message;
                    }
                    return false;
                });
                return Promise.resolve({
                    valid: isValidForm,
                    error: isValidForm ? null : error,
                });
            }
            catch (ex) {
                return Promise.reject(ex);
            }
        });
    }
    exports.formValidate = formValidate;
});
