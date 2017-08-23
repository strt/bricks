const gulp = require('gulp');
const tasks = require('./utils/getTasks');
const config = require('./config');

const isDev = process.env.NODE_ENV !== 'production';

const buildTasks = [
  tasks.static,
  tasks.images,
  tasks.icons,
  tasks.styles,
];

if (!isDev || config.scripts.publicPath === '') {
  buildTasks.push(tasks.scripts);
}

const seriesTasks = [
  tasks.clean,
  gulp.parallel(...buildTasks),
];

if (isDev) {
  seriesTasks.push(tasks.serve);
}

gulp.task('default', gulp.series(...seriesTasks));
