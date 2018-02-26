const path = require('path');
const gulp = require('gulp');
const size = require('gulp-size');
const config = require('../config');

module.exports = function sizes() {
  const src = [path.join(config.output, '**/**'), '!**/*.map', '!**/images/**'];

  return gulp.src(src).pipe(size({
    gzip: true,
    showFiles: true,
    showTotal: false,
  }));
};
