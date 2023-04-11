export interface JournalConsole {
    group(label: string): void;
    groupEnd(): void;
    log(...args: any[]): void;
    info(...args: any[]): void;
    debug(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}
export declare class Journal {
    private inst;
    private label;
    constructor(inst?: JournalConsole);
    static style(background: string, color?: string): string;
    protected printf(label: string, messages: any[], cb: (message: any) => void): void;
    group(label: string): {
        success: any;
        info: any;
        debug: any;
        warn: any;
        error: any;
    };
    log(...args: any[]): void;
    success(...args: any[]): void;
    info(...args: any[]): void;
    debug(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}
