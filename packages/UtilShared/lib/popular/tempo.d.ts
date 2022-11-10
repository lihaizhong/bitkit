export declare type TDateArgs = [number, number, number, number, number, number];
export declare class Tempo {
    static ST: Record<string, number>;
    static remainTime: number;
    static getRemainByStandardTime(standardTime: number, gapStr: string): string;
    format(value: any, format?: string): string;
    toRemainTime(value: number, format?: string): string;
    toDate(value: any, strict?: boolean): Date | null;
    toTimestamp(value: any, strict?: boolean): number;
}
declare const _default: Tempo;
export default _default;
