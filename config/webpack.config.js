const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const getBabelConfig = require('../utils/getBabelConfig');
const babelPreset = require('./babel-preset');
const config = require('./index');

const isDev = process.env.NODE_ENV === 'development';

const plugins = [new CaseSensitivePathsPlugin()];

if (isDev) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin(),
  );
}

const baseWebpackConfig = {
  mode: 'production',
  devtool: isDev ? 'cheap-module-inline-source-map' : 'source-map',
  context: path.resolve(config.source, config.scripts.path),
  entry: config.scripts.entries,
  output: {
    path: path.resolve(config.output, config.scripts.path),
    publicPath: config.scripts.publicPath,
    filename: '[name].js',
    chunkFilename: 'chunks/[name].js',
  },
  plugins,
  performance: {
    hints: !isDev,
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

function withUserConfig(conf) {
  if (config.webpackConfig) {
    return config.webpackConfig(conf, isDev);
  }

  return conf;
}

module.exports = withUserConfig(baseWebpackConfig);
