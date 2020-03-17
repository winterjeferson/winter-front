var gulp = require('gulp');

var wf_project = require('./wf_project.js');
var wf_util = require('./wf_util.js');
var wf_image = require('./wf_image.js');
var wf_js = require('./wf_js.js');
var wf_template = require('./wf_template.js');

gulp.task('deploy', gulp.series(
        'wf_css_minify',
        'wf_js_remove_code',
        'wf_js_minify',
        'wf_project_move_production',
        'image_imagemin',
        'template_minify',
        'beep'
));