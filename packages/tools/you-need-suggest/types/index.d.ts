interface IOptions {
    keyNameList?: string | string[];
    filterNoMatch?: boolean;
    caseSensitive?: boolean;
    minSimilarity?: number;
    compare: (source: string, target: string) => number;
}
interface IYouNeedSuggest {
    get(value: string): any[];
}
export default class YouNeedSuggest implements IYouNeedSuggest {
    private keyNameList;
    private list;
    private options;
    constructor(list: string[] | object[], options: IOptions);
    get(value: any): any[];
    private parseValue;
    private parseKeyNameList;
    private getMaxSimilarity;
}
export {};
