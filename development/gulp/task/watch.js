var gulp = require('gulp');
var css = require('./css.js');
var font = require('./font.js');
var img = require('./image.js');
var js = require('./js.js');
var json = require('./json.js');
var other = require('./other.js');
var php = require('./php.js');
var template = require('./template.js');



gulp.task('default', function () {

    gulp.watch(css.cssAdminConcat, gulp.series('build_css_admin'))
            .on('change', function (evt) {
                console.log(evt);
            });

    gulp.watch(css.cssDefaultConcat, gulp.series('build_css_default'))
            .on('change', function (evt) {
                console.log(evt);
            });

    gulp.watch(css.cssPluginConcat, gulp.series('build_css_plugin'))
            .on('change', function (evt) {
                console.log(evt);
            });



    gulp.watch(js.fileJs, gulp.series('build_js_default', 'js_babel'))
            .on('change', function (evt) {
                console.log(evt);
            });

    gulp.watch(js.fileJsPlugin, gulp.series('build_js_plugin', 'js_babel'))
            .on('change', function (evt) {
                console.log(evt);
            });

    gulp.watch(js.fileJsAdmin, gulp.series('build_js_admin', 'js_babel'))
            .on('change', function (evt) {
                console.log(evt);
            });



    gulp.watch(img.fileImg, gulp.series('build_image'))
            .on('change', function (evt) {
                console.log(evt);
            });



    gulp.watch(font.fileFont, gulp.series('build_font'))
            .on('change', function (evt) {
                console.log(evt);
            });



    gulp.watch(other.fileOther, gulp.series('build_other'))
            .on('change', function (evt) {
                console.log(evt);
            });



    gulp.watch(php.filePHP, gulp.series('build_php'))
            .on('change', function (evt) {
                console.log(evt);
            });
            
            

    gulp.watch(template.fileTemplateWatch, gulp.series('build_template'))
            .on('change', function (evt) {
                console.log(evt);
            });



    gulp.watch(json.fileJson, gulp.series('build_json'))
            .on('change', function (evt) {
                console.log(evt);
            });
});