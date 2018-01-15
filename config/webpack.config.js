const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const getBabelConfig = require('../utils/getBabelConfig');
const babelPreset = require('./babel-preset');
const config = require('./index');

const isDev = process.env.NODE_ENV !== 'production';

const plugins = [
  new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
  new webpack.NamedModulesPlugin(),
  new FriendlyErrorsPlugin(),
  new CaseSensitivePathsPlugin(),
];

if (isDev) {
  plugins.push(
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  );
} else {
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

const baseWebpackConfig = {
  plugins,
  entry: config.scripts.entries,
  output: {
    path: path.resolve(config.output, config.scripts.path),
    publicPath: config.scripts.publicPath,
    filename: '[name].js',
    chunkFilename: '[name].js',
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
          {
            cacheDirectory: true,
          },
          babelPreset,
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

function withUserConfig(conf) {
  if (config.webpackConfig) {
    return config.webpackConfig(conf, { isDev });
  }

  return conf;
}

module.exports = withUserConfig(baseWebpackConfig);
