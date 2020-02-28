var gulp = require('gulp');
var configuration = require('./configuration.js');
var del = require('del'); //npm install del --save-dev //https://www.npmjs.com/package/del


gulp.task('project_move_trunk', function () {
    gulp
        .src(configuration.tags + '*.php')
        .pipe(gulp.dest(configuration.trunk));

    gulp
        .src(configuration.tags + '/php/**/*.*')
        .pipe(gulp.dest(configuration.trunk + '/php/'));

    gulp
        .src(configuration.tags + '.htaccess')
        .pipe(gulp.dest(configuration.trunk));

    return gulp
        .src(configuration.tags + '/font/**/*.*')
        .pipe(gulp.dest(configuration.trunk + '/font/'));
});