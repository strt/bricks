const chalk = require('chalk');

function error(title, message = '') {
  console.log(`\n${chalk.bgRed.black(' ERROR ')} ${chalk.red(title)}\n\n${message}`);
}

function warn(title, message) {
  console.log(`\n${chalk.bgYellow.black(' WARNING ')} ${chalk.yellow(title)}\n\n${message}`);
}

module.exports = { error, warn };
