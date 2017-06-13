const webpack = require('webpack');
const reload = require('browser-sync').reload;
const webpackConfig = require('../webpack.config');
const util = require('../util');

module.exports = function scripts(done) {
  const config = webpackConfig();

  webpack(config, (err) => {
    if (err) util.errorHandler(err);
    reload();
    done();
  });
};
