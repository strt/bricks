const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const getBabelConfig = require('./utils/getBabelConfig');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const babelPresetBricks = require('./babel-preset');

const isDev = process.env.NODE_ENV !== 'production';

const plugins = [
  new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
  new webpack.NamedModulesPlugin(),
  new FriendlyErrorsPlugin(),
];

if (!isDev) {
  plugins.push(
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      mangle: true,
      sourceMap: true,
    }),
  );
}

let webpackConfig = {
  plugins,
  entry: config.scripts.entries,
  output: {
    path: path.resolve(config.output, config.scripts.path),
    publicPath: config.scripts.publicPath,
    filename: '[name].js',
    chunkFilename: '.[name].js',
  },
  context: path.resolve(config.source, config.scripts.path),
  devtool: isDev ? 'cheap-module-inline-source-map' : 'source-map',
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: Object.assign(
          {},
          {
            cacheDirectory: true,
          },
          babelPresetBricks,
          getBabelConfig(config.source),
        ),
      },
      {
        test: /\.html$/,
        exclude: /(node_modules)/,
        loader: 'html-loader',
      },
    ],
  },
};

if (config.webpackConfig) {
  webpackConfig = config.webpackConfig(webpackConfig, { isDev });
}

module.exports = webpackConfig;
