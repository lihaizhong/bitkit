export function dateConverter(
  date: Date | string | number,
  format: string = "yyyy/MM/dd hh:mm:ss"
): string {
  if (typeof date === "string") {
    const mts = (date as string).match(/(\/Date\((\d+)\)\/)/)

    if (mts && mts.length >= 3) {
      date = parseInt(mts[2])
    }
  }

  const _date: Date = new Date(date)

  if (!_date || _date.toUTCString() == "Invalid Date") {
    return ""
  }

  const map: Record<string, () => number> = {
    y: () => _date.getFullYear(),
    M: () => _date.getMonth() + 1, //月份
    d: () => _date.getDate(), //日
    h: () => _date.getHours(), //小时
    m: () => _date.getMinutes(), //分
    s: () => _date.getSeconds(), //秒
    q: () => Math.floor((_date.getMonth() + 3) / 3), //季度
    S: () => _date.getMilliseconds(), //毫秒
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
