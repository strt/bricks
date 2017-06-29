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
  browserslist: [
    'ie 11',
    'last 2 Edge versions',
    'last 2 Firefox versions',
    'last 2 Chrome versions',
    'last 2 Safari versions',
    'last 2 iOS versions',
    'last 2 ChromeAndroid versions',
  ],
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
  const pkg = readPkgUp.sync().pkg;
  const pkgConfig = pkg.bricks || {};
  const userConfigPath = findUp.sync('bricks.config.js');
  let userConfig = {};

  if (pkg.browserslist) {
    defaultConfig.browserslist = undefined;
  }

  if (userConfigPath) {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const userConfigModule = require(userConfigPath);
    userConfig = userConfigModule.default || userConfigModule;
  }

  return withDefaults(pkgConfig, userConfig);
}

module.exports = loadConfig();
