const glob = require('glob');
const path = require('path');
module.exports = isProduction => {
    const files = glob.sync('./dev_scripts/src/**/*.js', {
        ignore: isProduction ? ['./dev_scripts/src/**/_*.js'] : ''
    });
    const entry = {};
    files.forEach(val => {
        const name = path.relative('./dev_scripts/src', val);
        entry[name.replace(/\.js/, '')] = val;
    });
    return entry;
};