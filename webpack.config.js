process.env.NODE_ENV = 'development';

var reactScriptsConfig = require('react-scripts/config/webpack.config.dev');
var path = require('path');
var fs = require('fs');

var appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
    return path.resolve(appDirectory, relativePath);
}

module.exports = Object.assign({}, reactScriptsConfig, {
    plugins: reactScriptsConfig.plugins.filter((plugin, index) => [0, 1, 3].indexOf(index) === -1),
    entry: reactScriptsConfig.entry
        .filter(entry => !entry.includes('react-dev-utils' + path.sep + 'webpackHotDevClient.js'))
        .map(entry => entry.includes('src' + path.sep + 'index.js') ? resolveApp('src' + path.sep + 'React' + path.sep + 'index.js') : entry),
    output: Object.assign({}, reactScriptsConfig.output, {
        //path: resolveApp('webroot' + path.sep + 'build')
        path: resolveApp('webroot'),
        filename: '_js/bundle.js',
    })
});
