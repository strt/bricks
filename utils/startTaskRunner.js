const gulp = require('gulp');
const chalk = require('chalk');
const prettyTime = require('pretty-hrtime');
const log = require('./log');
// const logEvents = require('gulp-cli/lib/versioned/^4.0.0/log/events');
require('../config/gulpfile');

// logEvents(gulp);

gulp.on('start', (event) => {
  log.gulp(`Starting ${chalk.cyan(event.name)}...`);
});

gulp.on('stop', (event) => {
  const time = prettyTime(event.duration);
  log.gulp(`Finished ${chalk.cyan(event.name)} after ${chalk.magenta(time)}`);
  // log.gulp(`Starting, ${chalk.cyan(event.name)}...`);
});

module.exports = function startTaskRunner() {
  gulp.task('default')();
};
