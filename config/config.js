const fs = require('fs');
const { resolve, join } = require('path');
const deepmerge = require('deepmerge');
const readPkgUp = require('read-pkg-up');
const findUp = require('find-up');
const timestamp = require('../utils/timestamp');
const validateConfig = require('../utils/validateConfig');

const defaultConfig = {
  source: 'src',
  output: 'dist',
  publicPath: null,
  images: {
    path: 'images',
  },
  icons: {
    path: 'icons',
  },
  styles: {
    path: 'styles',
    entries: ['./app.scss'],
    plugins: [],
  },
  scripts: {
    path: 'scripts',
    entries: {
      app: './app.js',
    },
  },
  files(config = this) {
    return [
      `${config.source}/**`,
      `!${config.source}/${config.images.path}{,/**}`,
      `!${config.source}/${config.icons.path}{,/**}`,
      `!${config.source}/${config.styles.path}{,/**}`,
      `!${config.source}/${config.scripts.path}{,/**}`,
    ];
  },
  browserSync: {
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
  webpack: null,
};

function resolvePaths(prevConfig) {
  const config = Object.assign({}, prevConfig);
  const resolvePath = relativePath => resolve(prevConfig.dir, relativePath);

  config.source = resolvePath(config.source);
  config.output = resolvePath(config.output);

  config.styles.entries = config.styles.entries.map(i =>
    join(config.source, config.styles.path, i));

  if (Array.isArray(config.scripts.entries)) {
    config.scripts.entries = config.scripts.entries.map(i =>
      join(config.source, config.scripts.path, i));
  } else {
    config.scripts.entries = Object.keys(config.scripts.entries).reduce(
      (acc, key) => {
        const entry = config.scripts.entries[key];
        acc[key] = join(config.source, config.scripts.path, entry);

        return acc;
      },
      {},
    );
  }

  return config;
}

function mergeConfigs(...configs) {
  return deepmerge.all([...configs], {
    arrayMerge: (dest, src) => src,
  });
}

function getConfig() {
  const dir = fs.realpathSync(process.cwd());
  const { pkg } = readPkgUp.sync();
  const configPath = findUp.sync('bricks.config.js');
  let userConfig = {};

  if (configPath) {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const userConfigModule = require(configPath);
    userConfig = userConfigModule.default || userConfigModule;
  }

  if (pkg.browserslist) {
    delete defaultConfig.browserslist;
  }

  const config = resolvePaths(Object.assign({}, mergeConfigs(defaultConfig, userConfig), { dir }));

  if (!validateConfig(config)) {
    process.exit(0);
  }

  return config;
}

module.exports = getConfig();
