const gulp = require('gulp');
const webpack = require('webpack');
const webpackDevMiddlweare = require('webpack-dev-middleware');
const browserSync = require('browser-sync');
const webpackConfig = require('../webpack.config');
const config = require('../config');
const constants = require('../constants');
const tasks = require('../utils/getTasks');

module.exports = function serve(done) {
  const bundler = webpack(webpackConfig);
  const useMiddleware = !!config.scripts.publicPath;

  bundler.plugin('done', () => {
    browserSync.reload();
  });

  browserSync(Object.assign({
    middleware: useMiddleware && [
      webpackDevMiddlweare(bundler, {
        publicPath: webpackConfig.publicPath,
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
  }, config.serve));

  // TODO: Fix paths

  console.log(`${config.source}/${config.scripts.path}/**`);
  console.log(process.cwd());

  if (!useMiddleware) {
    gulp.watch(`${config.source}/${config.scripts.path}/**`, tasks.scripts);
  }

  gulp.watch('lib/**', tasks.styles);
  gulp.watch(`${config.source}/${config.icons.path}/**`, tasks.icons);
  gulp.watch(`${config.source}/${config.images.path}/**`, tasks.images);
  gulp.watch(constants.STATIC_GLOB, tasks.files);

  done();
};
