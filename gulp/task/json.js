var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render'); //npm install gulp-nunjucks-render --save-dev // https://zellwk.com/blog/nunjucks-with-gulp/
var rename = require("gulp-rename");//npm install gulp-rename --save-dev // https://www.npmjs.com/package/gulp-rename/
var htmlmin = require('gulp-htmlmin'); //npm install gulp-htmlmin --save-dev  //https://www.npmjs.com/package/gulp-htmlmin/
var configuration = require('./configuration.js');




var fileJson = [];
var arrLanguage = ['pt', 'en'];
var arrLanguageLength = arrLanguage.length;

for (var i = 0; i < arrLanguageLength; i++) {
    fileJson.push(configuration.branches + 'json/' + arrLanguage[i] + '/*.json');
}

gulp.task('json_include', function (callBack) {
    var temp = 0;

    function buildJsonInclude(i) {
        return gulp
                .src(configuration.branches + 'json/' + arrLanguage[i] + '/_' + arrLanguage[i] + '.json')
                .pipe(nunjucksRender({
                    path: [configuration.branches + 'json/' + arrLanguage[i] + '/']
                }))
                .pipe(rename(arrLanguage[i] + '.json'))
                .pipe(gulp.dest(configuration.branchesPublic + 'json/'))
    }

    for (var i = 0; i < arrLanguageLength; i++) {
        buildJsonInclude(i);
        temp++;

        if (temp === arrLanguageLength) {
            callBack();
        }
    }

});

gulp.task('json_minify', function (callBack) {
    var temp = 0;

    function buildJsonMinify(i) {
        return gulp
                .src(configuration.branchesPublic + 'json/' + arrLanguage[i] + '.json')
                .pipe(htmlmin({
                    collapseWhitespace: true,
                    quoteCharacter: "'"
                }))
                .pipe(gulp.dest(configuration.trunk + "json/"));
    }

    for (var i = 0; i < arrLanguageLength; i++) {
        buildJsonMinify(i);
        temp++;

        if (temp === arrLanguageLength) {
            callBack();
        }
    }
});

gulp.task('build_json', gulp.series(
        'json_include',
        'beep'
        ));



module.exports = {
    fileJson: fileJson
};