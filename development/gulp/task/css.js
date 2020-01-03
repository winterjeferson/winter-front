var gulp = require('gulp');
var sass = require('gulp-sass');//npm install gulp-sass --save-dev // https://www.npmjs.com/package/gulp-sass/
var concat = require('gulp-concat');//npm install gulp-concat --save-dev //https://www.npmjs.com/package/gulp-concat/
var csso = require('gulp-csso');//npm install gulp-csso --save-dev //https://www.npmjs.com/package/gulp-csso/

var configuration = require('./configuration.js');
var project = require('./project.js');
var util = require('./util.js');


var fileCssSass = [
    configuration.branches + 'css/plugin/sass_variable.scss',
    configuration.branches + 'css/plugin/sass_color.scss',
    configuration.branches + 'css/plugin/sass.scss',
];

var fileCssAdmin = [
    configuration.branches + 'css/admin/*.scss'
];

var fileCssDefault = [
    configuration.branches + 'css/build/*.scss'
];

var fileCssPlugin = [
    configuration.branches + 'css/library/*.scss'
];

var cssAdminConcat = fileCssSass.concat(fileCssAdmin);
var cssDefaultConcat = fileCssSass.concat(fileCssDefault);
var cssPluginConcat = fileCssSass.concat(fileCssPlugin);
var fileAdmin = 'admin';
var fileDefault = 'style';
var filePlugin = 'plugin';





gulp.task('css_admin_concat', function () {
    return gulp
            .src(cssAdminConcat)
            .pipe(concat(fileAdmin + '.scss'))
            .pipe(gulp.dest(configuration.branches + 'css/'));
});

gulp.task('css_admin_sass', function () {
    return gulp
            .src(configuration.branches + 'css/' + fileAdmin + '.scss')
            .pipe(sass.sync().on('error', sass.logError))
            .pipe(gulp.dest(configuration.branchesPublic + 'css/'));
});

gulp.task('build_css_admin', gulp.series(
        'css_admin_concat',
        'css_admin_sass',
        'beep'
        ));





gulp.task('css_default_concat', function () {
    return gulp
            .src(cssDefaultConcat)
            .pipe(concat(fileDefault + '.scss'))
            .pipe(gulp.dest(configuration.branches + 'css/'));
});

gulp.task('css_default_sass', function () {
    return gulp
            .src(configuration.branches + 'css/' + fileDefault + '.scss')
            .pipe(sass.sync().on('error', sass.logError))
            .pipe(gulp.dest(configuration.branchesPublic + 'css/'));
});

gulp.task('build_css_default', gulp.series(
        'css_default_concat',
        'css_default_sass',
        'beep'
        ));






gulp.task('css_plugin_concat', function () {
    return gulp
            .src(cssPluginConcat)
            .pipe(concat(filePlugin + '.scss'))
            .pipe(gulp.dest(configuration.branches + 'css/'));
});

gulp.task('css_plugin_sass', function () {
    return gulp
            .src(configuration.branches + 'css/' + filePlugin + '.scss')
            .pipe(sass.sync().on('error', sass.logError))
            .pipe(gulp.dest(configuration.branchesPublic + 'css/'));
});

gulp.task('build_css_plugin', gulp.series(
        'css_plugin_concat',
        'css_plugin_sass',
        'beep'
        ));


gulp.task('css_minify', function () {
    return gulp
            .src(configuration.branchesPublic + 'css/*.*')
            .pipe(csso())
            .pipe(gulp.dest(configuration.trunk + 'css/'));
});




module.exports = {
    cssAdminConcat: cssAdminConcat,
    cssDefaultConcat: cssDefaultConcat,
    cssPluginConcat: cssPluginConcat
};