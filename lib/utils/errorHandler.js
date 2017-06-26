const log = require('fancy-log');

module.exports = function errorHandler(err) {
  if (!err) return;

  log.error(err.toString());
  this.emit('end');
};
