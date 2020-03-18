var gulp = require('gulp');
var del = require('del'); //npm install del --save-dev //https://www.npmjs.com/package/del

var wf_configuration = require('./wf_configuration.js');





var fileFont = [
    wf_configuration.development + 'font/*',
    wf_configuration.development + 'font/**',
    wf_configuration.development + 'font/**/*',
    wf_configuration.development + 'font/**/*.*'
];

var fileFontPublic = [
    wf_configuration.homologation + 'font/*',
    wf_configuration.homologation + 'font/**',
    wf_configuration.homologation + 'font/**/*',
    wf_configuration.homologation + 'font/**/*.*'
];

function clean(path) {
    return del(path, {force: true}); // returns a promise
}

gulp.task('wf_font_clean', function () {
    var files = [wf_configuration.homologation + 'font/**'];
    return clean(files);
});

gulp.task('wf_font_move', function (done) {
    return gulp
            .src(wf_configuration.development + 'font/**/*.*')
            .pipe(gulp.dest(wf_configuration.homologation + "font/"));
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