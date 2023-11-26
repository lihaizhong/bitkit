# @lihzsky/data-x

前后端交互中，我们常常依赖后端返回的数据。由于客观原因，后端有时候返回的数据结构并不完全符合预期，这时候就需要我们的工具派上用场了。我们的工具主要做以下几件事：

1. 数据校验处理，减少页面中对数据类型的判断。
2. 数据标准化处理，保证输出内容符合预期。
3. 数据增强处理，可扩展数据字段。

## Usage

```js
import { DataX } from "@lihzsky/data-x";

export class TestModel extends DataX {
  name = {
    type: String // 数据校验并进行标准化输出
  }

  id = {
    type: Number,
    field: 'useId' // 字段配对
  }

  sexStr = {
    type: String,
    // 数据增强，可自定义数据
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

## Recommend

由于完全格式化后台数据会存在以下问题：
1. 过渡的格式化造成内容太多，无法定位重点数据
2. 打包之后的文件太大

个人推荐将其作为一种扩展，减少页面中对数据格式的判断。重点对后端返回的数组和复杂对象做处理，以尽可能达到数据处理和页面逻辑与展示解耦的目的。
