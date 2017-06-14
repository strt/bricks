const gulp = require('gulp');
const config = require('../config');
const constants = require('../constants');

module.exports = function files() {
  return gulp.src(constants.STATIC_GLOB)
  .pipe(gulp.dest(config.output));
};
