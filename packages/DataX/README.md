# @lihzsky/data-x

前后端交互中，数据格式化及扩展工具。帮助前端对后端数据的结构化处理，减少页面中的非空判断逻辑

## Usage

```js
import { DataX } from "@lihzsky/data-x";

export class TestModel extends DataX {
  name = {
    type: String
  }

  id = {
    type: Number,
    field: 'useId'
  }

  sexStr = {
    type: String,
    field: (data) => {
      if (data.sex === 0) {
        return '男'
      }

      if (data.sex === 1) {
        return '女'
      }

      return ''
    }
  }


}

function testFn() {
  const testData = {
    userId: '123',
    name: null,
    age: 23,
    sex: 0
  }

  /**
   * ** Global Config
   *  * looseFields 是否自动填充默认值。如果值为undefined，将根据类型自动填充默认值
   *  * abandonUndefinedValue 如果值为undefined，直接过滤，需要配合loose/looseFields一起使用
   *  * strict 如果设置为true，则会将不合并没有定义的数据
   *  * debug 获取更详细的操作信息
   * ** Item Config
   *  * type {any} 必填，表示类型  可以是String、Number、Boolean、Array、泛型
   *  * itemType {any} 必填（数组），表示数组子集类型
   *  * defaultValue {string} 选填，表示默认值，如果不指定，Bean类会根据类型指定字符串
   *  * loose {boolean} 是否自动填充默认值。如果值为undefined，将根据类型自动填充默认值
   *  * field {string|function} 选填，表示后台对应的字段，如果不指定，就是当前的key。field可以是一个方法，参数为data，主要用于自定义数据
   */
  const options = {
    looseFields: false,
    abandonUndefinedValue: true,
    strict: false,
    debug: false
  }
  const model = new TestModel(options)

  model.transform(testData)

  // { userId: '123', id: 123, name: '', age: 23, sex: 0, sexStr: '男' }
  return model.valueOf()
}

testFn()
```

该工具会尽可能地帮你完成数据的转换。因为工具的解析方式有限，且为了尽可能避免出现数据误解析的问题，解析器只做了一些标准解析方式。如有特殊需求，可以使用field的方法方式，对返回值进行处理，以保证标准解析方式能通过解析。

## Recommend

由于完全格式化后台数据会存在以下问题：
1. 过渡的格式化造成内容太多，无法定位重点数据
2. 打包之后的文件太大

个人推荐将其作为一种扩展，减少页面中对数据格式的判断。重点对后端返回的数组和复杂对象做处理，以尽可能达到数据处理和页面逻辑与展示解耦的目的。
