const gulp = require('gulp');
const webpack = require('webpack');
const webpackDevMiddlweare = require('webpack-dev-middleware');
const compress = require('compression');
const browserSync = require('browser-sync');
const config = require('../config');
const webpackConfig = require('../config/webpack.config');
const constants = require('../config/constants');

module.exports = function serve(done) {
  const tasks = require('../utils/getTasks'); // eslint-disable-line global-require
  const bundler = webpack(webpackConfig);
  const useWebpackMiddleware = config.scripts.publicPath !== '';

  bundler.plugin('done', () => {
    browserSync.reload();
  });

  const middleware = [compress()];

  if (useWebpackMiddleware) {
    middleware.push(webpackDevMiddlweare(bundler, {
      publicPath: webpackConfig.output.publicPath,
      quiet: true,
    }));
  }

  browserSync(Object.assign({ middleware }, config.serve));

  if (!useWebpackMiddleware) {
    gulp.watch(`${config.source}/${config.scripts.path}/**`, tasks.scripts);
  }

  gulp.watch(`${config.source}/${config.styles.path}/**`, tasks.styles);
  gulp.watch(`${config.source}/${config.icons.path}/**`, tasks.icons);
  gulp.watch(`${config.source}/${config.images.path}/**`, tasks.images);
  gulp.watch(constants.STATIC_GLOB, tasks.static);

  done();
};
