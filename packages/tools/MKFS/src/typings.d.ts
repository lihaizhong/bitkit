// Copyright (c) 2021 Sangbaipi
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export namespace ITransformBean {
  export interface GlobalOptions {
    loose?: boolean | string[];

    abandonUndefinedValue?: boolean;

    strict?: boolean;
  }

  export interface FieldOptions {
    loose: boolean
  }

  export interface FieldConfig extends Partial<FieldOptions> {
    __name__?: string;

    type: any;

    field?: string | ((data: any) => any);

    itemType?: any;

    defaultValue?: any;

    [key: string]: any;
  }
}
