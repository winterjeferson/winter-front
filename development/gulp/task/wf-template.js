var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render'); //npm install gulp-nunjucks-render --save-dev // https://zellwk.com/blog/nunjucks-with-gulp/
var rename = require("gulp-rename");//npm install gulp-rename --save-dev // https://www.npmjs.com/package/gulp-rename/
var htmlmin = require('gulp-htmlmin'); //npm install gulp-htmlmin --save-dev  //https://www.npmjs.com/package/gulp-htmlmin/
var del = require('del'); //npm install del --save-dev //https://www.npmjs.com/package/del

var configuration = require('./configuration.js');




var wf_folderTemplate = configuration.development + 'template/';
var wf_fileTemplate = wf_folderTemplate + '*.html';
var wf_fileTemplateWatch = [
    wf_folderTemplate + '*.html',
    wf_folderTemplate + 'shared/*.html',
    wf_folderTemplate + 'content/*.html'
];


function clean(path) {
    return del(path, {force: true}); // returns a promise
}

gulp.task('wf_template_clean', function () {
    var files = [
        configuration.homologation + '*.html',
        configuration.homologation + 'admin/' + '*.html',
    ];
    return clean(files);
});

gulp.task('wf_template_include', function () {

    return gulp
            .src(wf_fileTemplate)
            .pipe(nunjucksRender({
                path: [wf_folderTemplate]
            }))
            .pipe(rename({extname: '.html'}))
            .pipe(gulp.dest(configuration.homologation));
});

gulp.task('wf_template_minify', function () {
    return gulp
            .src(configuration.homologation + '*.html')
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest(configuration.production));
});

gulp.task('wf_template', gulp.series(
        'wf_template_clean',
        'wf_template_include',
        'wf_beep'
        ));





module.exports = {
    wf_fileTemplate: wf_fileTemplate,
    wf_fileTemplateWatch: wf_fileTemplateWatch
};