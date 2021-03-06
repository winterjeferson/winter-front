var gulp = require('gulp');

var wf_css = require('./wf-css.js');
var wf_font = require('./wf-font.js');
var wf_img = require('./wf-image.js');
var wf_js = require('./wf-js.js');
var wf_other = require('./wf-other.js');
var wf_template = require('./wf-template.js');



gulp.task('default', function () {
    gulp.watch(wf_css.wf_cssDefaultConcat, gulp.series('wf_css_style'))
            .on('change', function (evt) {
                console.log(evt);
            });

    gulp.watch(wf_css.wf_cssPluginConcat, gulp.series('wf_css_plugin'))
            .on('change', function (evt) {
                console.log(evt);
            });

    gulp.watch(wf_css.wf_cssPluginOtherConcat, gulp.series('wf_css_plugin_other'))
            .on('change', function (evt) {
                console.log(evt);
            });



    gulp.watch(wf_js.fileJs_wf_, gulp.series('wf_js_default'))
            .on('change', function (evt) {
                console.log(evt);
            });

    gulp.watch(wf_js.fileJs_wf_Plugin, gulp.series('wf_js_plugin'))
            .on('change', function (evt) {
                console.log(evt);
            });


    gulp.watch(wf_img.fileImg, gulp.series('wf_image'))
            .on('change', function (evt) {
                console.log(evt);
            });



    gulp.watch(wf_font.fileFont, gulp.series('wf_font'))
            .on('change', function (evt) {
                console.log(evt);
            });



    gulp.watch(wf_other.fileOther, gulp.series('wf_other'))
            .on('change', function (evt) {
                console.log(evt);
            });
            
            

    gulp.watch(wf_template.wf_fileTemplateWatch, gulp.series('wf_template'))
            .on('change', function (evt) {
                console.log(evt);
            });
});