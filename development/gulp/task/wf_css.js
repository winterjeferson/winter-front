var gulp = require('gulp');
var sass = require('gulp-sass');//npm install gulp-sass --save-dev // https://www.npmjs.com/package/gulp-sass/
var concat = require('gulp-concat');//npm install gulp-concat --save-dev //https://www.npmjs.com/package/gulp-concat/
var csso = require('gulp-csso');//npm install gulp-csso --save-dev //https://www.npmjs.com/package/gulp-csso/

var configuration = require('./configuration.js');
var wf_project = require('./wf_project.js');
var wf_util = require('./wf_util.js');


var wf_fileCssSass = [
    configuration.development + 'css/wf_sass/sass_variable.scss',
    configuration.development + 'css/wf_sass/sass_color.scss',
    configuration.development + 'css/wf_sass/sass.scss',
];

var wf_fileCssDefault = [
    configuration.development + 'css/wf_theme/*.scss'
];

var wf_fileCssPlugin = [
    configuration.development + 'css/wf_plugin/*.scss'
];

var wf_cssDefaultConcat = wf_fileCssSass.concat(wf_fileCssDefault);
var wf_cssPluginConcat = wf_fileCssSass.concat(wf_fileCssPlugin);
var wf_fileStyle = 'wf_theme';
var wf_filePlugin = 'wf_plugin';










gulp.task('wf_css_style_concat', function () {
    return gulp
        .src(wf_cssDefaultConcat)
        .pipe(concat(wf_fileStyle + '.scss'))
        .pipe(gulp.dest(configuration.development + 'css/'));
});

gulp.task('wf_css_style_sass', function () {
    return gulp
        .src(configuration.development + 'css/' + wf_fileStyle + '.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(configuration.homologation + 'css/'));
});

gulp.task('wf_css_style', gulp.series(
    'wf_css_style_concat',
    'wf_css_style_sass',
    'wf_beep'
));






gulp.task('wf_css_plugin_concat', function () {
    return gulp
        .src(wf_cssPluginConcat)
        .pipe(concat(wf_filePlugin + '.scss'))
        .pipe(gulp.dest(configuration.development + 'css/'));
});

gulp.task('wf_css_plugin_sass', function () {
    return gulp
        .src(configuration.development + 'css/' + wf_filePlugin + '.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(configuration.homologation + 'css/'));
});

gulp.task('wf_css_plugin', gulp.series(
    'wf_css_plugin_concat',
    'wf_css_plugin_sass',
    'wf_beep'
));


gulp.task('wf_css_minify', function () {
    return gulp
        .src(configuration.homologation + 'css/*.*')
        .pipe(csso())
        .pipe(gulp.dest(configuration.production + 'css/'));
});




module.exports = {
    wf_cssDefaultConcat: wf_cssDefaultConcat,
    wf_cssPluginConcat: wf_cssPluginConcat
};