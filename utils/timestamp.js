const chalk = require('chalk');
const timestamp = require('time-stamp');

module.exports = () => chalk.grey(timestamp('HH:mm:ss'));
