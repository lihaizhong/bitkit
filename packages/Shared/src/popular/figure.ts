import TypeChecker from "@lihzsky/type-checker"

export const Figure = {
  toYuan(value: any): string {
    if (TypeChecker.isNumber(value)) {
      return (value / 100).toFixed(2)
    }

    return '0.00'
  },

  toFen(value: any): number {
    if (TypeChecker.isString(value) && /^\d+(?:\.\d+)?$/.test(value)) {
      return Number(value) * 100
    }

    return 0
  },

  toPercent(value: any): string {
    if (TypeChecker.isNumber(value)) {
      return `${value / 100}%`
    }

    return ''
  }
}
