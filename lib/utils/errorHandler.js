const log = require('fancy-log');

module.exports = (err) => {
  if (!err) return;

  log.error(err.toString());
  this.emit('end');
};
