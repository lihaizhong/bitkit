import ProxyChecker, { TypeChecker, TypeCheckerFn, checkOfStrict, hasOwn, isArray, isBoolean, isDate, isError, isFalsy, isFunction, isNull, isNumber, isObject, isPrimitive, isPromise, isRegExp, isString, isTruthy, isUndefined, isVoid } from '../src/index'

const obj: Record<string, any> = {}

beforeAll(() => {
  obj.str = 'string'
  obj.num = 234
  obj.bool = true
  obj.truthy = true
  obj.falsy = false
})

describe('基础功能测试', () => {
  test('hasOwn', () => {
    expect(hasOwn(obj, 'str')).toBeTruthy()
    expect(hasOwn(obj, 'str1')).toBeFalsy()

    // 模拟低版本javascript
    // rome-ignore lint/performance/noDelete: <explanation>
    delete Object.hasOwn
    expect(hasOwn(obj, 'str')).toBeTruthy()
    expect(hasOwn(obj, 'str1')).toBeFalsy()
  })

  test('checkOfStrict', () => {
    expect(checkOfStrict(obj, Object)).toBeTruthy()
    expect(checkOfStrict('string', String)).toBeTruthy()
    expect(checkOfStrict(234, Number)).toBeTruthy()
    expect(checkOfStrict(Symbol('symbol'), Symbol)).toBeTruthy()
    expect(checkOfStrict([], Array)).toBeTruthy()
    expect(checkOfStrict(null, null)).toBeTruthy()
    expect(checkOfStrict(undefined, undefined)).toBeTruthy()
    expect(checkOfStrict([], Object)).toBeFalsy()
    expect(checkOfStrict('string', Object)).toBeFalsy()
    expect(checkOfStrict(null, Object)).toBeFalsy()
  })

  test('isDate', () => {
    expect(isDate('Thu Apr 13 2023 17:01:46 GMT+0800 (中国标准时间)')).toBeTruthy()
    expect(isDate('2023-04-13T17:01:46')).toBeTruthy()
    expect(isDate('2023/04/13T17:01:46')).toBeFalsy()
    expect(isDate('2023-04-13 17:01:46')).toBeTruthy()
    expect(isDate('2023/04/13 17:01:46')).toBeTruthy()
    expect(isDate('2023=04=13 17:01:46')).toBeTruthy()
    expect(isDate('2023-04=13 17:01:46')).toBeTruthy()
    expect(isDate('2023#04@13 17:01:46')).toBeTruthy()
    expect(isDate('2023y04y13 17:01:46')).toBeFalsy()
    expect(isDate(1681376506000)).toBeTruthy()
    expect(isDate(new Date())).toBeTruthy()
  })

  test('isNull', () => {
    expect(isNull(null)).toBeTruthy()
    expect(isNull({})).toBeFalsy()
    expect(isNull(undefined)).toBeFalsy()
  })

  test('isUndefined', () => {
    expect(isUndefined(undefined)).toBeTruthy()
    expect(isUndefined(null)).toBeFalsy()
  })

  test('isVoid', () => {
    expect(isVoid(null)).toBeTruthy()
    expect(isVoid(undefined)).toBeTruthy()
    expect(isVoid('')).toBeTruthy()
    expect(isVoid(0)).toBeFalsy()
  })

  test('isPrimitive', () => {
    expect(isPrimitive(null)).toBeTruthy()
    expect(isPrimitive(undefined)).toBeTruthy()
    expect(isPrimitive('string')).toBeTruthy()
    expect(isPrimitive(234)).toBeTruthy()
    expect(isPrimitive(true)).toBeTruthy()
    expect(isPrimitive(Symbol('symbol'))).toBeTruthy()
    expect(isPrimitive({})).toBeFalsy()
    expect(isPrimitive([])).toBeFalsy()
    expect(isPrimitive(/^regexp\d+$/)).toBeFalsy()
  })

  test('isString', () => {
    expect(isString('string')).toBeTruthy()
    expect(isString(1234)).toBeFalsy()
  })

  test('isNumber', () => {
    expect(isNumber(123)).toBeTruthy()
    expect(isNumber(Number.NEGATIVE_INFINITY)).toBeFalsy()
    expect(isNumber(Number.POSITIVE_INFINITY)).toBeFalsy()
    expect(isNumber(Number.EPSILON)).toBeTruthy()
    expect(isNumber(Number.MAX_VALUE)).toBeTruthy()
    expect(isNumber(Number.MIN_VALUE)).toBeTruthy()
    expect(isNumber(NaN)).toBeFalsy()
  })

  test('isBoolean', () => {
    expect(isBoolean(true)).toBeTruthy()
    expect(isBoolean(false)).toBeTruthy()
    expect(isBoolean(0)).toBeFalsy()
    expect(isBoolean(1)).toBeFalsy()
  })

  test('isFunction', () => {
    expect(isFunction(() => {})).toBeTruthy()
    expect(isFunction(function() {})).toBeTruthy()
    expect(isFunction({})).toBeFalsy()
  })

  test('isArray', () => {
    expect(isArray([])).toBeTruthy()
    expect(isArray({})).toBeFalsy()
  })

  test('isObject', () => {
    expect(isObject({})).toBeTruthy()
    expect(isObject([])).toBeFalsy()
    expect(isObject('string')).toBeFalsy()
    expect(isObject(123)).toBeFalsy()
    expect(isObject(true)).toBeFalsy()
    expect(isObject(null)).toBeFalsy()
  })

  test('isRegExp', () => {
    expect(isRegExp(/^test\d+$/)).toBeTruthy()
    expect(isRegExp({})).toBeFalsy()
  })

  test('isError', () => {
    expect(isError(new Error('error test'))).toBeTruthy()
  })

  test('isPromise', () => {
    expect(isPromise(Promise.resolve())).toBeTruthy()
    expect(isPromise({ then() {}, catch() {} })).toBeFalsy()
  })

  test('isTruthy', () => {
    expect(isTruthy(true)).toBeTruthy()
    expect(isTruthy(1)).toBeTruthy()
    expect(isTruthy(false)).toBeFalsy()
    expect(isTruthy({})).toBeFalsy()
    expect(isTruthy(null)).toBeFalsy()
    expect(isTruthy('string')).toBeFalsy()
  })

  test('isFalsy', () => {
    expect(isFalsy(false)).toBeTruthy()
    expect(isFalsy(0)).toBeTruthy()
    expect(isFalsy(true)).toBeFalsy()
    expect(isFalsy({})).toBeFalsy()
    expect(isFalsy(null)).toBeFalsy()
    expect(isFalsy('string')).toBeFalsy()
  })
})

describe('TypeChecker对象测试', () =>{
  test('TypeChecker object check', () => {
    expect(TypeChecker.isArray).toBe(isArray)
    expect(TypeChecker.isBoolean).toBe(isBoolean)
    expect(TypeChecker.isDate).toBe(isDate)
    expect(TypeChecker.isError).toBe(isError)
    expect(TypeChecker.isFalsy).toBe(isFalsy)
    expect(TypeChecker.isFunction).toBe(isFunction)
    expect(TypeChecker.isNull).toBe(isNull)
    expect(TypeChecker.isNumber).toBe(isNumber)
    expect(TypeChecker.isObject).toBe(isObject)
    expect(TypeChecker.isPrimitive).toBe(isPrimitive)
    expect(TypeChecker.isPromise).toBe(isPromise)
    expect(TypeChecker.isRegExp).toBe(isRegExp)
    expect(TypeChecker.isString).toBe(isString)
    expect(TypeChecker.isTruthy).toBe(isTruthy)
    expect(TypeChecker.isUndefined).toBe(isUndefined)
    expect(TypeChecker.isVoid).toBe(isVoid)
  })
})

describe('TypeChecker代理对象测试', () => {
  test('extension test', () => {
    expect(() => (ProxyChecker.isNotFunctionTest = {} as TypeCheckerFn)).toThrowError()
    expect(() => (ProxyChecker.isParameterErrorTest = (() => {}) as unknown as TypeCheckerFn)).toThrowError()
    expect(ProxyChecker.isSuccessTest = (value: any) => !!value).toBeTruthy()
  })

  test('invoke test', () => {
    expect(ProxyChecker.isArray).toBe(isArray)
    expect(ProxyChecker.isBoolean).toBe(isBoolean)
    expect(ProxyChecker.isDate).toBe(isDate)
    expect(ProxyChecker.isError).toBe(isError)
    expect(ProxyChecker.isFalsy).toBe(isFalsy)
    expect(ProxyChecker.isFunction).toBe(isFunction)
    expect(ProxyChecker.isNull).toBe(isNull)
    expect(ProxyChecker.isNumber).toBe(isNumber)
    expect(ProxyChecker.isObject).toBe(isObject)
    expect(ProxyChecker.isPrimitive).toBe(isPrimitive)
    expect(ProxyChecker.isPromise).toBe(isPromise)
    expect(ProxyChecker.isRegExp).toBe(isRegExp)
    expect(ProxyChecker.isString).toBe(isString)
    expect(ProxyChecker.isTruthy).toBe(isTruthy)
    expect(ProxyChecker.isUndefined).toBe(isUndefined)
    expect(ProxyChecker.isVoid).toBe(isVoid)
  })

  test('invoke not test', () => {
    expect(() => (ProxyChecker.not.isSuccessTest = (value: any) => !!value)).toThrowError()

    expect(ProxyChecker.not.isArray([])).toBeFalsy()
    expect(ProxyChecker.not.isArray({})).toBeTruthy()
    expect(ProxyChecker.not.isBoolean(true)).toBeFalsy()
    expect(ProxyChecker.not.isBoolean('string')).toBeTruthy()
    expect(ProxyChecker.not.isDate('2023-04-13T17:01:46')).toBeFalsy()
    expect(ProxyChecker.not.isDate('2023/04/13T17:01:46')).toBeTruthy()
    expect(ProxyChecker.not.isError(new Error('error test'))).toBeFalsy()
    expect(ProxyChecker.not.isError('string')).toBeTruthy()
    expect(ProxyChecker.not.isFalsy(false)).toBeFalsy()
    expect(ProxyChecker.not.isFalsy(true)).toBeTruthy()
    expect(ProxyChecker.not.isFunction(() => {})).toBeFalsy()
    expect(ProxyChecker.not.isFunction('string')).toBeTruthy()
    expect(ProxyChecker.not.isNull(null)).toBeFalsy()
    expect(ProxyChecker.not.isNull(undefined)).toBeTruthy()
    expect(ProxyChecker.not.isNumber(123)).toBeFalsy()
    expect(ProxyChecker.not.isNumber('string')).toBeTruthy()
    expect(ProxyChecker.not.isObject({})).toBeFalsy()
    expect(ProxyChecker.not.isObject([])).toBeTruthy()
    expect(ProxyChecker.not.isPrimitive('string')).toBeFalsy()
    expect(ProxyChecker.not.isPrimitive({})).toBeTruthy()
    expect(ProxyChecker.not.isPromise(Promise.resolve())).toBeFalsy()
    expect(ProxyChecker.not.isPromise({})).toBeTruthy()
    expect(ProxyChecker.not.isRegExp(/^test\d+$/)).toBeFalsy()
    expect(ProxyChecker.not.isRegExp({})).toBeTruthy()
    expect(ProxyChecker.not.isString('string')).toBeFalsy()
    expect(ProxyChecker.not.isString(123)).toBeTruthy()
    expect(ProxyChecker.not.isTruthy(true)).toBeFalsy()
    expect(ProxyChecker.not.isTruthy(false)).toBeTruthy()
    expect(ProxyChecker.not.isUndefined(undefined)).toBeFalsy()
    expect(ProxyChecker.not.isUndefined(null)).toBeTruthy()
    expect(ProxyChecker.not.isVoid(null)).toBeFalsy()
    expect(ProxyChecker.not.isVoid({})).toBeTruthy()
  })
})
