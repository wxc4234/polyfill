const acorn = require("acorn")
const walk = require("acorn-walk")

class PolyfillGroup {
    apply(compiler) {
      compiler.hooks.emit.tap('PolyfillGroup', (compilation) => {
            const dependFileList = new Set();
            const dynamicDependConfig = {};
            const dynamicJs = {}
            // 收集依赖的文件
            Object.keys(compilation.assets).forEach(fileName => {
                if (/^\d+/.test(fileName)) {
                    const name = fileName.replace(/(\d+)\.js/, '$1');
                    const fileContent = compilation.assets[fileName];
                    dependFileList.add(+name)
                    dynamicJs[name] = fileContent.source();
                    // 删除输出的文件
                    delete compilation.assets[fileName];
                }
            });
            //
            Object.keys(compilation.assets).forEach(fileName => {
                if (!/^\d+/.test(fileName) && !/^all/.test(fileName)) {
                    const name = fileName.replace(/dynamic\/(.*)?\.js/, '$1');
                    const fileContent = compilation.assets[fileName];
                    const depend = new Set();
                    walk.simple(acorn.parse(fileContent.source()), {
                        ArrayExpression(node) {
                            if (node.elements.length > 0) {
                                for (const item of node.elements) {
                                    if (dependFileList.has(item.value)) {
                                        depend.add(item.value)
                                    }
                                }
                            }
                        }
                    })
                    dynamicDependConfig[name] = [...depend];
                    dynamicJs[name] = fileContent.source();
                    // 删除输出的文件
                    delete compilation.assets[fileName];
                }
            });
            dynamicJs['dynamicDependConfig'] = dynamicDependConfig;
            // 生效集合文件
            compilation.assets['dynamicJs.json'] = {
                source: function() {
                  return JSON.stringify(dynamicJs);
                },
                size: function() {
                  return JSON.stringify(dynamicJs).length;
                },
            };

            console.log(dynamicDependConfig)
      });
    }
  }
module.exports = PolyfillGroup