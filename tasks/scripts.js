const webpack = require('webpack');
const { reload } = require('browser-sync');
const webpackConfig = require('../config/webpack.config');
const errorHandler = require('../utils/errorHandler');

module.exports = function scripts(done) {
  webpack(webpackConfig, (err) => {
    if (err) errorHandler(err);
    reload();
    done();
  });
};
