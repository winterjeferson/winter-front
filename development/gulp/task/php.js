var gulp = require('gulp');
var configuration = require('./configuration.js');
var del = require('del'); //npm install del --save-dev //https://www.npmjs.com/package/del





var filePHP = [
    configuration.branches + 'php/*',
    configuration.branches + 'php/**',
    configuration.branches + 'php/**/*',
    configuration.branches + 'php/**/*.*'
];

var filePHPPublic = [
    configuration.tags + 'php/*',
    configuration.tags + 'php/**',
    configuration.tags + 'php/**/*',
    configuration.tags + 'php/**/*.*'
];


function clean(path) {
    return del(path, {force: true}); // returns a promise
}

gulp.task('php_clean', function () {
    var files = [configuration.tags + 'php/**'];
    return clean(files);
});


gulp.task('php_move', function (done) {
    return gulp
            .src(configuration.branches + 'php/**/*.*')
            .pipe(gulp.dest(configuration.tags + "php/"));
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