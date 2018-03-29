const path = require('path');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const { stream } = require('browser-sync');
const config = require('../config');
const errorHandler = require('../utils/errorHandler');

module.exports = function styles() {
  return gulp
    .src(config.styles.entries)
    .pipe(plumber({
      errorHandler,
    }))
    .pipe(sourcemaps.init({
      loadMaps: true,
    }))
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: path.join('node_modules'),
    }))
    .pipe(postcss([
      autoprefixer({
        browsers: config.browserslist,
      }),
      ...config.styles.plugins,
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.join(config.output, config.styles.path)))
    .pipe(stream());
};
