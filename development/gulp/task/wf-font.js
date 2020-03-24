var gulp = require('gulp');
var del = require('del'); //npm install del --save-dev //https://www.npmjs.com/package/del

var configuration = require('./configuration.js');





var fileFont = [
    configuration.development + 'font/*',
    configuration.development + 'font/**',
    configuration.development + 'font/**/*',
    configuration.development + 'font/**/*.*'
];

var fileFontPublic = [
    configuration.homologation + 'font/*',
    configuration.homologation + 'font/**',
    configuration.homologation + 'font/**/*',
    configuration.homologation + 'font/**/*.*'
];

function clean(path) {
    return del(path, {force: true}); // returns a promise
}

gulp.task('wf_font_clean', function () {
    var files = [configuration.homologation + 'font/**'];
    return clean(files);
});

gulp.task('wf_font_move', function (done) {
    return gulp
            .src(configuration.development + 'font/**/*.*')
            .pipe(gulp.dest(configuration.homologation + "font/"));
    done();
});

gulp.task('wf_font', gulp.series(
        'wf_font_clean',
        'wf_font_move',
        'wf_beep'
        ));



module.exports = {
    fileFont: fileFont,
    fileFontPublic: fileFontPublic,
};