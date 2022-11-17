export namespace ITransformBean {
  export interface GlobalOptions {
    looseFields?: boolean

    abandonUndefinedValue?: boolean

    strict?: boolean
  }

  export interface FieldOptions {
    loose: boolean
  }

  export interface FieldConfig extends Partial<FieldOptions> {
    type: any

    field?: string | ((data: any) => any)

    itemType?: any

    defaultValue?: any

    [key: string]: any
  }
}
