var gulp = require('gulp');
var wf_util = require('gulp-util'); //npm install gulp-util --save-dev // https://www.npmjs.com/package/gulp-util



gulp.task('wf_beep', function (done) {
    wf_util.beep();
    done();
});