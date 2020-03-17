var gulp = require('gulp');
var configuration = require('./wf_configuration.js');
var del = require('del'); //npm install del --save-dev //https://www.npmjs.com/package/del


gulp.task('project_move_production', function () {
    gulp
        .src(configuration.homologation + '*.html')
        .pipe(gulp.dest(configuration.production));

    gulp
        .src(configuration.homologation + '.htaccess')
        .pipe(gulp.dest(configuration.production));

    return gulp
        .src(configuration.homologation + '/font/**/*.*')
        .pipe(gulp.dest(configuration.production + '/font/'));
});