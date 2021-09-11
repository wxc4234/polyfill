const acorn = require('acorn');
const walk = require('acorn-walk');

class PolyfillGroup {
    apply(compiler) {
        compiler.hooks.emit.tap('PolyfillGroup', compilation => {
            const dependFileList = new Set();
            const dynamicDependConfig = {};
            const dynamicJs = {};
            // 收集依赖的文件
            Object.keys(compilation.assets).forEach(fileName => {
                if (/^\d+/.test(fileName)) {
                    const name = fileName.replace(/(\d+)\.js/, '$1');
                    const fileContent = compilation.assets[fileName];
                    dependFileList.add(+name);
                    dynamicJs[name] = fileContent.source();
                    // 删除输出的文件
                    delete compilation.assets[fileName];
                }
            });
            // 收集每个polyfill依赖的公共配置文件
            Object.keys(compilation.assets).forEach(fileName => {
                if (!/^\d+/.test(fileName) && !/^all/.test(fileName)) {
                    const name = fileName.replace(/dynamic\/(.*)?\.js/, '$1');
                    const fileContent = compilation.assets[fileName];
                    const depend = new Set();
                    // 找到依赖的公共配置
                    walk.simple(acorn.parse(fileContent.source()), {
                        ArrayExpression(node) {
                            if (node.elements.length > 0) {
                                for (const item of node.elements) {
                                    if (dependFileList.has(item.value)) {
                                        depend.add(item.value);
                                    }

                                }
                            }

                        }
                    });
                    dynamicDependConfig[name] = [...depend];
                    dynamicJs[name] = fileContent.source();
                    // 删除输出的文件
                    delete compilation.assets[fileName];
                }

            });
            // 把配置导入到文件内，便于下面输出json文件
            dynamicJs.dynamicDependConfig = dynamicDependConfig;
            // 生生成集合文件
            compilation.assets['dynamic-js.json'] = {
                source: () => JSON.stringify(dynamicJs),
                size: () => JSON.stringify(dynamicJs).length
            };
        });
    }
}
module.exports = PolyfillGroup;
