const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const getBabelConfig = require('../utils/getBabelConfig');
const babelPreset = require('./babel-preset');
const config = require('./config');

const isDev = process.env.NODE_ENV === 'development';
const plugins = [new CaseSensitivePathsPlugin()];

if (isDev) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin(),
  );
}

let webpackConfig = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',
  entry: config.scripts.entries,
  output: {
    path: path.resolve(config.output),
    publicPath: config.scripts.publicPath,
    filename: `${config.scripts.path}/[name].js`,
    chunkFilename: `${config.scripts.path}/chunks/[name].js`,
  },
  plugins,
  node: {
    fs: 'empty',
    process: false,
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          babelrc: false,
          ...babelPreset,
          ...getBabelConfig(config.source),
        },
      },
    ],
  },
};

if (typeof config.webpack === 'function') {
  webpackConfig = config.webpack(webpackConfig, isDev);
}

module.exports = webpackConfig;
