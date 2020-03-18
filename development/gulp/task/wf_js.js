var gulp = require('gulp');
var concat = require('gulp-concat');//npm install gulp-concat --save-dev //https://www.npmjs.com/package/gulp-concat/
var uglify = require("gulp-uglifyes");//npm install gulp-uglifyes --save-dev //https://www.npmjs.com/package/gulp-uglifyes
var removeCode = require('gulp-remove-code');//npm install gulp-remove-code --save-dev https://www.npmjs.com/package/gulp-remove-code
var babel = require('gulp-babel'); //npm install --save-dev gulp-babel @babel/core @babel/preset-env //https://www.npmjs.com/package/gulp-babel

var wf_configuration = require('./wf_configuration.js');




var fileJs_wf_DefaultFinal = 'wf_theme.js';
var fileJs_wf_PluginFinal = 'wf_plugin.js';

var fileJs_wf_ = [
    wf_configuration.development + 'js/shared/**/*.*',
    wf_configuration.development + 'js/wf_theme/**/*.*',
    wf_configuration.development + 'js/wf_main.js'
];

var fileJs_wf_Final = [
    wf_configuration.homologation + 'js/' + fileJs_wf_DefaultFinal,
    wf_configuration.homologation + 'js/' + fileJs_wf_PluginFinal
];

var fileJs_wf_Plugin = [
    wf_configuration.development + 'js/shared/**/*.*',
    wf_configuration.development + 'js/wf_plugin/**/*.*'
];






gulp.task('wf_js_babel', function () {
    return gulp.src(fileJs_wf_Final)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest(wf_configuration.homologation + 'js/'));
});

gulp.task('wf_js_default_concat', function () {
    return gulp.src(fileJs_wf_)
        .pipe(concat(fileJs_wf_DefaultFinal))
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
    return gulp.src(fileJs_wf_Plugin)
        .pipe(concat(fileJs_wf_PluginFinal))
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
    fileJs_wf_: fileJs_wf_,
    fileJs_wf_Plugin: fileJs_wf_Plugin
};