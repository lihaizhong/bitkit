export declare class Journal {
    private inst;
    constructor(inst?: Console);
    static style(background: string, color?: string): string;
    private printf;
    log(...args: any[]): void;
    success(...args: any[]): void;
    info(...args: any[]): void;
    debug(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}
export declare const journal: Journal;
