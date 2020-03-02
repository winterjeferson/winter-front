var gulp = require('gulp');
var configuration = require('./configuration.js');
var del = require('del'); //npm install del --save-dev //https://www.npmjs.com/package/del


gulp.task('project_move_production', function () {
    gulp
        .src(configuration.homologation + '*.php')
        .pipe(gulp.dest(configuration.production));

    gulp
        .src(configuration.homologation + '/php/**/*.*')
        .pipe(gulp.dest(configuration.production + '/php/'));

    gulp
        .src(configuration.homologation + '.htaccess')
        .pipe(gulp.dest(configuration.production));

    return gulp
        .src(configuration.homologation + '/font/**/*.*')
        .pipe(gulp.dest(configuration.production + '/font/'));
});