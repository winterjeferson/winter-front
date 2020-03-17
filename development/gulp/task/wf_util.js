var gulp = require('gulp');
var util = require('gulp-util'); //npm install gulp-util --save-dev // https://www.npmjs.com/package/gulp-util



gulp.task('beep', function (done) {
    util.beep();
    done();
});