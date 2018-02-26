const path = require('path');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const imagemin = require('gulp-imagemin');
const config = require('../config');

module.exports = function images() {
  const isDev = process.env.NODE_ENV === 'development';
  const src = path.join(config.source, config.images.path, '**');
  const dest = path.join(config.output, config.images.path);

  return gulp
    .src(src)
    .pipe(gulpif(!isDev, imagemin()))
    .pipe(gulp.dest(dest));
};
