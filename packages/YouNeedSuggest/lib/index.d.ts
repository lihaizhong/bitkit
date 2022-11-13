export interface IYouNeedSuggestionOptions {
    keyNameList: string | string[];
    filterEmptyValue: boolean;
    caseSensitive: boolean;
    minSimilarity: number;
    compare: (sourceStr: string, targetStr: string) => number;
}
export interface IYouNeedSuggestResult<T> {
    data: T;
    similarity: number;
}
export declare class YouNeedSuggestion<T> {
    private keyNameList;
    private dataSource;
    private options;
    constructor(dataSource: T[], options: Partial<IYouNeedSuggestionOptions>);
    private parseValue;
    private parseKeyNameList;
    private getMaxSimilarity;
    get(value: string): IYouNeedSuggestResult<T>[];
}
