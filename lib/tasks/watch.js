const gulp = require('gulp');
const config = require('../config');

module.exports = function watch(done) {
  const cfg = config.get();

  gulp.watch(`${cfg.source}/${cfg.styles.path}/**`, cfg.tasks.styles);
  gulp.watch(`${cfg.source}/${cfg.scripts.path}/**`, cfg.tasks.scripts);
  gulp.watch(`${cfg.source}/${cfg.icons.path}/**`, cfg.tasks.icons);
  gulp.watch(`${cfg.source}/${cfg.images.path}/**`, cfg.tasks.images);
  gulp.watch([
    `${cfg.source}/**`,
    `!${cfg.source}/${cfg.images.path}{,/**}`,
    `!${cfg.source}/${cfg.icons.path}{,/**}`,
    `!${cfg.source}/${cfg.styles.path}{,/**}`,
    `!${cfg.source}/${cfg.scripts.path}{,/**}`,
  ], cfg.tasks.files);

  done();
};
