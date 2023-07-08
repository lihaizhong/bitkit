export interface FieldConfig {
  name: string;
  field?: string | ((data: any) => any);
  type: string;
  itemType?: string;
  defaultValue?: any;
}

export type PresetConfig = Record<string, FieldConfig>
