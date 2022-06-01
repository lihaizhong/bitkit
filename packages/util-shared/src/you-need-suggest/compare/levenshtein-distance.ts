export type TWeightOptions = {
  // 最大的匹配词长度权重
  continuous: number
  // 匹配词总个数权重
  count: number
  // 首个匹配字符的位置权重
  position: number
  // 最短编辑路径权重
  distance: number
}

export type TDistanceOptions = TWeightOptions

class DistanceCalculator {
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

  calc(sourceLength: number, targetLength: number, weight: TWeightOptions): number {
    const { continuous, count, position, distance } = this;

    return (1 - distance / Math.max(sourceLength, targetLength)) * weight.distance +
      (1 - position / targetLength) * weight.position +
      (continuous / targetLength) * weight.continuous +
      (count / targetLength) * weight.count
  }
}

function levenshteinDistance(distanceCalculator: DistanceCalculator, source: string, target: string): void {
  const sourceLength: number = source.length
  const targetLength: number = target.length
  const space: number[] = new Array(targetLength)
  // const distanceCalculator: DistanceCalculator = new DistanceCalculator(0, 0, targetLength, -1)

  // 过滤目标或者比较值为空字符串的情况
  if(sourceLength === 0) {
    distanceCalculator.setDistance(targetLength)
  } else if(targetLength === 0) {
    distanceCalculator.setDistance(sourceLength)
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
          if(distanceCalculator.getPosition() === targetLength) {
            distanceCalculator.setPosition(j)
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
          distanceCalculator.setContinuous(continuous)
          continuous = 1
        }

        matchPositionList.push(matchIndex)
      } else {
        // 设置最长的连续字符
        distanceCalculator.setContinuous(continuous)
        continuous = 0
      }
    }

    // 设置最长的连续字符
    distanceCalculator.setContinuous(continuous)
    // 设置匹配到的数量
    distanceCalculator.setCount(matchPositionList.length)
    // 设置编辑距离
    distanceCalculator.setDistance(space[targetLength - 1])
  }
}

export const compare = (weight: TWeightOptions) => (source: string, target: string) => {
  const distanceCalculator = new DistanceCalculator(0, 0, target.length, -1)

  levenshteinDistance(distanceCalculator, source, target)

  return distanceCalculator.calc(source.length, target.length, weight)
}
