const chalk = require('chalk');

module.exports = function errorHandler(err) {
  if (!err) return;

  const errorMessage = err.message || err;

  console.error(`\n${chalk.bgRed.black(' ERROR ')} ${chalk.red('Failed to compile')}\n\n${errorMessage.toString()}`);
  this.emit('end');
};
