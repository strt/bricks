const gulp = require('gulp');
const chalk = require('chalk');
const prettyTime = require('pretty-hrtime');
const timestamp = require('./timestamp');
require('../config/gulpfile');

function log(message) {
  console.log(`[${timestamp()}] ${message}`);
}

gulp.on('start', (event) => {
  if (event.name === '<parallel>') return;
  log(`Starting ${chalk.cyan(event.name)}...`);
});

gulp.on('stop', (event) => {
  if (event.name === '<parallel>') return;
  const time = prettyTime(event.duration);
  log(`Finished ${chalk.cyan(event.name)} after ${chalk.magenta(time)}`);
});

gulp.on('error', (err) => {
  console.log(err);
});

module.exports = function startTaskRunner() {
  gulp.task('default')();
};
