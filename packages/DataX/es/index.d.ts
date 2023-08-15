import type { PresetConfig } from "typings";
import { BasicPresets } from "./PresetCollection";
export declare class DataX {
    static register(name: string, config: PresetConfig): void;
    static format(data: any, name: PresetConfig): any;
    static format(data: any, name: string): any;
}
export { BasicPresets };
