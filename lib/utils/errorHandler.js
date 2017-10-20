const log = require('./log.js');

module.exports = function errorHandler(err) {
  if (!err) return;
  const errorMessage = err.message || err;

  log.error('Failed to compile', errorMessage.toString());
  this.emit('end');
};
