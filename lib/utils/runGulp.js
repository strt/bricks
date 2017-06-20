const path = require('path');
const execa = require('execa');
const errorHandler = require('./errorHandler');

module.exports = function runGulp() {
  execa('node',
    [
      path.join(__dirname, '../../node_modules/.bin/gulp'),
      '--cwd', process.cwd(),
      '--gulpfile', path.join(__dirname, '../gulpfile.js'),
    ],
    { stdio: 'inherit' },
  )
  .catch(err => errorHandler); // eslint-disable-line no-unused-vars
};
