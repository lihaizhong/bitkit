import { isArray } from "@lihzsky/type-checker";
import type { PresetConfig } from "typings";
import { Convertor } from "./Convertor";
import { BasicPresets, PresetCollection } from "./PresetCollection";

export class DataX {
	static register(name: string, config: PresetConfig): void {
		PresetCollection.set(name, config);
	}

  static format(data: any, name: PresetConfig): any;
	static format(data: any, name: string): any;
  static format(data: any, name: string | PresetConfig): any {
		const convertor = new Convertor();

		if (isArray(data)) {
			return convertor.convertArray(name, data);
		}

		return convertor.convertObject(name, data);
	}
}

export { BasicPresets };

