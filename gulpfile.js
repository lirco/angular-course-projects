var gulp = require('gulp');
var concat = require('gulp-concat');


gulp.task('build', function () {
  gulp.src('src/**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', function () {
  gulp.watch('src/**/*.js', ['build']);
});