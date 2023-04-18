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
    expect(hasOwn(obj, 'str')).toBe(true)
    expect(hasOwn(obj, 'str1')).toBe(false)
  })

  test('[legacy] hasOwn', () => {
    // 模拟低版本javascript
    // rome-ignore lint/performance/noDelete: <explanation>
    delete Object.hasOwn
    expect(hasOwn(obj, 'str')).toBe(true)
    expect(hasOwn(obj, 'str1')).toBe(false)
  })

  test('checkOfStrict', () => {
    expect(checkOfStrict(obj, Object)).toBe(true)
    expect(checkOfStrict('string', String)).toBe(true)
    expect(checkOfStrict(234, Number)).toBe(true)
    expect(checkOfStrict(Symbol('symbol'), Symbol)).toBe(true)
    expect(checkOfStrict([], Array)).toBe(true)
    expect(checkOfStrict(null, null)).toBe(true)
    expect(checkOfStrict(undefined, undefined)).toBe(true)
    expect(checkOfStrict([], Object)).toBe(false)
    expect(checkOfStrict('string', Object)).toBe(false)
    expect(checkOfStrict(null, Object)).toBe(false)
  })

  test('isDate', () => {
    expect(isDate('Thu Apr 13 2023 17:01:46 GMT+0800 (中国标准时间)')).toBe(true)
    expect(isDate('2023-04-13T17:01:46')).toBe(true)
    expect(isDate('2023/04/13T17:01:46')).toBe(false)
    expect(isDate('2023-04-13 17:01:46')).toBe(true)
    expect(isDate('2023/04/13 17:01:46')).toBe(true)
    expect(isDate('2023=04=13 17:01:46')).toBe(true)
    expect(isDate('2023-04=13 17:01:46')).toBe(true)
    expect(isDate('2023#04@13 17:01:46')).toBe(true)
    expect(isDate('2023y04y13 17:01:46')).toBe(false)
    expect(isDate(1681376506000)).toBe(true)
    expect(isDate(new Date())).toBe(true)
  })

  test('isNull', () => {
    expect(isNull(null)).toBe(true)
    expect(isNull({})).toBe(false)
    expect(isNull(undefined)).toBe(false)
  })

  test('isUndefined', () => {
    expect(isUndefined(undefined)).toBe(true)
    expect(isUndefined(null)).toBe(false)
  })

  test('isVoid', () => {
    expect(isVoid(null)).toBe(true)
    expect(isVoid(undefined)).toBe(true)
    expect(isVoid('')).toBe(true)
    expect(isVoid(0)).toBe(false)
  })

  test('isPrimitive', () => {
    expect(isPrimitive(null)).toBe(true)
    expect(isPrimitive(undefined)).toBe(true)
    expect(isPrimitive('string')).toBe(true)
    expect(isPrimitive(234)).toBe(true)
    expect(isPrimitive(true)).toBe(true)
    expect(isPrimitive(Symbol('symbol'))).toBe(true)
    expect(isPrimitive({})).toBe(false)
    expect(isPrimitive([])).toBe(false)
    expect(isPrimitive(/^regexp\d+$/)).toBe(false)
  })

  test('isString', () => {
    expect(isString('string')).toBe(true)
    expect(isString(1234)).toBe(false)
  })

  test('isNumber', () => {
    expect(isNumber(123)).toBe(true)
    expect(isNumber(Number.NEGATIVE_INFINITY)).toBe(false)
    expect(isNumber(Number.POSITIVE_INFINITY)).toBe(false)
    expect(isNumber(Number.EPSILON)).toBe(true)
    expect(isNumber(Number.MAX_VALUE)).toBe(true)
    expect(isNumber(Number.MIN_VALUE)).toBe(true)
    expect(isNumber(NaN)).toBe(false)
  })

  test('isBoolean', () => {
    expect(isBoolean(true)).toBe(true)
    expect(isBoolean(false)).toBe(true)
    expect(isBoolean(0)).toBe(false)
    expect(isBoolean(1)).toBe(false)
  })

  test('isFunction', () => {
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(function() {})).toBe(true)
    expect(isFunction({})).toBe(false)
  })

  test('isArray', () => {
    expect(isArray([])).toBe(true)
    expect(isArray({})).toBe(false)
  })

  test('isObject', () => {
    expect(isObject({})).toBe(true)
    expect(isObject([])).toBe(false)
    expect(isObject('string')).toBe(false)
    expect(isObject(123)).toBe(false)
    expect(isObject(true)).toBe(false)
    expect(isObject(null)).toBe(false)
  })

  test('isRegExp', () => {
    expect(isRegExp(/^test\d+$/)).toBe(true)
    expect(isRegExp({})).toBe(false)
  })

  test('isError', () => {
    expect(isError(new Error('error test'))).toBe(true)
  })

  test('isPromise', () => {
    expect(isPromise(Promise.resolve())).toBe(true)
    expect(isPromise({ then() {}, catch() {} })).toBe(false)
  })

  test('isTruthy', () => {
    expect(isTruthy(true)).toBe(true)
    expect(isTruthy(1)).toBe(true)
    expect(isTruthy(false)).toBe(false)
    expect(isTruthy({})).toBe(false)
    expect(isTruthy(null)).toBe(false)
    expect(isTruthy('string')).toBe(false)
  })

  test('isFalsy', () => {
    expect(isFalsy(false)).toBe(true)
    expect(isFalsy(0)).toBe(true)
    expect(isFalsy(true)).toBe(false)
    expect(isFalsy({})).toBe(false)
    expect(isFalsy(null)).toBe(false)
    expect(isFalsy('string')).toBe(false)
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

describe('TypeChecker代理对象扩展测试', () => {
  test('extension test', () => {
    expect(() => (ProxyChecker.isNotFunctionTest = {} as TypeCheckerFn)).toThrowError()
    expect(() => (ProxyChecker.isParameterErrorTest = (() => {}) as unknown as TypeCheckerFn)).toThrowError()

    expect(ProxyChecker.isSuccessTest = (value: any) => !!value).toBeTruthy()
    expect(ProxyChecker.isSuccessTest('string')).toBe(true)
  })

  test('TypeChecker代理对象方法测试', () => {
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

  test('TypeChecker代理对象反转方法测试', () => {
    expect(() => (ProxyChecker.not.isFailTest = (value: any) => !!value)).toThrowError()

    expect(ProxyChecker.not.isArray([])).toBe(false)
    expect(ProxyChecker.not.isArray({})).toBe(true)

    expect(ProxyChecker.not.isBoolean(true)).toBe(false)
    expect(ProxyChecker.not.isBoolean('string')).toBe(true)

    expect(ProxyChecker.not.isDate('2023-04-13T17:01:46')).toBe(false)
    expect(ProxyChecker.not.isDate('2023/04/13T17:01:46')).toBe(true)

    expect(ProxyChecker.not.isError(new Error('error test'))).toBe(false)
    expect(ProxyChecker.not.isError('string')).toBe(true)

    expect(ProxyChecker.not.isFalsy(false)).toBe(false)
    expect(ProxyChecker.not.isFalsy(true)).toBe(true)

    expect(ProxyChecker.not.isFunction(() => {})).toBe(false)
    expect(ProxyChecker.not.isFunction('string')).toBe(true)

    expect(ProxyChecker.not.isNull(null)).toBe(false)
    expect(ProxyChecker.not.isNull(undefined)).toBe(true)

    expect(ProxyChecker.not.isNumber(123)).toBe(false)
    expect(ProxyChecker.not.isNumber('string')).toBe(true)

    expect(ProxyChecker.not.isObject({})).toBe(false)
    expect(ProxyChecker.not.isObject([])).toBe(true)

    expect(ProxyChecker.not.isPrimitive('string')).toBe(false)
    expect(ProxyChecker.not.isPrimitive({})).toBe(true)

    expect(ProxyChecker.not.isPromise(Promise.resolve())).toBe(false)
    expect(ProxyChecker.not.isPromise({})).toBe(true)

    expect(ProxyChecker.not.isRegExp(/^test\d+$/)).toBe(false)
    expect(ProxyChecker.not.isRegExp({})).toBe(true)

    expect(ProxyChecker.not.isString('string')).toBe(false)
    expect(ProxyChecker.not.isString(123)).toBe(true)

    expect(ProxyChecker.not.isTruthy(true)).toBe(false)
    expect(ProxyChecker.not.isTruthy(false)).toBe(true)

    expect(ProxyChecker.not.isUndefined(undefined)).toBe(false)
    expect(ProxyChecker.not.isUndefined(null)).toBe(true)

    expect(ProxyChecker.not.isVoid(null)).toBe(false)
    expect(ProxyChecker.not.isVoid({})).toBe(true)
  })
})
