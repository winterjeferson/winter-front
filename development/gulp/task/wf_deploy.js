var gulp = require('gulp');
var project = require('./wf_project.js');
var util = require('./wf_util.js');
var image = require('./wf_image.js');
var project = require('./wf_project.js');
var js = require('./wf_js.js');
var template = require('./wf_template.js');

gulp.task('deploy', gulp.series(
        'css_minify',
        'js_remove_code',
        'js_minify',
        'project_move_production',
        'image_imagemin',
        'template_minify',
        'beep'
        ));