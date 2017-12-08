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
  const cwd = path.join(config.source, config.styles.path);
  const dest = path.join(config.output, config.styles.path);

  return gulp.src(config.styles.entries, { cwd })
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
      ...config.styles.postcssPlugins,
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dest))
    .pipe(stream());
};