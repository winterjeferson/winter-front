var gulp = require('gulp');
var configuration = require('./configuration.js');
var del = require('del'); //npm install del --save-dev //https://www.npmjs.com/package/del





var fileOther = [
    configuration.branches + 'other/.htaccess',
    configuration.branches + 'other/*',
    configuration.branches + 'other/**',
    configuration.branches + 'other/**/*',
    configuration.branches + 'other/**/*.*'
];

var fileOtherPublic = [
    configuration.branchesPublic + '.htaccess',
    configuration.branchesPublic + '*.htaccess',
    configuration.branchesPublic + '*.txt'
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
            .pipe(gulp.dest(configuration.branchesPublic));
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