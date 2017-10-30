const del = require('del');
const config = require('../lib/config');

module.exports = function clean() {
  return del([
    `${config.output}/**/*`,
  ]);
};
