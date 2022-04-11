class PolyfillGroup {
    apply(compiler) {
        compiler.hooks.emit.tap('PolyfillGroup', compilation => {
            const isPc = process.env.PC;
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
                                depend.add(id);
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
                } else if (isPc) {
                    // pc polyfill 需要输出的.ts格式的函数，用于molecule引入
                    const all = compilation.assets['all.js'];
                    delete compilation.assets['all.js'];
                    const sourceCode = JSON.stringify(all._value);
                    compilation.assets['all.ts'] = {
                        source: () => 'export function allJSCb() { return ' + sourceCode + '}',
                        size: () => JSON.stringify(source).length
                    };

                    // 全量polyfill的js文件，用于主模板直接引入
                    compilation.assets['total.js'] = {
                        source: () => sourceCode,
                        size: () => JSON.stringify(source).length
                    };
                }
            });

            if (!isPc) {
                // 生成集合文件
                compilation.assets['dynamic-js.json'] = {
                    source: () => JSON.stringify(dynamicJs),
                    size: () => JSON.stringify(dynamicJs).length
                };
            } else {
                const dynamicDependConfig = dynamicJs.dynamicDependConfig;
                for (const key in dynamicDependConfig) {
                    if (Object.hasOwnProperty.call(dynamicDependConfig, key)) {
                        const apiCodeAry = dynamicDependConfig[key];
                        if (!apiCodeAry.length) {
                            apiCodeAry.push(-1);
                        }
                    }
                }
                compilation.assets['dynamic.ts'] = {
                    source: () => 'export function dynamicJSCb() { return ' + JSON.stringify(dynamicJs) + '}',
                    size: () => JSON.stringify(dynamicJs).length
                };
            }
        });
    }
}
module.exports = PolyfillGroup;