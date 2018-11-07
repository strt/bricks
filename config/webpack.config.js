const { resolve, join } = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const { loadPartialConfig, createConfigItem } = require('@babel/core');
const config = require('./config');

const isDev = process.env.NODE_ENV === 'development';
const babelPreset = createConfigItem(require('./babel-preset'), {
  type: 'preset',
});

function getBabelConfig(dir) {
  const babelConfig = {
    cacheDirectory: true,
    presets: [],
    babelrc: false,
  };

  const filename = join(dir, 'filename.js');
  const externalBabelConfig = loadPartialConfig({
    babelrc: true,
    filename,
  });

  if (externalBabelConfig && externalBabelConfig.babelrc) {
    babelConfig.babelrc = true;
  }

  if (!babelConfig.babelrc) {
    babelConfig.presets.push(babelPreset);
  }

  return babelConfig;
}

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
        test: /\.js$/,
        include: config.source,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: getBabelConfig(config.dir),
      },
    ],
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new FriendlyErrorsPlugin(),
    ...(isDev ? [new webpack.HotModuleReplacementPlugin()] : []),
  ],
  performance: {
    hints: false,
  },
  node: {
    fs: 'empty',
    process: false,
  },
};

if (typeof config.webpack === 'function') {
  webpackConfig = config.webpack(webpackConfig, isDev);
}

module.exports = webpackConfig;
