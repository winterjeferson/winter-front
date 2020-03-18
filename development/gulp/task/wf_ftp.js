var gulp = require('gulp');
var ftp = require('vinyl-ftp'); //npm install --save-dev vinyl-ftp //https://www.npmjs.com/package/vinyl-ftp
var util = require('gulp-util'); //npm install --save-dev gulp-util // https://www.npmjs.com/package/gulp-util

var configuration = require('./configuration.js');




var folderFtp = '/www/test/' + configuration.projectName + '/' + configuration.projectVersion + '/';
var ftpHost = '';
var ftpPort = '';
var ftpUser = '';
var ftpPassword = '';





gulp.task('wf_ftp', function () {
    var conn = ftp.create({
        host: ftpHost,
        port: ftpPort,
        user: ftpUser,
        password: ftpPassword,
        parallel: 10,
        log: util.log
    });

    var globs = [
        configuration.production + '**/*.*',
        configuration.production + '.htaccess'
    ];

    return gulp
            .src(globs, {buffer: true})
            .pipe(conn.newer(folderFtp))
            .pipe(conn.dest(folderFtp));
});