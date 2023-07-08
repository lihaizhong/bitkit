import {
  checkOfStrict,
  isArray,
  isObject,
  isVoid
} from "@lihzsky/type-checker";

export class ValueParser {
	/**
	 * 解析成字符串
	 */
	toString(
		fieldName: string,
		fieldValue: string | number,
		defaultValue: any,
	): string {
		if (checkOfStrict(fieldValue, String)) {
			return fieldValue as string;
		}

		if (checkOfStrict(fieldValue, Number)) {
			return fieldValue.toString();
		}

		if (!isVoid(fieldValue)) {
			console.warn(
				"DataX.toString",
				`${fieldName} is not a string or number!`,
				fieldValue,
			);
		}

		return defaultValue;
	}

	/**
	 * 解析成数字
	 */
	toNumber(
		fieldName: string,
		fieldValue: string | number,
		defaultValue: any,
	): number {
		if (checkOfStrict(fieldValue, Number)) {
			return fieldValue as number;
		}

		if (
			checkOfStrict(fieldValue, String) &&
			/^\d+$/.test(fieldValue as unknown as string)
		) {
			return Number(fieldValue);
		}

		if (!isVoid(fieldValue)) {
			console.warn(
				"DataX.toNumber",
				`${fieldName} is not a number or numeric string`,
				fieldValue,
			);
		}

		return defaultValue;
	}

	/**
	 * 解析成布尔
	 */
	toBoolean(
		fieldName: string,
		fieldValue: boolean,
		defaultValue: any,
	): boolean {
		if (checkOfStrict(fieldValue, Boolean)) {
			return fieldValue;
		}

		if (!isVoid(fieldValue)) {
			console.warn(
				"DataX.toBoolean",
				`${fieldName} is not a boolean`,
				fieldValue,
			);
		}

		return defaultValue;
	}

	/**
	 * 解析成对象
	 */
	toObject(
		fieldName: string,
		fieldValue: object,
		defaultValue: any,
	): Record<string, any> {
		if (isObject(fieldValue)) {
			return fieldValue;
		}

		if (!isVoid(fieldValue)) {
			console.warn(
				"DataX.toObject",
				`${fieldName} is not a plain object`,
				fieldValue,
			);
		}

		return defaultValue;
	}

  /**
	 * 解析成数组
	 */
	toArray(
		fieldName: string,
		fieldValue: any[],
		defaultValue: any,
		callback: (subItem: any, subIndex: number) => any,
	): any[] {
		if (!isArray(fieldValue)) {
			console.warn("DataX.toArray", `${fieldName} is not a array!`, fieldValue);
		}

		return (fieldValue || defaultValue).map(callback);
	}
}
