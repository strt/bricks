const path = require('path');
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const stream = require('browser-sync').stream;
const config = require('../config');
const util = require('../util');

module.exports = function styles() {
  const cfg = config.get();
  const cwd = path.join(cfg.source, cfg.styles.path);
  const dest = path.join(cfg.output, cfg.styles.path);

  return gulp.src(cfg.styles.entries, { cwd })
    .pipe(plumber({
      errorHandler: util.errorHandler,
    }))
    .pipe(sourcemaps.init({
      loadMaps: true,
    }))
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: path.join('node_modules'),
    }))
    .pipe(autoprefixer({
      browsers: cfg.browsers,
      cascade: false,
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dest))
    .pipe(stream({ match: '**/*.css' }));
};
