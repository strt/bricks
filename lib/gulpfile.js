const gulp = require('gulp');
const tasks = require('./utils/getTasks');
const isDev = require('./utils/isDev');

const args = [
  tasks.clean,
  gulp.parallel(
    tasks.static,
    tasks.images,
    tasks.icons,
    tasks.styles,
    tasks.scripts,
  ),
];

if (isDev) {
  args.push(tasks.serve);
}

gulp.task('default', gulp.series(...args));
