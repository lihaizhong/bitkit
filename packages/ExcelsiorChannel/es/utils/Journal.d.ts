export declare class Journal {
    private inst;
    private label;
    constructor(inst?: Console);
    static style(background: string, color?: string): string;
    private printf;
    group(label: string): void;
    log(...args: any[]): void;
    success(...args: any[]): void;
    info(...args: any[]): void;
    debug(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}
export declare const journal: Journal;
