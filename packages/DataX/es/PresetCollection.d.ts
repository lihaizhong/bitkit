import { PresetConfig } from "typings";
export declare const BasicPresets: Record<string, string>;
export declare class PresetCollection {
    static presets: Map<string | symbol, any>;
    static check(type: string, preset: PresetConfig): boolean;
    static get(name: string | PresetConfig): PresetConfig;
    static set(name: string, preset: PresetConfig): void;
}
