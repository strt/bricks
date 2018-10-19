const path = require('path');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sprite = require('gulp-svg-sprite');
const errorHandler = require('../utils/errorHandler');
const config = require('../config');

module.exports = function icons() {
  const src = path.join(config.source, config.icons.path, '**/**.svg');
  const dest = path.join(config.output, config.icons.path);

  return gulp
    .src(src)
    .pipe(
      plumber({
        errorHandler,
      }),
    )
    .pipe(
      sprite({
        mode: {
          symbol: {
            dest: '',
            render: false,
            sprite: 'sprite.svg',
          },
        },
      }),
    )
    .pipe(gulp.dest(dest));
};
