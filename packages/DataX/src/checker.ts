import TypeChecker, { hasOwn } from "@lihzsky/type-checker"

TypeChecker.extend('isReservedProperty', (value: string) => !/^__bean_/.test(value))
TypeChecker.extend('hasOwn', hasOwn)

export default TypeChecker
