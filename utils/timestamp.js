const chalk = require('chalk');
const timestamp = require('time-stamp');

module.exports = function getTimestamp() {
  return chalk.grey(timestamp('HH:mm:ss'));
};
