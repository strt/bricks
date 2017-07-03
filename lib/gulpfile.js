const gulp = require('gulp');
const tasks = require('./utils/getTasks');

const isDev = process.env.NODE_ENV !== 'production';

const parallelTasks = [
  tasks.static,
  tasks.images,
  tasks.icons,
  tasks.styles,
];

if (!isDev) {
  parallelTasks.push(tasks.scripts);
}

const seriesTasks = [
  tasks.clean,
  gulp.parallel(...parallelTasks),
];

if (isDev) {
  seriesTasks.push(tasks.serve);
}

gulp.task('default', gulp.series(...seriesTasks));
