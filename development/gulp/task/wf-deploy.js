var gulp = require('gulp');

var wf_project = require('./wf-project.js');
var wf_util = require('./wf-util.js');
var wf_image = require('./wf-image.js');
var wf_js = require('./wf-js.js');
var wf_template = require('./wf-template.js');

gulp.task('wf_deploy', gulp.series(
        'wf_css_minify',
        'wf_js_remove_code',
        'wf_js_minify',
        'wf_project_move_production',
        'wf_image_imagemin',
        'wf_template_minify',
        'wf_beep'
));