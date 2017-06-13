const chalk = require('chalk');
const timestamp = require('time-stamp');

module.export = () => chalk.grey(timestamp('HH:mm:ss'));
