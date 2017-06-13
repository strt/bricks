const del = require('del');
const config = require('../config');

module.exports = function clean() {
  const cfg = config.get();

  return del([
    `${cfg.output}/**/*`,
  ]);
};
