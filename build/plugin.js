class PolyfillGroup {
    apply(compiler) {
        compiler.hooks.emit.tap('PolyfillGroup', compilation => {
            const dynamicJs = {
                api: {},
                dynamicDependConfig: {},
                common: {}
            };
            compilation.entrypoints.forEach((entry, name) => {
                if (name !== 'all') {
                    const dependList = [];
                    // name示例： dynamic/Array
                    // item示例：dynamic/Array.js
                    for (const item of entry.getFiles()) {
                        const isCommonChunk = /^\d+\.js/g.test(item);
                        // 公共文件内容
                        if (isCommonChunk) {
                            const name = item.replace(/(\d+)\.js/, '$1');
                            dependList.push(name);
                            if (!dynamicJs.common[name]) {
                                dynamicJs.common[name] = compilation.assets[item].source();
                            }
                        }
                        // api文件内容
                        else {
                            const name = item.replace(/dynamic\/(.*)\.js/, '$1');
                            dynamicJs.api[name] = compilation.assets[item].source();
                        }
                        delete compilation.assets[item];
                    }
                    // 公共配置
                    const configName = name.replace(/dynamic\/(.*)?/, '$1');
                    dynamicJs.dynamicDependConfig[configName] = dependList;
                }
            });
            // 生生成集合文件
            compilation.assets['dynamic-js.json'] = {
                source: () => JSON.stringify(dynamicJs),
                size: () => JSON.stringify(dynamicJs).length
            };
        });
    }
}
module.exports = PolyfillGroup;
