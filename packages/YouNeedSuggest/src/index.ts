import { compare } from './compare/levenshtein-distance'

export interface YouNeedSuggestionOptions {
  keyNameList: string | string[]
  filterEmptyValue: boolean
  caseSensitive: boolean
  minSimilarity: number
  compare: (sourceStr: string, targetStr: string) => number
}

export interface YouNeedSuggestResult<T> {
  data: T;
  similarity: number;
}

export class YouNeedSuggestion<T> {
  private keyNameList: string[]
  private dataSource: T[]
  private options: YouNeedSuggestionOptions = {
    // 进行匹配的字段
    keyNameList: ['text'],
    // 是否过滤空值
    filterEmptyValue: true,
    // 是否区分大小写
    caseSensitive: false,
    // 最小相似度
    minSimilarity: 0,
    // 计算算法
    compare: compare()
  }

  constructor(dataSource: T[], options: Partial<YouNeedSuggestionOptions>) {
    this.dataSource = dataSource
    this.options = Object.assign(this.options, options)
    this.keyNameList = this.parseKeyNameList(this.options.keyNameList)
  }

  private parseValue(value: any): string {
    const { caseSensitive } = this.options

    if (typeof value !== "string") {
      return ""
    }

    // 不区分大小写时，需要将字符串转换为小写
    return caseSensitive
      ? value
      : value.toLowerCase()
  }

  private parseKeyNameList(keyNameList?: string | string[]): string[] {
    if(typeof keyNameList === 'string') {
      return keyNameList.split(',')
    } else if(Array.isArray(keyNameList)) {
      return keyNameList
    }

    return ['value']
  }

  private getMaxSimilarity(value: string, match: T): number {
    if (typeof value === "string" && value === "" && this.options.filterEmptyValue) {
      return 100
    }

    if(typeof match === 'string') {
      return this.options.compare(this.parseValue(match), value)
    }

    return this.keyNameList.reduce((lastSimilarity, key) => {
      const sourceStr: string = this.parseValue((match as any)[key])
      const currentSimilarity: number = this.options.compare(sourceStr, value)

      return Math.max(lastSimilarity, currentSimilarity)
    }, -Infinity)
  }

  get(value: string): YouNeedSuggestResult<T>[] {
    const result: YouNeedSuggestResult<T>[] = []
    value = this.parseValue(value)

    for(let i = 0; i < this.dataSource.length; i++) {
      const match: T = this.dataSource[i]
      const similarity: number = this.getMaxSimilarity(value, match)
      if(similarity >= this.options.minSimilarity) {
        result.push({ data: match, similarity })
      }
    }

    return result.sort((a: YouNeedSuggestResult<T>, b: YouNeedSuggestResult<T>) => b.similarity - a.similarity)
  }
}
