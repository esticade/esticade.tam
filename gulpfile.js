var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('build', function() {
    gulp.src('./src/client.js')
        .pipe(browserify({
            insertGlobals : true,
            debug : false
        }))
        .pipe(gulp.dest('./public/static/js'))
});