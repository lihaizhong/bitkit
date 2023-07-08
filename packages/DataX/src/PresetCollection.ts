import { checkOfStrict, isString } from "@lihzsky/type-checker";
import { PresetConfig } from "typings";

export const BasicPresets: Record<string, string> = {
  Boolean: "boolean",
	String: "string",
	Number: "number",
	Object: "object",
	Array: "array",
	Any: "any",
}

export class PresetCollection {
  static presets: Map<string | symbol, any> = new Map();

	static check(type: string, preset: PresetConfig): boolean {
		switch (type) {
			case BasicPresets.Boolean:
				return checkOfStrict(preset, Boolean);
			case BasicPresets.String:
				return checkOfStrict(preset, String);
			case BasicPresets.Number:
				return checkOfStrict(preset, Number);
			case BasicPresets.Object:
				return checkOfStrict(preset, Object);
			case BasicPresets.Array:
				return checkOfStrict(preset, Array);
			default:
				return false;
		}
	}

	static get(name: string | PresetConfig): PresetConfig {
		if (isString(name)) {
			return PresetCollection.presets.get(name as string);
		}

		return name as PresetConfig;
	}

  static set(name: string, preset: PresetConfig): void {
    PresetCollection.presets.set(name, preset);
  }
}
