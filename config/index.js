const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const deepmerge = require('deepmerge');
const readPkgUp = require('read-pkg-up');
const findUp = require('find-up');
const timestamp = require('../utils/timestamp');
const log = require('../utils/log');

const baseConfig = {
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
    postcssPlugins: [],
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
  return deepmerge.all([baseConfig, ...configs], {
    arrayMerge: (dest, src) => src,
  });
}

function withValidation(config) {
  const cwd = process.cwd();

  try {
    const sourceDir = path.join(cwd, config.source);

    // Check source directory
    if (!fs.existsSync(sourceDir)) {
      throw new Error(`Directory "${
        config.source
      }" was not found in "${process.cwd()}". Make sure your "source" property points to a directory.`);
    }

    // Check styles directory
    if (!fs.existsSync(path.join(sourceDir, config.styles.path))) {
      throw new Error(`Directory "${
        config.styles.path
      }" was not found in "${sourceDir}". Make sure your "styles.path" property points to a directory.`);
    }

    // Check scripts directory
    if (!fs.existsSync(path.join(sourceDir, config.scripts.path))) {
      throw new Error(`Directory "${
        config.scripts.path
      }" was not found in "${sourceDir}". Make sure your "scripts.path" property points to a directory.`);
    }

    // TODO: Check all entries
  } catch (error) {
    const msg = chalk`${
      error.message
    }\n\nDocumentation available here: {blue https://github.com/strt/bricks#configuration}`;
    log.error('Invalid configuration object', msg);
    process.exit(1);
  }

  return config;
}

function loadConfig() {
  const { pkg } = readPkgUp.sync();
  const pkgConfig = pkg.bricks || {};
  const userConfigPath = findUp.sync('bricks.config.js');
  let userConfig = {};

  if (pkg.browserslist) {
    baseConfig.browserslist = undefined;
  }

  if (userConfigPath) {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const userConfigModule = require(userConfigPath);
    userConfig = userConfigModule.default || userConfigModule;
  }

  return withValidation(withDefaults(pkgConfig, userConfig));
}

module.exports = loadConfig();
