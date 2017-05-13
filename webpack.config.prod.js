process.env.NODE_ENV = 'production';

var reactScriptsConfig = require('react-scripts/config/webpack.config.prod');
var path = require('path');
var fs = require('fs');

var appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
    return path.resolve(appDirectory, relativePath);
}

var ExtractTextPlugin = require('extract-text-webpack-plugin');

const cssFilename = 'css/[name].css';

module.exports = Object.assign({}, reactScriptsConfig, {
    devtool: null,
    plugins: reactScriptsConfig.plugins
        .map(function (plugin, index) {
            if (index === 6) {
                return new ExtractTextPlugin(cssFilename);
            }

            return plugin;
        })
        .filter((plugin, index) => [0, 1, 7].indexOf(index) === -1),
    entry: reactScriptsConfig.entry
        .map(entry => entry.includes('src' + path.sep + 'index.js') ? resolveApp('src' + path.sep + 'React' + path.sep + 'index.js') : entry),
    output: Object.assign({}, reactScriptsConfig.output, {
        path: resolveApp('webroot'),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].chunk.js',
    })
});
