const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const findBabelConfig = require('./utils/findBabelConfig');
const isDev = require('./utils/isDev');

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
            'flow',
            ['env', { modules: false }],
          ],
          plugins: [
            'transform-class-properties',
            'transform-object-rest-spread',
          ],
        }, findBabelConfig(config.source)),
      },
      {
        test: /\.html$/,
        exclude: /(node_modules)/,
        loader: 'html-loader',
      },
    ],
  },
  plugins: isDev ? [] : [
    new webpack.EnvironmentPlugin('NODE_ENV'),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      mangle: true,
      sourceMap: true,
    }),
  ],
};
