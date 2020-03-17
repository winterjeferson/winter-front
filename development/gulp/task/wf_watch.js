var gulp = require('gulp');

var wf_css = require('./wf_css.js');
var wf_font = require('./wf_font.js');
var wf_img = require('./wf_image.js');
var wf_js = require('./wf_js.js');
var wf_other = require('./wf_other.js');
var wf_template = require('./wf_template.js');



gulp.task('default', function () {
    gulp.watch(wf_css.wf_cssDefaultConcat, gulp.series('build_wf_css_style'))
            .on('change', function (evt) {
                console.log(evt);
            });

    gulp.watch(wf_css.wf_cssPluginConcat, gulp.series('build_wf_css_plugin'))
            .on('change', function (evt) {
                console.log(evt);
            });



    gulp.watch(wf_js.fileJs, gulp.series('build_wf_js_default', 'wf_js_babel'))
            .on('change', function (evt) {
                console.log(evt);
            });

    gulp.watch(wf_js.fileJsPlugin, gulp.series('build_wf_js_plugin', 'wf_js_babel'))
            .on('change', function (evt) {
                console.log(evt);
            });


    gulp.watch(wf_img.fileImg, gulp.series('build_image'))
            .on('change', function (evt) {
                console.log(evt);
            });



    gulp.watch(wf_font.fileFont, gulp.series('build_font'))
            .on('change', function (evt) {
                console.log(evt);
            });



    gulp.watch(wf_other.fileOther, gulp.series('build_other'))
            .on('change', function (evt) {
                console.log(evt);
            });
            
            

    gulp.watch(wf_template.fileTemplateWatch, gulp.series('build_template'))
            .on('change', function (evt) {
                console.log(evt);
            });
});