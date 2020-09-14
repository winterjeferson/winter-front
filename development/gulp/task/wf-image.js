var gulp = require('gulp');
var imagemin = require('gulp-imagemin'); //npm install gulp-imagemin --save-dev //https://www.npmjs.com/package/gulp-imagemin/
var newer = require('gulp-newer'); //npm install gulp-newer --save-dev // https://www.npmjs.com/package/gulp-newer/
var del = require('del'); //npm install del --save-dev //https://www.npmjs.com/package/del

var configuration = require('./configuration.js');





var fileImg = [
    configuration.development + 'img/*',
    configuration.development + 'img/**',
    configuration.development + 'img/**/*',
    configuration.development + 'img/**/*.*'
];

var fileImgPublic = [
    configuration.homologation + 'img/*',
    configuration.homologation + 'img/**',
    configuration.homologation + 'img/**/*',
    configuration.homologation + 'img/**/*.*'
];


function clean(path) {
    return del(path, { force: true }); // returns a promise
}

gulp.task('wf_image_clean', function () {
    var files = [
        configuration.homologation + configuration.assets + 'img/!(dynamic)*'
    ];
    return clean(files);
});

gulp.task('wf_image_move', function (done) {
    return gulp
        .src(configuration.development + 'img/**/*.*')
        .pipe(gulp.dest(configuration.homologation + configuration.assets + "img/"));
    done();
});


// fix enoent problem: node node_modules/optipng-bin/lib/install.js
gulp.task('wf_image_imagemin', function () {
    return gulp
        .src(configuration.homologation + configuration.assets + 'img/**')
        .pipe(newer(configuration.production + configuration.assets + "img/"))
        .pipe(imagemin([
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest(configuration.production + configuration.assets + "img/"));
});

gulp.task('wf_image', gulp.series(
    'wf_image_clean',
    'wf_image_move',
    'wf_beep'
));



module.exports = {
    fileImg: fileImg,
    fileImgPublic: fileImgPublic,
};