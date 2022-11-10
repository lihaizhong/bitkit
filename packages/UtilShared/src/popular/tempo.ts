import TypeChecker from '@lihzsky/type-checker'

export type TDateArgs = [number, number, number, number, number, number]

export class Tempo {
  static ST: Record<string, number> = {
    ONE_DAY: 86400000,
    ONE_HOUR: 3600000,
    ONE_MINUTE: 60000,
    ONE_SECOND: 1000
  }

  static remainTime: number = 0

  static getRemainByStandardTime(standardTime: number, gapStr: string): string {
    if (Tempo.remainTime === 0) {
      return ''
    }

    const remain: number = Math.floor(Tempo.remainTime / standardTime)

    Tempo.remainTime = Tempo.remainTime % standardTime

    return String(remain) + gapStr
  }

  format(
    value: any,
    format: string = "yyyy/MM/dd hh:mm:ss"
  ): string {
    const date: Date | null = this.toDate(value)

    if (date === null) {
      return ""
    }

    const map: Record<string, () => number> = {
      y: () => date.getFullYear(),
      M: () => date.getMonth() + 1, //月份
      d: () => date.getDate(), //日
      h: () => date.getHours(), //小时
      m: () => date.getMinutes(), //分
      s: () => date.getSeconds(), //秒
      q: () => Math.floor((date.getMonth() + 3) / 3), //季度
      S: () => date.getMilliseconds(), //毫秒
    }

    return format.replace(/([yMdhmsqS])+/g, (all: string, t: string) => {
      let fn: () => number = map[t]

      if (t === "y") {
        return String(fn()).substring(4 - all.length)
      }

      if (TypeChecker.isFunction(fn)) {
        let valStr: string = String(fn())

        if (all.length > 1) {
          valStr = "0" + valStr
          valStr = valStr.substring(valStr.length - 2)
        }

        return valStr
      }

      return all
    })
  }

  toRemainTime(value: number, format: string = 'd天h小时m分钟s秒'): string {
    if (!TypeChecker.isNumber(+value) || Number.isNaN(value) || Number.isFinite(value)) {
      return ''
    }

    Tempo.remainTime = +value

    return format.replace(/([dhms]+)([^dhms]+)/g, (_: string, t: string, gapStr: string) => {
      switch (t) {
        case 'd':
          return Tempo.getRemainByStandardTime(Tempo.ST.ONE_DAY, gapStr)
        case 'h':
          return Tempo.getRemainByStandardTime(Tempo.ST.ONE_HOUR, gapStr)
        case 'm':
          return Tempo.getRemainByStandardTime(Tempo.ST.ONE_MINUTE, gapStr)
        case 's':
          return Tempo.getRemainByStandardTime(Tempo.ST.ONE_SECOND, gapStr)
        default:
      }

      return t
    })
  }

  toDate(value: any, strict: boolean = false): Date | null {
    if (value instanceof Date) {
      return value
    }

    if (TypeChecker.isValidDate(value)) {
      return new Date(value)
    }

    if (/^(?:\d+[^\d]+){3}/.test(value)) {
      const parts: number[] = value.match(/\d+/g)?.map((item: string) => +item) ?? []
      let args: TDateArgs

      if (parts.length > 6) {
        args = parts.slice(0, 6) as TDateArgs
      } else if (parts.length < 6) {
        args = parts.concat(new Array(6 - parts.length).fill(0)) as TDateArgs
      } else {
        args = parts as TDateArgs
      }

      return new Date(...args)
    }

    if (strict) {
      return new Date()
    }

    return null
  }

  toTimestamp(value: any, strict: boolean = false): number {
    if (TypeChecker.isValidDate(value)) {
      return new Date(value).getTime()
    }

    if (strict) {
      return Date.now()
    }

    return 0
  }
}

export default new Tempo();
