var gulp = require('gulp');
var project = require('./project.js');
var util = require('./util.js');

var image = require('./image.js');
var project = require('./project.js');
var js = require('./js.js');
var json = require('./json.js');
var template = require('./template.js');

gulp.task('deploy', gulp.series(
        'css_minify',
        'js_remove_code',
        'js_minify',
        'json_minify',
        'project_move_trunk',
        'image_imagemin',
        'template_minify',
        'beep'
        ));