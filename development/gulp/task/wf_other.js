var gulp = require('gulp');
var del = require('del'); //npm install del --save-dev //https://www.npmjs.com/package/del

var configuration = require('./configuration.js');





var fileOther = [
    configuration.development + 'other/.htaccess',
    configuration.development + 'other/*',
    configuration.development + 'other/**',
    configuration.development + 'other/**/*',
    configuration.development + 'other/**/*.*'
];

var fileOtherPublic = [
    configuration.homologation + '.htaccess',
    configuration.homologation + '*.htaccess',
    configuration.homologation + '*.txt'
];


function clean(path) {
    return del(path, {force: true}); // returns a promise
}

gulp.task('wf_other_clean', function () {
    return clean(fileOtherPublic);
});

gulp.task('wf_other_move', function (done) {
    return gulp
            .src(fileOther)
            .pipe(gulp.dest(configuration.homologation));
    done();
});

gulp.task('wf_other', gulp.series(
        'wf_other_clean',
        'wf_other_move',
        'wf_beep'
        ));



module.exports = {
    fileOther: fileOther,
    fileOtherPublic: fileOtherPublic,
};