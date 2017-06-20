const gulp = require('gulp');
const tasks = require('./utils/getTasks');

const isDev = process.env.NODE_ENV !== 'production';
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
