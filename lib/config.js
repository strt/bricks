const deepmerge = require('deepmerge');
const readPkgUp = require('read-pkg-up');
const findUp = require('find-up');
const timestamp = require('./utils/timestamp');

const defaultConfig = {
  source: 'src',
  output: 'dist',
  images: {
    path: 'images',
  },
  icons: {
    path: 'icons',
  },
  styles: {
    path: 'styles',
    entries: ['./main.scss'],
  },
  scripts: {
    path: 'scripts',
    publicPath: '',
    entries: ['./main.js'],
  },
  serve: {
    notify: false,
    open: false,
    reloadOnRestart: true,
    logFileChanges: false,
    logPrefix: timestamp(),
    files: ['**/*.html', '**/*.twig'],
  },
};

function withDefaults(...configs) {
  return deepmerge.all(
    [
      defaultConfig,
      ...configs,
    ],
  { arrayMerge: (dest, src) => src },
  );
}

function loadConfig() {
  const pkgConfig = readPkgUp.sync().pkg.bricks || {};
  const userConfigPath = findUp.sync('bricks.config.js');
  let userConfig = {};

  if (userConfigPath) {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const userConfigModule = require(userConfigPath);
    userConfig = userConfigModule.default || userConfigModule;
  }

  return withDefaults(pkgConfig, userConfig);
}

const config = loadConfig();

module.exports = config;
