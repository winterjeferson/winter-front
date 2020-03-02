var gulp = require('gulp');
var configuration = require('./configuration.js');
var del = require('del'); //npm install del --save-dev //https://www.npmjs.com/package/del





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

gulp.task('other_clean', function () {
    return clean(fileOtherPublic);
});

gulp.task('other_move', function (done) {
    return gulp
            .src(fileOther)
            .pipe(gulp.dest(configuration.homologation));
    done();
});

gulp.task('build_other', gulp.series(
        'other_clean',
        'other_move',
        'beep'
        ));



module.exports = {
    fileOther: fileOther,
    fileOtherPublic: fileOtherPublic,
};