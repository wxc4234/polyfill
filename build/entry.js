const glob = require('glob');
const path = require('path');
module.exports = (isProduction) => {
    const isPc = process.env.PC;
    const entryDir = isPc ? 'pc_config' : 'config';
    const files = glob.sync(`./${entryDir}/src/**/*.js`, {
        ignore: isProduction ? [`./${entryDir}/src/**/_*.js`] : ''
    });
    const entry = {};
    files.forEach(val => {
        const name = path.relative(`./${entryDir}/src`, val);
        entry[name.replace(/\.js/, '')] = val;
    });
    return entry;
};