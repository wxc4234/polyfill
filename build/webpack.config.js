const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const entry = require('./entry.js');
const PolyfillGroup = require('./plugin.js');
module.exports = (env, {mode}) => {
    const isProduction = mode === 'production';
    const plugins =  [
        new CleanWebpackPlugin(),
        new PolyfillGroup()
    ];
    if (!isProduction) {
        plugins.push(new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../config/index.html'),
            chunks: ['all'],
            chunksSortMode: 'manual',
            minify: false
        }));
    }
    return {
        mode: 'production',
        target: ['web', 'es5'],
        entry: entry(isProduction),
        devServer: {
            hot: true,
            open: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            ]
        },
        plugins,
        output: {
            path: path.resolve(__dirname, '../config_output')
        },
        optimization: {
            minimize: true,
            splitChunks: {
                chunks(chunk) {
                    // exclude `all`
                    return chunk.name !== 'all';
                },
                cacheGroups: {
                    commons: {
                        // 只提取dynamic文件夹下面文件
                        test: '\/src\/dynamic/',
                        chunks: 'all',
                        minChunks: 2
                    }
                }
            }
        }
    };
}
