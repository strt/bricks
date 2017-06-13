const gulp = require('gulp');
const config = require('../config');

module.exports = function files() {
  const cfg = config.get();

  return gulp.src([
    `${cfg.source}/**`,
    `!${cfg.source}/${cfg.images.path}{,/**}`,
    `!${cfg.source}/${cfg.icons.path}{,/**}`,
    `!${cfg.source}/${cfg.styles.path}{,/**}`,
    `!${cfg.source}/${cfg.scripts.path}{,/**}`,
  ])
  .pipe(gulp.dest(cfg.output));
};
