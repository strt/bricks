const gulp = require('gulp');
const config = require('../lib/config');
const constants = require('../lib/constants');

module.exports = function files() {
  return gulp.src(constants.STATIC_GLOB)
    .pipe(gulp.dest(config.output));
};
