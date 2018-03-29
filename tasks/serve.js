const gulp = require('gulp');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const compress = require('compression');
const browserSync = require('browser-sync');
const config = require('../config');
const webpackConfig = require('../config/webpack.config');

module.exports = function serve(done) {
  const tasks = require('../utils/getTasks'); // eslint-disable-line global-require

  const compiler = webpack(webpackConfig);
  const useWebpackMiddleware = config.publicPath;

  compiler.plugin('done', () => {
    browserSync.reload();
  });

  const middleware = [compress()];

  if (useWebpackMiddleware) {
    middleware.push(
      webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        logLevel: 'silent',
        noInfo: true,
      }),
      webpackHotMiddleware(compiler, { log: false }),
    );
  }

  browserSync({ ...config.browserSync, middleware });

  if (!useWebpackMiddleware) {
    gulp.watch(`${config.source}/${config.scripts.path}/**`, tasks.scripts);
  }

  gulp.watch(`${config.source}/${config.styles.path}/**`, tasks.styles);
  gulp.watch(`${config.source}/${config.icons.path}/**`, tasks.icons);
  gulp.watch(`${config.source}/${config.images.path}/**`, tasks.images);
  gulp.watch(config.files(config), tasks.static);

  done();
};
