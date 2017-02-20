var gulp = require('gulp'),
    livereload = require('gulp-livereload');

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(['Hudu_front/**/*.*', 'name_card/**/*.*', 'Hudu_operate/**/*.*'],function(file){
        livereload.changed(file.path);
    });
});