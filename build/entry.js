const glob = require('glob');
const path = require('path');
module.exports = isProduction => {
    const files = glob.sync('./config/src/**/*.js', {
        ignore: isProduction ? ['./config/src/**/_*.js'] : ''
    });
    const entry = {};
    files.forEach(val => {
        const name = path.relative('./config/src', val);
        entry[name.replace(/\.js/, '')] = val;
    });
    return entry;
};