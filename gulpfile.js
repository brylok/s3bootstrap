//INCLUDES
//gulp include
var gulp = require('gulp');

//general gulp helpers
var del = require('del');

//html file manipulation
var fileinclude = require('gulp-file-include');
var minifyHTML = require('gulp-minify-html');

//sass manipulation
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var prefix = require('gulp-autoprefixer');

//js manipulation
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

//image manipulation
var svgmin = require('gulp-svgmin');
var imagemin = require('gulp-imagemin');


//browsersync
var browserSync = require('browser-sync');

//s3 deployment
var fs = require("fs");
var s3 = require("gulp-s3");



// SIMPLE TASKS
//include html partials and minify dist html
gulp.task('fileinclude', function() {
    gulp.src(['src/index.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('working'))
        .pipe(minifyHTML({conditionals: true,spare:true}))
        .pipe(gulp.dest('dist'));
});

//sass build
gulp.task('sass', function (){
    gulp.src(['src/scss/*.scss', '!src/scss/_variables.scss'])
        .pipe(sass({
            includePaths: ['src/scss'],
            outputStyle: 'expanded'
        }))
        .pipe(prefix(
            "last 1 version"
        ))
        .pipe(gulp.dest('working/assets/css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/assets/css'));
});

//js build and compress
gulp.task('jscompress', function() {
    //vendor js files
    gulp.src('src/js/vendor/*.js')
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('working/assets/js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'));
    //app js files
    gulp.src('src/js/*.js')
        .pipe(gulp.dest('working/assets/js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'));
});

//images and svg compress
gulp.task('imagemin', function() {
    gulp.src('src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('working/assets/images'))
        .pipe(gulp.dest('dist/assets/images'));
    gulp.src('src/images/svg/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('working/assets/images/svg'))
        .pipe(gulp.dest('dist/assets/images/svg'));
});


//copy humans and robots
gulp.task('rootfiles', function() {
    gulp.src('src/humans.txt')
        .pipe(gulp.dest('dist/'));
    gulp.src('src/robots.txt')
        .pipe(gulp.dest('dist/'));
});


//browsersync working
gulp.task('browser-sync', function() {
    browserSync.init(["assets/css/*.css", "assets/js/*.js", "*.html"], {
        server: {
            baseDir: "working/"
        }
    });
});


//upload to s3 and gzip
//set upload path below
gulp.task('upload-to-s3', [], function() {
    gulp.src('dist/**')
        .pipe(s3(JSON.parse(fs.readFileSync('aws.json')), {
            uploadPath: "/",
            headers: {
                'x-amz-acl': 'public-read',
                'Cache-Control': 'max-age=315360000, no-transform, public'
            }
        }));
});


// PRIMARY TASKS
// gulp work task (use while working)
gulp.task('work', ['fileinclude', 'sass', 'jscompress', 'imagemin', 'rootfiles', 'browser-sync'], function () {
    gulp.watch("src/partials/*", ['fileinclude']);
    gulp.watch("src/index.html", ['fileinclude']);
    gulp.watch("src/scss/*.scss", ['sass']);
    gulp.watch("src/scss/components/*.scss", ['sass']);
    gulp.watch("src/js/*", ['jscompress']);
    gulp.watch("src/js/vendor/*", ['jscompress']);
    gulp.watch("src/images/*", ['imagemin']);
});



// gulp build task (use when building for deployment)
gulp.task('build', ['fileinclude', 'sass', 'jscompress', 'imagemin', 'rootfiles'], function () {

});


// gulp build task (use when deploying)
gulp.task('deploy', ['build'], function () {
    gulp.start('upload-to-s3');
});


// alis gulp default to gulp work
gulp.task('default', function () {
    gulp.start('work');
});


