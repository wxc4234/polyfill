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
                    // 获取api的name
                    const apiName = name.replace(/dynamic\/(.*)/, '$1');
                    const fileName = name + '.js';
                    const depend = new Set();
                    for (const iterator of entry.chunks) {
                        for (const chunk of iterator.getAllInitialChunks()) {
                            // 没有name代表是新增的chunk
                            if (!chunk.name) {
                                const id = chunk.id;
                                depend.add(id)
                                if (!dynamicJs.common[id]) {
                                    const fileName = id + '.js';
                                    dynamicJs.common[id] = compilation.assets[fileName].source();
                                    delete compilation.assets[fileName];
                                }
                            }
                        }
                    }
                    dynamicJs.dynamicDependConfig[apiName] = [...depend];
                    dynamicJs.api[apiName] = compilation.assets[fileName].source();
                    delete compilation.assets[fileName];
                }
            });
            // 生成集合文件
            compilation.assets['dynamic-js.json'] = {
                source: () => JSON.stringify(dynamicJs),
                size: () => JSON.stringify(dynamicJs).length
            };
        });
    }
}
module.exports = PolyfillGroup;
