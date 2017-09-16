const path = require('path');
const execa = require('execa');
const errorHandler = require('./errorHandler');

module.exports = function runGulp() {
  execa(
    'npx',
    [
      'gulp',
      '--cwd', process.cwd(),
      '--gulpfile', path.join(__dirname, '../gulpfile.js'),
    ],
    { stdio: 'inherit' },
  )
    .catch(err => errorHandler); // eslint-disable-line no-unused-vars
};
