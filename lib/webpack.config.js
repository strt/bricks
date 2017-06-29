const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const getBabelConfig = require('./utils/getBabelConfig');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: config.scripts.entries,
  output: {
    path: path.resolve(config.output, config.scripts.path),
    publicPath: config.scripts.publicPath,
    filename: '[name].js',
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
        options: Object.assign({}, {
          cacheDirectory: true,
          presets: [
            ['env', { modules: false }],
          ],
          plugins: [
            'transform-class-properties',
            'transform-object-rest-spread',
          ],
        }, getBabelConfig(config.source)),
      },
      {
        test: /\.html$/,
        exclude: /(node_modules)/,
        loader: 'html-loader',
      },
    ],
  },
  plugins: isDev ? [
    new FriendlyErrorsPlugin(),
  ] : [
    new webpack.EnvironmentPlugin('NODE_ENV'),
    // new webpack.optimize.ModuleConcatenationPlugin(), Disable until core-js issues are solved :/
    new UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      mangle: true,
      sourceMap: true,
    }),
  ],
};
