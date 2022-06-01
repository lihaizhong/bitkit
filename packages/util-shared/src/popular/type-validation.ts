class TypeValidation {
  /**
     * 判断是否是某种具体类型
     * @param {any} value
     * @param {any} type
     * @returns {boolean}
     */
  isSameType(value: any, type: any): boolean {
    if(value === null || value === undefined) {
      return value === type;
    } else {
      return value.constructor.toString() === type.toString();
    }
  }

  /**
   * 时间格式校验
   * @param {string|number|date} value
   * @returns {boolean}
   */
  isValidDate(value: any): boolean {
    return (
      value !== null &&
      value !== 0 &&
      new Date(value).toString() !== 'Invalid Date'
    );
  }

  /**
   * 是否是Null
   * @param {any} value
   * @returns {boolean}
   */
  isNull(value: any): boolean {
    return value === null;
  }

  /**
   * 是否是Undefined
   * @param {any} value
   * @returns {boolean}
   */
  isUndefined(value: any): boolean {
    return typeof value === 'undefined';
  }

  /**
   * 判断是否是undefined或者null
   * @param {any} value
   * @returns {boolean}
   */
  isVoid(value: any): boolean {
    return typeof value === 'undefined' || value === null;
  }

  /**
   * 基本类型校验(包含null、undefined、string、number、boolean)
   * @param {any} value
   * @returns {boolean}
   */
  isPrimitive(value: any): boolean {
    return (
      value === null ||
      ['undefined', 'string', 'number', 'boolean'].includes(typeof value)
    );
  }

  /**
   * 是否是字符串
   * @param {any} value
   * @returns {boolean}
   */
  isString(value: any): boolean {
    return typeof value === 'string';
  }

  /**
   * 是否是有效数字
   * @param {any} value
   * @returns {boolean}
   */
  isNumber(value: any): boolean {
    return typeof value === 'number' && Number.isFinite(value);
  }

  /**
   * 是否是布尔类型
   * @param {any} value
   * @returns {boolean}
   */
  isBoolean(value: any): boolean {
    return typeof value === 'boolean';
  }

  /**
   * 是否是函数
   * @param {any} value
   * @returns {boolean}
   */
  isFunction(value: any): boolean {
    return typeof value === 'function';
  }

  /**
   * 是否是数组
   * @param {any} value
   * @returns {boolean}
   */
  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  /**
   * 是否是对象
   * @param {any} value
   * @returns {boolean}
   */
  isObject(value: any): boolean {
    return Object.prototype.toString.call(value) === '[object Object]';
  }

  /**
   * 是否是正则表达式
   * @param {any} value
   * @returns {boolean}
   */
  isRegExp(value: any): boolean {
    return Object.prototype.toString.call(value) === '[object RegExp]';
  }

  /**
   * 是否是Error对象
   * @param {any} value
   * @returns {boolean}
   */
  isError(value: any): boolean {
    return value instanceof Error;
  }

  /**
   * 是否是原生的Promise对象
   * @param {any} value
   * @returns {boolean}
   */
  isPromise(value: any): boolean {
    return value instanceof Promise;
  }
}

export default new TypeValidation()
