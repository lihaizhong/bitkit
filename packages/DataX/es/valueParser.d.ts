export declare class ValueParser {
    /**
     * 解析成字符串
     */
    toString(fieldName: string, fieldValue: string | number, defaultValue: any): string;
    /**
     * 解析成数字
     */
    toNumber(fieldName: string, fieldValue: string | number, defaultValue: any): number;
    /**
     * 解析成布尔
     */
    toBoolean(fieldName: string, fieldValue: boolean, defaultValue: any): boolean;
    /**
     * 解析成对象
     */
    toObject(fieldName: string, fieldValue: object, defaultValue: any): Record<string, any>;
    /**
       * 解析成数组
       */
    toArray(fieldName: string, fieldValue: any[], defaultValue: any, callback: (subItem: any, subIndex: number) => any): any[];
}
