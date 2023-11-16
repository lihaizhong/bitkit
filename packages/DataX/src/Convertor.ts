import { TypeChecker, checkOfStrict, isFunction, isNull, isObject, isString } from "@lihzsky/type-checker";
import { FieldConfig, PresetConfig } from "typings";
import { BasicPresets, PresetCollection } from "./PresetCollection";
import { ValueParser } from "./valueParser";

export class Convertor {
	/**
	 * 设置默认值
	 * @param {any} type 数据类型
	 * @param {any} defaultValue 用户定义的默认数值
	 * @param {any} placeholderValue 系统定义的默认数值
	 * @returns {any}
	 */
	private getDefaultValue(type: any, defaultValue: any, placeValue: any): any {
		if (checkOfStrict(type, placeValue) || isNull(defaultValue)) {
			return defaultValue;
		}

		return placeValue;
	}

	/**
	 * 解析field对应的值
	 * @param {object} target
	 * @param {string|function} field
	 * @param {string} defaultField
	 */
	private parseFieldValue(target: any, field: any, defaultField: string): any {
		if (isObject(target)) {
			if (isString(field)) {
				return target[field];
			}

			if (isFunction(field)) {
				return field(target);
			}

			if (
				isString(defaultField) &&
				/^[a-zA-Z_]+\w*$/.test(defaultField)
			) {
				return target[defaultField];
			}
		}

		return target;
	}

	private parseFieldConfig(fieldConfig: FieldConfig, data: any) {
		const {
			name: fieldName,
			type,
			itemType,
			field: customFieldName,
			defaultValue,
		} = fieldConfig;
		const fieldValue: any = this.parseFieldValue(
			data,
			customFieldName,
			fieldName,
		);

		return {
			type,
			itemType,
			fieldName,
			fieldValue,
			defaultValue,
		};
	}

	/**
	 * 设置各种类型的值
	 * @param {object} fieldConfig 字段配置信息
	 * @param {any} data 数据
	 */
	convertDefinedField(fieldConfig: FieldConfig, data: any): any {
		const { type, itemType, fieldName, fieldValue, defaultValue } =
			this.parseFieldConfig(fieldConfig, data);
		const valueParser = new ValueParser();

		switch (type) {
			case String:
				return valueParser.toString(
					fieldName,
					fieldValue,
					this.getDefaultValue(type, defaultValue, ""),
				);
			case Number:
				return valueParser.toNumber(
					fieldName,
					fieldValue,
					this.getDefaultValue(type, defaultValue, null),
				);
			case Boolean:
				return valueParser.toBoolean(
					fieldName,
					fieldValue,
					this.getDefaultValue(type, defaultValue, null),
				);
			case Object:
				return valueParser.toObject(
					fieldName,
					fieldValue,
					this.getDefaultValue(type, defaultValue, {}),
				);
			case Array:
          return valueParser.toArray(
            fieldName,
            fieldValue,
            this.getDefaultValue(type, defaultValue, []),
            (subItem, subIndex) => this.convertDefinedField(
              {
                type: itemType,
                name: `${fieldName}[${subIndex}]`
              },
              subItem
            )
          )
			default:
				return this.convertObject(type, fieldValue || null);
		}
	}

	convertArray(
		name: string | PresetConfig,
		data: any[],
	): Record<string, any>[] {
		return data.map((item: any) => this.convertObject(name, item));
	}

	convertObject(
		name: string | PresetConfig,
		data: Record<string, any>,
	): Record<string, any> {
		const preset: PresetConfig = PresetCollection.get(name);
		const keys: string[] = Object.keys(preset);
    let values: Record<string, any> = {};

		// 收集已配置的数据
		values = keys.reduce(
			(formatValues: Record<string, any>, key: string) => {
				formatValues[key] = this.convertDefinedField(
					{ ...preset[key], name: key },
					data,
				);

				return formatValues;
			},
			values,
		);

		// 收集未配置的数据
		values = Object.keys(data).reduce(
			(formatValues: Record<string, any>, key: string) => {
				if (!keys.includes(key)) {
					formatValues[key] = data[key];
				}

				return formatValues;
			},
			values,
		);

		return values;
	}
}
