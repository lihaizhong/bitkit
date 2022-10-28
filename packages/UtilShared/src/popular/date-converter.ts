function getDateInstance(value: any): Date | null {
  const INVALID_DATE: string = "Invalid Date"

  if (value instanceof Date) {
    return value
  } else if (typeof value === "number" && new Date(value).toUTCString() !== INVALID_DATE) {
    return new Date(value)
  } else if (typeof value === "string") {
    
  }

  return null
}

export function dateConverter(
  value: any,
  format: string = "yyyy/MM/dd hh:mm:ss"
): string {
  const date: Date | null = getDateInstance(value)

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

    if (typeof fn === "function") {
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
