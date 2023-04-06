# toolkit

这是我的个人工具包的仓库。

## 目录结构

``` text
|-- Algorithms 算法学习
|-- kits 个人未整理工具
|-- NativeImpls 原生实现
|-- packages 一部分npm仓库中的包
```

## pnpm使用

- `pnpm add <npm_package> -w` 全局安装依赖包
- `pnpm add <npm_package> -r` 所有本地包安装依赖包
- `pnpm add <npm_package> -r --filter <local_package>` 指定本地包安装依赖包

相比于lerna，pnpm的操作更加简便高效。由于pnpm软链接方式的优势，pnpm在体验上更符合平时的使用，且不会增加额外的磁盘空间负担。

## 发布流程

### 进入Prereleases模式发布测试包

``` bash
# 对所有包进行打包处理
npm run build

# 非正式包使用此命令进入Prereleases模式
pnpm changeset pre enter <tag>

# 进入正常的发布npm包环节
...

pnpm changeset pre exit
```

| 名称  | 功能                                                                                     |
| ----- | ---------------------------------------------------------------------------------------- |
| alpha | 内部测试版，一般不向外部发布，会有很多Bug，一般只有测试人员使用                          |
| beta  | 测试版，这个阶段的版本会一直加入新的功能。在Alpha版之后推出                              |
| rc    | Release　Candidate) 系统平台上就是发行候选版本。RC版不会再加入新的功能了，主要着重于除错 |

### 发布npm包

``` bash
# 对所有包进行打包处理
npm run build
# 对所有包进行文档生成
npm run docs

npx changeset

npx changeset version

npx changeset publish
```

## 参考

- [为XHR对象所有方法和属性提供钩子 全局拦截AJAX](https://juejin.cn/post/6844903629497827341)
- [TypeDoc 中文文档](https://typedoc.bootcss.com/)
- [前端测试之Jest深入浅出](https://juejin.cn/post/6844904196244766728)

