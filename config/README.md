## 概述

> 当前配置从 `v0.1.44` 版本开始生效

未来所需 `polyfill` 组合在一起进行打包压缩，减少体积

- `config` 配置所需导出的 `polyfill` 组合
- `config_output` 配置打包后的产出
- `feature` 目前需要支持的所有 `polyfill` 列表，每个 `polyfill` 需要 `test` 文件

## Quick Start

```
npm run build 产出所需发包文件
npm run test 测试
npm run dev 开发调试，可以修改 HtmlWebpackPlugin 传入所需的js文件列表
```

### normal

生产环境 `v0.1.43` 版本在使用的 `polyfill`，跟 `all` 的区别是少了 `map`、 `set`、 `symbol` 的支持

### all

包含目前所有需要的 `polyfill`，新增 `map`、`set`、`symbol`，把所有的一起打包，减少体积。


