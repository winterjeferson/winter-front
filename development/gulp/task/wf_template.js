var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render'); //npm install gulp-nunjucks-render --save-dev // https://zellwk.com/blog/nunjucks-with-gulp/
var rename = require("gulp-rename");//npm install gulp-rename --save-dev // https://www.npmjs.com/package/gulp-rename/
var htmlmin = require('gulp-htmlmin'); //npm install gulp-htmlmin --save-dev  //https://www.npmjs.com/package/gulp-htmlmin/
var del = require('del'); //npm install del --save-dev //https://www.npmjs.com/package/del

var wf_configuration = require('./wf_configuration.js');




var folderTemplate = wf_configuration.development + 'template/';
var fileTemplate = folderTemplate + '*.html';
var fileTemplateAdmin = folderTemplate + 'admin/*.html';
var fileTemplateWatch = [
    folderTemplate + '*.html',
    folderTemplate + 'include/*.html',
    folderTemplate + 'content/*.html'
];


function clean(path) {
    return del(path, {force: true}); // returns a promise
}

gulp.task('template_clean', function () {
    var files = [
        wf_configuration.homologation + '*.html',
        wf_configuration.homologation + 'admin/' + '*.html',
    ];
    return clean(files);
});

gulp.task('template_include', function () {

    return gulp
            .src(fileTemplate)
            .pipe(nunjucksRender({
                path: [folderTemplate]
            }))
            .pipe(rename({extname: '.html'}))
            .pipe(gulp.dest(wf_configuration.homologation));
});

gulp.task('template_include_admin', function () {

    return gulp
            .src(fileTemplateAdmin)
            .pipe(nunjucksRender({
                path: [folderTemplate]
            }))
            .pipe(rename({extname: '.html'}))
            .pipe(gulp.dest(wf_configuration.homologation + 'admin/'));
});

gulp.task('template_minify', function () {
    return gulp
            .src(wf_configuration.homologation + '*.html')
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest(wf_configuration.production));
});

gulp.task('build_template', gulp.series(
        'template_clean',
        'template_include',
        'template_include_admin',
        'beep'
        ));





module.exports = {
    fileTemplate: fileTemplate,
    fileTemplateWatch: fileTemplateWatch
};