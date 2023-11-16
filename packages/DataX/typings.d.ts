export interface FieldConfig {
  name: string;
  field?: string | ((data: any) => any);
  type: any;
  itemType?: string;
  defaultValue?: any;
}
