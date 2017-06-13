const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const findBabelConfig = require('./utils/findBabelConfig');

module.exports = function webpackConfig() {
  const cfg = config.get();
  const debug = process.env.NODE_ENV !== 'production';

  return {
    entry: cfg.scripts.entries,
    output: {
      path: path.resolve(cfg.output, cfg.scripts.path),
      publicPath: cfg.scripts.publicPath,
      filename: '[name].js',
    },
    context: path.resolve(cfg.source, cfg.scripts.path),
    devtool: debug ? 'cheap-module-inline-source-map' : 'source-map',
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
          }, findBabelConfig(cfg.source)),
        },
        {
          test: /\.html$/,
          exclude: /(node_modules)/,
          loader: 'html-loader',
        },
      ],
    },
    plugins: debug ? [] : [
      new webpack.EnvironmentPlugin('NODE_ENV'),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
        mangle: true,
        sourceMap: true,
      }),
    ],
  };
};
