## 概述
PC-polyfill 配置

<!-- > 当前配置从 `v0.1.45` 版本开始生效 -->

- `pc_config` 配置所需导出的 `polyfill` 组合
- `pc_config_output` 配置打包后的产出
- `feature` 目前需要支持的所有 `polyfill` 列表，每个 `polyfill` 需要 `test` 文件

## Quick Start

```
npm run build:pc 产出所需发包文件
npm run test:pc 测试
npm run dev:pc 开发调试，可以修改 HtmlWebpackPlugin 传入所需的js文件列表
```

### normal

生产环境 `v0.1.43` 版本在使用的 `polyfill`，跟 `all` 的区别是少了 `map`、 `set`、 `symbol` 的支持

