var gulp = require('gulp');
var configuration = require('./configuration.js');
var del = require('del'); //npm install del --save-dev //https://www.npmjs.com/package/del





var fileFont = [
    configuration.branches + 'font/*',
    configuration.branches + 'font/**',
    configuration.branches + 'font/**/*',
    configuration.branches + 'font/**/*.*'
];

var fileFontPublic = [
    configuration.branchesPublic + 'font/*',
    configuration.branchesPublic + 'font/**',
    configuration.branchesPublic + 'font/**/*',
    configuration.branchesPublic + 'font/**/*.*'
];

function clean(path) {
    return del(path, {force: true}); // returns a promise
}

gulp.task('font_clean', function () {
    var files = [configuration.branchesPublic + 'font/**'];
    return clean(files);
});

gulp.task('font_move', function (done) {
    return gulp
            .src(configuration.branches + 'font/**/*.*')
            .pipe(gulp.dest(configuration.branchesPublic + "font/"));
    done();
});

gulp.task('build_font', gulp.series(
        'font_clean',
        'font_move',
        'beep'
        ));



module.exports = {
    fileFont: fileFont,
    fileFontPublic: fileFontPublic,
};