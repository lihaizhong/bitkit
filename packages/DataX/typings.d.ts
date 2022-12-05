export namespace ITransformBean {
  export interface GlobalOptions {
    looseFields?: boolean

    abandonUndefinedValue?: boolean

    strict?: boolean

    debug?: boolean

    parser?: (key: string, fieldConfig: ITransformBean.FieldConfig, fieldValue: any, options: ITransformBean.FieldOptions) => void
  }

  export interface FieldOptions {
    loose: boolean
  }

  export interface FieldConfig extends Partial<FieldOptions> {
    type: any

    field?: string | ((data: any) => any)

    itemType?: any

    defaultValue?: any

    convert?: (convertor: any, key: string, fieldConfig: FieldConfig, config: GlobalOptions) => any

    [key: string]: any
  }
}
