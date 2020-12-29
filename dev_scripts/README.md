## 概述

未来所需 `polyfill` 组合在一起进行打包压缩，减少体积

## normal

生产环境 `v0.1.43` 版本在使用的 `polyfill`，跟 `all` 的区别是少了 `map`、 `set`、 `symbol` 的支持

## all 

包含目前所有需要的 `polyfill`，新增 `map`、`set`、`symbol`，把所有的一起打包，减少体积。


