var gulp = require("gulp");
var browserSync = require('browser-sync').create();
var ts = require("gulp-typescript");
var uglify = require('gulp-uglify');
const { src, dest } = require('gulp');
var tsProject = ts.createProject("tsconfig.json");

gulp.task('javascript', function () {
    return tsProject.src()
    .pipe(tsProject())
    .js.pipe(uglify('index.js')).pipe(dest("src"));

});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: "./src"
    });

    gulp.watch("src/index.html").on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('javascript', 'browser-sync'))
