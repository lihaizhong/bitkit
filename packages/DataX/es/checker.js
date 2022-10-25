import TypeChecker, { hasOwn } from "@lihzsky/type-checker";
TypeChecker.extend('isReservedProperty', function (value) { return !/^__bean_/.test(value); });
TypeChecker.extend('hasOwn', hasOwn);
export default TypeChecker;
//# sourceMappingURL=checker.js.map