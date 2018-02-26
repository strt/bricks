const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const deepmerge = require('deepmerge');
const readPkgUp = require('read-pkg-up');
const findUp = require('find-up');
const log = require('../utils/log');
const defaultConfig = require('./defaultConfig');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

function resolveFiles(prevConfig) {
  const config = Object.assign({}, prevConfig);

  config.styles.entries = config.styles.entries.map(i =>
    resolveApp(path.join(config.source, config.styles.path, i)));

  return config;
}

function mergeConfigs(...configs) {
  return deepmerge.all([...configs], {
    arrayMerge: (dest, src) => src,
  });
}

function validateConfig(config) {
  const requiredFiles = [
    ...config.styles.entries,
    // ...config.scripts.entries.map(i => resolveApp(path.join(config.source, i))),
  ];

  console.log(requiredFiles);

  try {
    // TODO: Check that all required files exists
    // Check source directory
    // if (!fs.existsSync(sourceDir)) {
    //   throw new Error(`Directory "${
    //     config.source
    //   }" was not found in "${process.cwd()}". Make sure your "source" property points to a directory.`);
    // }
    // // Check styles directory
    // if (!fs.existsSync(path.join(sourceDir, config.styles.path))) {
    //   throw new Error(`Directory "${
    //     config.styles.path
    //   }" was not found in "${sourceDir}". Make sure your "styles.path" property points to a directory.`);
    // }
    // // Check scripts directory
    // if (!fs.existsSync(path.join(sourceDir, config.scripts.path))) {
    //   throw new Error(`Directory "${
    //     config.scripts.path
    //   }" was not found in "${sourceDir}". Make sure your "scripts.path" property points to a directory.`);
    // }
    // TODO: Check all entries
  } catch (error) {
    const msg = chalk`${
      error.message
    }\n\nDocumentation: {blue https://github.com/strt/bricks#configuration}`;
    log.error('Invalid configuration object', msg);
    process.exit(1);
  }

  return config;
}

function loadConfig() {
  const { pkg } = readPkgUp.sync();
  const userConfigPath = findUp.sync('bricks.config.js');
  let userConfig = {};

  if (userConfigPath) {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const userConfigModule = require(userConfigPath);
    userConfig = userConfigModule.default || userConfigModule;
  }

  if (pkg.browserslist && !userConfig.browserslist) {
    userConfig.browserslist = pkg.browserslist;
  }

  const config = resolveFiles(mergeConfigs(defaultConfig, userConfig));

  validateConfig(config);

  return config;
}

module.exports = loadConfig();
