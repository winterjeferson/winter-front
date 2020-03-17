var gulp = require('gulp');
var sass = require('gulp-sass');//npm install gulp-sass --save-dev // https://www.npmjs.com/package/gulp-sass/
var concat = require('gulp-concat');//npm install gulp-concat --save-dev //https://www.npmjs.com/package/gulp-concat/
var csso = require('gulp-csso');//npm install gulp-csso --save-dev //https://www.npmjs.com/package/gulp-csso/
var configuration = require('./wf_configuration.js');
var project = require('./wf_project.js');
var util = require('./wf_util.js');


var wf_fileCssSass = [
    configuration.development + 'css/plugin/sass_variable.scss',
    configuration.development + 'css/plugin/sass_color.scss',
    configuration.development + 'css/plugin/sass.scss',
];

var wf_fileCssDefault = [
    configuration.development + 'css/build/*.scss'
];

var wf_fileCssPlugin = [
    configuration.development + 'css/library/*.scss'
];

var wf_cssDefaultConcat = wf_fileCssSass.concat(wf_fileCssDefault);
var wf_cssPluginConcat = wf_fileCssSass.concat(wf_fileCssPlugin);
var wf_fileStyle = 'wf_style';
var wf_filePlugin = 'wf_plugin';










gulp.task('css_style_concat', function () {
    return gulp
        .src(wf_cssDefaultConcat)
        .pipe(concat(wf_fileStyle + '.scss'))
        .pipe(gulp.dest(configuration.development + 'css/'));
});

gulp.task('css_style_sass', function () {
    return gulp
        .src(configuration.development + 'css/' + wf_fileStyle + '.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(configuration.homologation + 'css/'));
});

gulp.task('build_css_default', gulp.series(
    'css_style_concat',
    'css_style_sass',
    'beep'
));






gulp.task('css_plugin_concat', function () {
    return gulp
        .src(wf_cssPluginConcat)
        .pipe(concat(wf_filePlugin + '.scss'))
        .pipe(gulp.dest(configuration.development + 'css/'));
});

gulp.task('css_plugin_sass', function () {
    return gulp
        .src(configuration.development + 'css/' + wf_filePlugin + '.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(configuration.homologation + 'css/'));
});

gulp.task('build_css_plugin', gulp.series(
    'css_plugin_concat',
    'css_plugin_sass',
    'beep'
));


gulp.task('css_minify', function () {
    return gulp
        .src(configuration.homologation + 'css/*.*')
        .pipe(csso())
        .pipe(gulp.dest(configuration.production + 'css/'));
});




module.exports = {
    wf_cssDefaultConcat: wf_cssDefaultConcat,
    wf_cssPluginConcat: wf_cssPluginConcat
};