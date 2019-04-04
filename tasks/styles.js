const path = require('path');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const atImport = require('postcss-import');
const nano = require('cssnano');
const autoprefixer = require('autoprefixer');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const { stream } = require('browser-sync');
const config = require('../config');
const errorHandler = require('../utils/errorHandler');

const compress =
  process.env.NODE_ENV === 'development' ||
  !process.env.BRICKS_COMPRESS === false;

console.log(compress);

module.exports = function styles() {
  return gulp
    .src(config.styles.entries)
    .pipe(
      plumber({
        errorHandler,
      }),
    )
    .pipe(
      sourcemaps.init({
        loadMaps: true,
      }),
    )
    .pipe(
      sass({
        includePaths: path.join('node_modules'),
      }),
    )
    .pipe(
      postcss([
        atImport(),
        autoprefixer({
          browsers: config.browserslist,
        }),
        ...(compress ? [] : [nano()]),
        ...config.styles.plugins,
      ]),
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.join(config.output, config.styles.path)))
    .pipe(stream());
};
