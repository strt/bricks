const chalk = require('chalk');

function log(title, message) {
  let string = `\n${title}`;

  if (message) {
    string += `\n${message}`;
  }

  console.log(`${string}\n`);
}

function error(title, message = '') {
  log(`${chalk.bgRed.black(' ERROR ')} ${chalk.red(title)}`, message);
}

function warn(title, message) {
  log(`${chalk.bgYellow.black(' WARNING ')} ${chalk.yellow(title)}`, message);
}

function info(title, message) {
  log(`${chalk.bgBlue.black(' INFO ')} ${chalk.blue(title)}`, message);
}

module.exports = {
  error,
  warn,
  info,
};
