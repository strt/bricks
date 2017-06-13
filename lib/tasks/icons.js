const path = require('path');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sprite = require('gulp-svg-sprite');
const util = require('../util');
const config = require('../config');

module.exports = function icons() {
  const cfg = config.get();
  const src = path.join(cfg.source, cfg.icons.path, '**/**.svg');
  const dest = path.join(cfg.output, cfg.icons.path);

  return gulp.src(src)
    .pipe(plumber({
      errorHandler: util.errorHandler,
    }))
    .pipe(sprite({
      mode: {
        symbol: {
          dest: '',
          render: false,
          sprite: 'sprite.svg',
        },
      },
    }))
    .pipe(gulp.dest(dest));
};
