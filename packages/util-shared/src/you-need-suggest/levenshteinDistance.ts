export type TResult = {
  continuous: number
  count: number
  position: number
  distance: number
}

namespace Utility {
  export class ResultWrapper {
    private continuous: number
    private count: number
    private position: number
    private distance: number

    constructor(continuous: number, count: number, position: number, distance: number) {
      // 最大的匹配词长度
      this.continuous = continuous
      // 匹配词总个数
      this.count = count
      // 首个匹配字符的位置
      this.position = position
      // 最短编辑路径
      this.distance = distance
    }

    get() {
      const { continuous, count, position, distance } = this

      return { continuous, count, position, distance }
    }

    setContinuous(continuous: number): void {
      if(this.continuous < continuous) {
        this.continuous = continuous
      }
    }

    getContinuous(): number {
      return this.continuous
    }

    setCount(count: number): void {
      this.count = count
    }

    getCount(): number {
      return this.count
    }

    setPosition(position: number): void {
      this.position = position
    }

    getPosition(): number {
      return this.position
    }

    setDistance(distance: number): void {
      this.distance = distance
    }

    getDistance(): number {
      return this.distance
    }
  }

  export function levenshteinDistance(source: string, target: string): TResult {
    const sourceLength: number = source.length
    const targetLength: number = target.length
    const space: number[] = new Array(targetLength)
    const result: Utility.ResultWrapper = new Utility.ResultWrapper(0, 0, targetLength, -1)

    // 过滤目标或者比较值为空字符串的情况
    if(sourceLength === 0) {
      result.setDistance(targetLength)
    } else if(targetLength === 0) {
      result.setDistance(sourceLength)
    } else {
      // 保存所有匹配到的字符的index
      const matchPositionList: number[] = []
      // 连续字符长度
      let continuous: number = 0
      // 0 为不需要做增删改的操作，1 为需要做增删改操作
      let modifyNum: number = 0

      for(let i = 0; i < sourceLength; i++) {
        const sourceChar: string = source[i]
        let temp: number = i
        let matchIndex: number = -1

        for(let j = 0; j < targetLength; j++) {
          const targetChar: string = target[j]
          // 前一个编辑距离
          const prevDistance: number = j === 0 ? i + 1 : space[j - 1]
          // 上一个编辑距离
          const topDistance: number = space[j] === undefined ? j + 1 : space[j]

          if(sourceChar === targetChar) {
            modifyNum = 0

            // 解决重复匹配的问题
            if(matchIndex === -1 && !matchPositionList.includes(j)) {
              matchIndex = j
            }

            // 设置首位匹配到的字符
            if(result.getPosition() === targetLength) {
              result.setPosition(j)
            }
          } else {
            modifyNum = 1
          }

          // 获取增，删，改和不变得到的最小值
          const min: number = Math.min(prevDistance + 1, topDistance + 1, temp + modifyNum)

          // 保存左上角的数据，计算最小值时需要用到
          temp = topDistance
          space[j] = min
        }

        // 如果匹配到了结果
        if(matchIndex !== -1) {
          if(i > 0 && matchIndex > 0 && source[i - 1] === target[matchIndex - 1]) {
            if(continuous === 0) {
              continuous = 2
            } else {
              continuous++
            }
          } else if(continuous === 0) {
            continuous++
          } else {
            // 设置最长的连续字符
            result.setContinuous(continuous)
            continuous = 1
          }

          matchPositionList.push(matchIndex)
        } else {
          // 设置最长的连续字符
          result.setContinuous(continuous)
          continuous = 0
        }
      }

      // 设置最长的连续字符
      result.setContinuous(continuous)
      // 设置匹配到的数量
      result.setCount(matchPositionList.length)
      // 设置编辑距离
      result.setDistance(space[targetLength - 1])
    }

    return result.get()
  }

  export function calc(sourceLength: number, targetLength: number, data: TResult, weight: TResult): number {
    return (1 - data.distance / Math.max(sourceLength, targetLength)) * weight.distance +
      (1 - data.position / targetLength) * weight.position +
      (data.continuous / targetLength) * weight.continuous +
      (data.count / targetLength) * weight.count
  }
}

export function compare(weight: TResult): any {
  return function compare_inner(source: string, target: string) {
    const result = Utility.levenshteinDistance(source, target)
    return Utility.calc(source.length, target.length, result, weight)
  }
}
