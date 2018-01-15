const chalk = require('chalk');
const timestamp = require('./timestamp');

function log(title, message) {
  let string = `\n${title}`;

  if (message) {
    string += `\n\n${message}`;
  }

  console.log(string);
}

function error(title, message = '') {
  log(`${chalk.bgRed.black(' ERROR ')} ${chalk.red(title)}`, message);
}

function warn(title, message) {
  console.log(`\n${chalk.bgYellow.black(' WARNING ')} ${chalk.yellow(title)}\n\n${message}`);
}

function gulp(message) {
  console.log(`[${timestamp()}] ${message}`);
}

module.exports = { error, warn, gulp };
