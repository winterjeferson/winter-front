var gulp = require('gulp');
var configuration = require('./configuration.js');
var del = require('del'); //npm install del --save-dev //https://www.npmjs.com/package/del





var filePHP = [
    configuration.development + 'php/*',
    configuration.development + 'php/**',
    configuration.development + 'php/**/*',
    configuration.development + 'php/**/*.*'
];

var filePHPPublic = [
    configuration.homologation + 'php/*',
    configuration.homologation + 'php/**',
    configuration.homologation + 'php/**/*',
    configuration.homologation + 'php/**/*.*'
];


function clean(path) {
    return del(path, {force: true}); // returns a promise
}

gulp.task('php_clean', function () {
    var files = [configuration.homologation + 'php/**'];
    return clean(files);
});


gulp.task('php_move', function (done) {
    return gulp
            .src(configuration.development + 'php/**/*.*')
            .pipe(gulp.dest(configuration.homologation + "php/"));
    done();
});

gulp.task('build_php', gulp.series(
        'php_clean',
        'php_move',
        'beep'
        ));



module.exports = {
    filePHP: filePHP,
    filePHPPublic: filePHPPublic,
};