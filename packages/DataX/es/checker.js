import TypeChecker from "@lihzsky/type-checker";
TypeChecker.isReservedProperty = function (value) { return !/^__bean_/.test(value); };
export default TypeChecker;
//# sourceMappingURL=checker.js.map