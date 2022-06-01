export { compare as LevenshteinDistanceCompare } from './compare/levenshtein-distance'

export interface IOptions {
  keyNameList: string | string[]
  filterEmptyValue: boolean
  caseSensitive: boolean
  minSimilarity: number
  compare: (sourceStr: string, targetStr: string) => number
}

export interface IYouNeedSuggest {
  get(value: string): any[]
}

export interface IYouNeedSuggestResult<T> {
  data: T;
  similarity: number;
}

export default class YouNeedSuggest<T> implements IYouNeedSuggest {
  private keyNameList: string[]
  private dataSource: T[]
  private options: IOptions = {
    // 进行匹配的字段
    keyNameList: [],
    // 是否过滤空值
    filterEmptyValue: true,
    // 是否区分大小写
    caseSensitive: false,
    // 最小相似度
    minSimilarity: 0,
    // 计算算法
    compare: () => 100,
  }

  constructor(dataSource: T[], options: Partial<IOptions>) {
    this.dataSource = dataSource
    this.options = Object.assign(this.options, options)
    this.keyNameList = this.parseKeyNameList(this.options.keyNameList)
  }

  private parseValue(value: string): string {
    const { caseSensitive } = this.options

    if(typeof value !== 'string') {
      return ''
    }

    if(caseSensitive) {
      value = value.toUpperCase()
    }

    return value
  }

  private parseKeyNameList(keyNameList?: string | string[]): string[] {
    if(typeof keyNameList === 'string') {
      return keyNameList.split(',')
    } else if(Array.isArray(keyNameList)) {
      return keyNameList
    }

    return ['value']
  }

  private getMaxSimilarity(value: string, match: any): number {
    if (typeof value === "string" && value === "" && this.options.filterEmptyValue) {
      return 100
    }

    if(typeof match === 'string') {
      return this.options.compare(this.parseValue(match), value)
    }

    return this.keyNameList.reduce((lastSimilarity, key) => {
      const sourceStr = this.parseValue(match[key])
      const currentSimilarity = this.options.compare(sourceStr, value)

      return Math.max(lastSimilarity, currentSimilarity)
    }, -Infinity)
  }

  get(value: string): any[] {
    const result: IYouNeedSuggestResult<T>[] = []
    value = this.parseValue(value)

    for(let i = 0; i < this.dataSource.length; i++) {
      const match = this.dataSource[i]
      const similarity = this.getMaxSimilarity(value, match)
      if(similarity >= this.options.minSimilarity) {
        result.push({ data: match, similarity })
      }
    }

    return result.sort((a: IYouNeedSuggestResult<T>, b: IYouNeedSuggestResult<T>) => b.similarity - a.similarity)
  }
}
