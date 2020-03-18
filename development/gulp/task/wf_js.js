var gulp = require('gulp');
var concat = require('gulp-concat');//npm install gulp-concat --save-dev //https://www.npmjs.com/package/gulp-concat/
var uglify = require("gulp-uglifyes");//npm install gulp-uglifyes --save-dev //https://www.npmjs.com/package/gulp-uglifyes
var removeCode = require('gulp-remove-code');//npm install gulp-remove-code --save-dev https://www.npmjs.com/package/gulp-remove-code
var babel = require('gulp-babel'); //npm install --save-dev gulp-babel @babel/core @babel/preset-env //https://www.npmjs.com/package/gulp-babel

var wf_configuration = require('./wf_configuration.js');




var fileJsDefaultFinal = 'wf_theme.js';
var fileJsPluginFinal = 'wf_plugin.js';

var fileJs = [
    wf_configuration.development + 'js/wf_theme/**/*.*',
    wf_configuration.development + 'js/wf_main.js'
];

var fileJsFinal = [
    wf_configuration.homologation + 'js/' + fileJsDefaultFinal,
    wf_configuration.homologation + 'js/' + fileJsPluginFinal
];

var fileJsPlugin = [
    wf_configuration.development + 'js/wf_plugin/**/*.*'
];






gulp.task('wf_js_babel', function () {
    return gulp.src(fileJsFinal)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest(wf_configuration.homologation + 'js/'));
});

gulp.task('wf_js_default_concat', function () {
    return gulp.src(fileJs)
        .pipe(concat(fileJsDefaultFinal))
        .pipe(gulp.dest(wf_configuration.homologation + 'js/'));
});

gulp.task('wf_js_remove_code', function () {
    return gulp.src(wf_configuration.homologation + 'js/*.js')
        .pipe(removeCode({ production: true }))
        .pipe(removeCode({ noDevFeatures: false, commentStart: '/*', commentEnd: '*/' }))
        .pipe(gulp.dest(wf_configuration.production + 'js/'));
});

gulp.task('wf_js_default', gulp.series(
    'wf_js_default_concat',
    'wf_beep'
));



gulp.task('wf_js_plugin_concat', function () {
    return gulp.src(fileJsPlugin)
        .pipe(concat(fileJsPluginFinal))
        .pipe(gulp.dest(wf_configuration.homologation + 'js/'));
});

gulp.task('wf_js_plugin', gulp.series(
    'wf_js_plugin_concat',
    'wf_beep'
));



gulp.task('wf_js_minify', function () {
    return gulp.src(wf_configuration.homologation + 'js/*.*')
        .pipe(uglify())
        .pipe(gulp.dest(wf_configuration.production + 'js/'));
});




module.exports = {
    fileJs: fileJs,
    fileJsPlugin: fileJsPlugin
};