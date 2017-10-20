const chalk = require('chalk');

module.export = function error(title, message = '') {
  console.log(`\n${chalk.bgRed.black(' ERROR ')} ${chalk.red(title)}\n\n${message}`);
};

module.export = function warn(title, message) {
  console.log(`\n${chalk.bgYellow.black(' WARNING ')} ${chalk.red(title)}\n\n${message}`);
};
