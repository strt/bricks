const gulp = require('gulp');
const webpack = require('webpack');
const compress = require('compression');
const browserSync = require('browser-sync');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../config/webpack.config');
const config = require('../config');

module.exports = function serve(done) {
  const tasks = require('../utils/getTasks'); // eslint-disable-line global-require
  const compiler = webpack(webpackConfig);
  const middleware = [compress()];

  if (config.publicPath) {
    middleware.push(
      webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        logLevel: 'silent',
        noInfo: true,
      }),
      webpackHotMiddleware(compiler, {
        log: false,
      }),
    );
  } else {
    compiler.hooks.done.tap({ name: 'BrowserSync' }, () => {
      browserSync.reload();
    });

    gulp.watch(`${config.source}/${config.scripts.path}/**`, tasks.scripts);
  }

  gulp.watch(`${config.source}/${config.styles.path}/**`, tasks.styles);
  gulp.watch(`${config.source}/${config.icons.path}/**`, tasks.icons);
  gulp.watch(`${config.source}/${config.images.path}/**`, tasks.images);
  gulp.watch(config.files(config), tasks.static);

  browserSync({ ...config.browserSync, middleware });

  done();
};
