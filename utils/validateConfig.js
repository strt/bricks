const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const log = require('./log');

function validateFiles(files) {
  let currentFilePath;

  try {
    files.forEach(filePath => {
      currentFilePath = filePath;
      fs.accessSync(filePath, fs.F_OK);
    });

    return true;
  } catch (err) {
    const dirName = path.dirname(currentFilePath);
    const fileName = path.basename(currentFilePath);

    log.error(
      'Could not find a required file or directory.',
      `${chalk.red('  Name: ') + fileName}\n${chalk.red('  Searched in: ') +
        dirName}`,
    );

    return false;
  }
}

module.exports = function validateConfig(config) {
  const files = [
    config.source,
    ...config.styles.entries,
    ...(Array.isArray(config.scripts.entries)
      ? config.scripts.entries
      : Object.values(config.scripts.entries)),
  ];

  return validateFiles(files);
};
