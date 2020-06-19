var gulp = require('gulp');
var del = require('del'); //npm install del --save-dev //https://www.npmjs.com/package/del

var configuration = require('./configuration.js');



gulp.task('wf_project_move_production', function () {
    gulp
        .src(configuration.homologation + '*.html')
        .pipe(gulp.dest(configuration.production));

    gulp
        .src(configuration.homologation + '.htaccess')
        .pipe(gulp.dest(configuration.production));

    return gulp
        .src(configuration.homologation + configuration.assets + '/font/**/*.*')
        .pipe(gulp.dest(configuration.production + configuration.assets + '/font/'));
});