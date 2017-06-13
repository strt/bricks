const gulp = require('gulp');
const webpack = require('webpack');
const webpackDevMiddlweare = require('webpack-dev-middleware');
const browserSync = require('browser-sync');
const webpackConfig = require('../webpack.config');
const config = require('../config');

module.exports = function serve(done) {
  const cfg = config.get();
  const bundler = webpack(webpackConfig());
  const useMiddleware = cfg.scripts.publicPath !== '';

  bundler.plugin('done', () => {
    browserSync.reload();
  });

  browserSync(Object.assign({
    middleware: useMiddleware && [
      webpackDevMiddlweare(bundler, {
        publicPath: cfg.scripts.publicPath,
        quiet: true,
        stats: {
          colors: true,
          chunks: false,
          modules: false,
          hash: false,
          version: false,
          timings: false,
        },
      }),
    ],
  }, cfg.serve));

  if (!useMiddleware) {
    gulp.watch(`${cfg.source}/${cfg.scripts.path}/**`, cfg.tasks.scripts);
  }

  gulp.watch(`${cfg.source}/${cfg.styles.path}/**`, cfg.tasks.styles);
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
