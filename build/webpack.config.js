const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const entry = require('./entry.js');
module.exports = (env, {mode}) => {
    const isProduction = mode === 'production';
    const plugins =  [
        new CleanWebpackPlugin()
    ];
    if (!isProduction) {
        plugins.push(new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../dev_scripts/index.html'),
            chunks: ['all', '_test'],
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
            path: path.resolve(__dirname, '../feature')
        },
        optimization: {
            minimize: isProduction
        }
    };
};
