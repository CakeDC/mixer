process.env.NODE_ENV = 'production';

let reactScriptsConfig = require('react-scripts/config/webpack.config.prod');
let path = require('path');
let fs = require('fs');

let appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
    return path.resolve(appDirectory, relativePath);
}

let ExtractTextPlugin = require('extract-text-webpack-plugin');

const cssFilename = 'css/[name].css';

module.exports = Object.assign({}, reactScriptsConfig, {
    devtool: false,
    plugins: reactScriptsConfig.plugins
        .map(function (plugin, index) {
            if (index === 4) {
                return new ExtractTextPlugin(cssFilename);
            }

            return plugin;
        })
        .filter((plugin, index) => [0, 1, 5, 6].indexOf(index) === -1),
    entry: reactScriptsConfig.entry
        .map(entry => entry.includes('src' + path.sep + 'index.js') ? resolveApp('src' + path.sep + 'React' + path.sep + 'index.js') : entry),
    output: Object.assign({}, reactScriptsConfig.output, {
        path: resolveApp('webroot'),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].chunk.js',
    })
});
