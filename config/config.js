const fs = require('fs');
const { resolve, join } = require('path');
const readPkgUp = require('read-pkg-up');
const findUp = require('find-up');
const timestamp = require('../utils/timestamp');
const isObject = require('../utils/isObject');
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
  files: config => [
    `${config.source}/**`,
    `!${config.source}/${config.images.path}{,/**}`,
    `!${config.source}/${config.icons.path}{,/**}`,
    `!${config.source}/${config.styles.path}{,/**}`,
    `!${config.source}/${config.scripts.path}{,/**}`,
  ],
  browserSync: {
    notify: false,
    open: false,
    reloadOnRestart: true,
    logFileChanges: false,
    logPrefix: timestamp(),
    files: ['**/*.html', '**/*.twig'],
  },
  browserslist: [
    'last 2 iOS major versions',
    'last 2 Safari major versions',
    'last 2 ChromeAndroid major versions',
    'last 2 Chrome major versions',
    'last 2 Edge major versions',
    'last 2 Firefox major versions',
    'IE 11',
    '> 5%',
  ],
  webpack: null,
};

function resolvePaths(prevConfig) {
  const config = Object.assign({}, prevConfig);
  const resolvePath = relativePath => resolve(prevConfig.dir, relativePath);

  config.source = resolvePath(config.source);
  config.output = resolvePath(config.output);

  config.styles.entries = config.styles.entries.map(i =>
    join(config.source, config.styles.path, i),
  );

  if (Array.isArray(config.scripts.entries)) {
    config.scripts.entries = config.scripts.entries.map(i =>
      join(config.source, config.scripts.path, i),
    );
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

function merge(base, config) {
  return Object.keys(config).reduce((acc, key) => {
    const value = isObject(base[key])
      ? { ...base[key], ...config[key] }
      : config[key];

    return {
      ...acc,
      [key]: value,
    };
  }, base);
}

function getConfig() {
  const cwd = fs.realpathSync(process.cwd());
  const { package: pkg } = readPkgUp.sync({ cwd });
  const configPath = findUp.sync('bricks.config.js', { cwd });
  let userConfig = {};

  if (configPath) {
    const userConfigModule = require(configPath); // eslint-disable-line global-require, import/no-dynamic-require
    userConfig = userConfigModule.default || userConfigModule;
  }

  if (pkg.browserslist) {
    delete defaultConfig.browserslist;
  }

  const config = resolvePaths({
    ...merge(defaultConfig, userConfig),
    dir: cwd,
  });

  if (!validateConfig(config)) {
    process.exit(0);
  }

  return config;
}

module.exports = getConfig();
