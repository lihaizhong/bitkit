export interface IFormRule {
    rule: boolean | (() => boolean);
    message: string;
}
export declare function formValidate(schema?: IFormRule[]): Promise<{
    valid: boolean;
    error: string | null;
}>;
