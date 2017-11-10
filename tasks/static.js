const gulp = require('gulp');
const config = require('../config');
const constants = require('../config/constants');

module.exports = function files() {
  return gulp.src(constants.STATIC_GLOB)
    .pipe(gulp.dest(config.output));
};
