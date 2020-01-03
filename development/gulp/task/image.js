var gulp = require('gulp');
var imagemin = require('gulp-imagemin'); //npm install gulp-imagemin --save-dev //https://www.npmjs.com/package/gulp-imagemin/
var newer = require('gulp-newer'); //npm install gulp-newer --save-dev // https://www.npmjs.com/package/gulp-newer/
var configuration = require('./configuration.js');
var del = require('del'); //npm install del --save-dev //https://www.npmjs.com/package/del





var fileImg = [
    configuration.branches + 'img/*',
    configuration.branches + 'img/**',
    configuration.branches + 'img/**/*',
    configuration.branches + 'img/**/*.*'
];

var fileImgPublic = [
    configuration.branchesPublic + 'img/*',
    configuration.branchesPublic + 'img/**',
    configuration.branchesPublic + 'img/**/*',
    configuration.branchesPublic + 'img/**/*.*'
];


function clean(path) {
    return del(path, {force: true}); // returns a promise
}

gulp.task('image_clean', function () {
    var files = [configuration.branchesPublic + 'img/**'];
    return clean(files);
});

gulp.task('image_move', function (done) {
    return gulp
            .src(configuration.branches + 'img/**/*.*')
            .pipe(gulp.dest(configuration.branchesPublic + "img/"));
    done();
});

gulp.task('image_imagemin', function () {
    return gulp
            .src(fileImgPublic)
            .pipe(newer(configuration.trunk + "img/"))
            .pipe(imagemin())
            .pipe(gulp.dest(configuration.trunk + "img/"));
});

gulp.task('build_image', gulp.series(
        'image_clean',
        'image_move',
        'beep'
        ));



module.exports = {
    fileImg: fileImg,
    fileImgPublic: fileImgPublic,
};