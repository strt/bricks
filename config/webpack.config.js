const { resolve } = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const config = require('./config');

const isDev = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

function getEntry() {
  const { entries } = config.scripts;

  if (!isDev || !config.publicPath) {
    return entries;
  }

  const client = 'webpack-hot-middleware/client?reload=true';

  if (Array.isArray(entries)) {
    return [client, ...entries];
  }

  if (typeof entries === 'object') {
    return Object.entries(entries).reduce((acc, [key, value]) => {
      acc[key] = [
        `${client}&name=${key}`,
        ...(Array.isArray(value) ? [...value] : [value]),
      ];

      return acc;
    }, {});
  }

  return entries;
}

let webpackConfig = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',
  entry: getEntry(),
  output: {
    path: resolve(config.output),
    publicPath: config.publicPath || '',
    filename: `${config.scripts.path}/[name].js`,
    chunkFilename: `${config.scripts.path}/chunks/[name].js`,
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: config.source,
        loader: require.resolve('./babel-loader'),
        options: {
          cacheDirectory: true,
          presets: [],
          babelrc: false,
        },
      },
    ],
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new FriendlyErrorsPlugin(),
    ...(isDev ? [new webpack.HotModuleReplacementPlugin()] : []),
  ],
  optimization: {
    minimize: isProduction && !(process.env.BRICKS_COMPRESS === 'false'),
  },
  performance: false,
  node: {
    fs: 'empty',
    process: false,
  },
};

if (typeof config.webpack === 'function') {
  webpackConfig = config.webpack({ webpackConfig, config, isDev });
}

module.exports = webpackConfig;
