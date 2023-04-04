# ExcelsiorChannel

基于JSON-RPC 2.0协议的通信工具。用于浏览器主进程与iframe进程之间的通信。

- 支持消息延迟通信（在连接建立之前，所有的消息发送都会被缓存，直到连接创建成功）。
- 支持通知的形式调用远程函数。
- 支持请求的形式调用远程函数，并返回Promise结果。

## 如何使用

```ts
// main window
import { MainPoint, journal } from '@lihzsky/excelsior-channel';

const frame = document.body.getElementByTagName('iframe');
const pointer = new MainPoint(frame);

// 定义远程调用的函数
pointer.declare('move', () => {
  // move
  journal.info('move success!');
})

// 定义远程调用的函数
pointer.declare('delete', () => {
  // delete
  journal.info('delete success!');
})

// 通知update操作
pointer.notify('update')

// iframe
import { NodePoint, journal } from "@lihzsky/excelsior-channel";

const pointer = new NodePoint();

// 定义远程调用的函数
pointer.declare('update', () => {
  journal.info('update success!');
});

// 通知delete操作，删除指定内容
pointer.notify('delete', 1);

// 调用move操作，移动指定内容
// invoke的方式可以获取到返回的数据，用于下一步的操作
const data = await pointer.invoke('move', 1, 6);
```

## 类

### MainPoint

主窗口创建端口，用于远程通信。

### NodePoint

子窗口创建端口，用于远程通信。

## 方法

### declare(method: string, fn: PointController): void

声明远程函数。窗口发送通知或请求时，另一个窗口会找到对应的函数，并执行该函数。

### notify(method: string, ...params: any[]): void

通知执行远程函数。用于通知另一个窗口执行对应的函数。

### invoke(method: string, ...params: any[]): Promise\<any\>

请求执行远程函数并返回结果。用于请求另一个窗口执行对应的函数，函数会返回的结果发送会窗口。

## 另外

journal是自定义的轻量级console工具。可用于打印更漂亮的日志。
