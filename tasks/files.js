const gulp = require('gulp');
const config = require('../config');

module.exports = function files() {
  const src = config.getFilesGlob(config);
  return gulp.src(src).pipe(gulp.dest(config.output));
};
