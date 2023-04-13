import TypeChecker from "@lihzsky/type-checker"

TypeChecker.isReservedProperty = (value: string) => !/^__bean_/.test(value)

export default TypeChecker
