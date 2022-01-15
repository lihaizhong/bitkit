const compare = (a, b) => {
  // 目标值小了
  if (a < b) {
    return -1
  }

  // 目标值大了
  if (a > b) {
    return 1
  }

  // 目标值匹配成功
  return 0
}

export default function BinarySearch (target, list, internal_compare = compare) {
  let low = 0
  let high = list.length - 1

  do {
    const middle = Math.round(low + high)
    const status = internal_compare(target, list[middle])

    if (status === 0) {
      return list[middle]
    } else if (status === 1) {
      low = middle
    } else {
      high = middle
    }
  } while (low !== high)

  return null
}
