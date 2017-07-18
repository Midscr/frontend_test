const gulp = require('gulp');
const concatCss = require('gulp-concat-css');
const minifyCss = require('gulp-minify-css');
const autoprefixer = require('gulp-autoprefixer');
const livereload = require('gulp-livereload');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const include = require('gulp-include');
const pug = require('gulp-pug');

function error(e) {
    console.error(e)
}

// CSS
gulp.task('sass', function () {
    gulp.src('./src/css/import.sass')
        .pipe(sass().on('error', error))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(connect.reload());
});

// HTML
gulp.task('pug', function () {
    gulp.src('./src/html/*.pug')
        .pipe(pug().on('error', error))
        .pipe(gulp.dest('./dist/'))
        .pipe(connect.reload());
});

// JS
gulp.task('js', function () {
    gulp.src('./src/js/*.js')
        .pipe(include())
        .pipe(gulp.dest('./dist/js/'))
        .pipe(connect.reload());
});

// Connect
gulp.task('connect', function () {
    connect.server({
        root: ['dist', 'node_modules'],
        port: 8001,
        livereload: true
    });
});

// Watch
gulp.task('watch', function () {
    gulp.watch("./src/css/**/*.sass", ["sass"]);
    gulp.watch("./src/html/*.pug", ["pug"]);
    gulp.watch("./src/js/*.js", ["js"]);
});

// Build
gulp.task('default', ["pug", "sass", "js"]);

// Start
gulp.task('start', ["pug", "sass", "js", "connect", "watch"]);
