var gulp = require('gulp');
var concat = require('gulp-concat');//npm install gulp-concat --save-dev //https://www.npmjs.com/package/gulp-concat/
var uglify = require("gulp-uglifyes");//npm install gulp-uglifyes --save-dev //https://www.npmjs.com/package/gulp-uglifyes
const removeCode = require('gulp-remove-code');
;//npm install gulp-remove-code --save-dev https://www.npmjs.com/package/gulp-remove-code
const babel = require('gulp-babel'); //npm install --save-dev gulp-babel @babel/core @babel/preset-env //https://www.npmjs.com/package/gulp-babel
var configuration = require('./configuration.js');




var fileJsAdminFinal = 'admin.js';
var fileJsDefaultFinal = 'script.js';
var fileJsPluginFinal = 'plugin.js';

var fileJsAdmin = [
    configuration.branches + 'js/admin/**/*.*',
];

var fileJs = [
    configuration.branches + 'js/build/**/*.*',
    configuration.branches + 'js/main.js'
];

var fileJsFinal = [
    configuration.branchesPublic + 'js/' + fileJsDefaultFinal,
    configuration.branchesPublic + 'js/' + fileJsPluginFinal
];

var fileJsPlugin = [
    configuration.branches + 'js/library/**/*.*',
    configuration.branches + 'js/plugin/**/*.*'
];






gulp.task('js_babel', function () {
    return gulp.src(fileJsFinal)
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(gulp.dest(configuration.branchesPublic + 'js/'));
});

gulp.task('js_default_concat', function () {
    return gulp.src(fileJs)
            .pipe(concat(fileJsDefaultFinal))
            .pipe(gulp.dest(configuration.branchesPublic + 'js/'));
});

gulp.task('js_remove_code', function () {
    return gulp.src(configuration.branchesPublic + 'js/*.js')
            .pipe(removeCode({production: true}))
            .pipe(removeCode({noDevFeatures: false, commentStart: '/*', commentEnd: '*/'}))
            .pipe(gulp.dest(configuration.trunk + 'js/'));
});

gulp.task('build_js_default', gulp.series(
        'js_default_concat',
        'beep'
        ));



gulp.task('js_plugin_concat', function () {
    return gulp.src(fileJsPlugin)
            .pipe(concat(fileJsPluginFinal))
            .pipe(gulp.dest(configuration.branchesPublic + 'js/'));
});

gulp.task('build_js_plugin', gulp.series(
        'js_plugin_concat',
        'beep'
        ));



gulp.task('js_admin_concat', function () {
    return gulp.src(fileJsAdmin)
            .pipe(concat(fileJsAdminFinal))
            .pipe(gulp.dest(configuration.branchesPublic + 'js/'));
});

gulp.task('build_js_admin', gulp.series(
        'js_admin_concat',
        'beep'
        ));



gulp.task('js_minify', function () {
    return gulp.src(configuration.branchesPublic + 'js/*.*')
            .pipe(uglify())
            .pipe(gulp.dest(configuration.trunk + 'js/'));
});




module.exports = {
    fileJs: fileJs,
    fileJsAdmin: fileJsAdmin,
    fileJsPlugin: fileJsPlugin
};