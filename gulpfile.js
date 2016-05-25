var gulp = require('gulp');
var connect = require('gulp-connect');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var path = require('path');
var rename = require('gulp-rename');

paths = {
	root: './app',

	src:{
        root: 'app/src/',
        index: 'app/src/index.html',
        styles: 'app/src/styles/**/*.less',
        vendor_styles: 'app/vendor/bootstrap-3.3.6/less/bootstrap.less',
        scripts: [
          'app/src/js/app.js'
          ],
        vendor_js: 'app/vendor/angular/angular.js'
	},

    dist: {
        root: 'app/dist/',
        styles: 'app/dist/css/',
        scripts: 'app/dist/js/'
    }
};

gulp.task('connect', function() {
  connect.server({
    root: [paths.root, paths.dist.root],
    livereload: false
  });
});

gulp.task('html', function(){
  return gulp.src(paths.src.index)
  .pipe(gulp.dest(paths.dist.root));
});

gulp.task('less-vendors', function () {
  return gulp.src(paths.src.vendor_styles)
	.pipe(sourcemaps.init())
    .pipe(less({compress: true}).on('error', function(err) {
            gutil.log(err);
            this.emit('end');
        }))
    .pipe(rename('vendor.css'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(paths.dist.styles));
});

gulp.task('less', function () {
  return gulp.src(paths.src.styles)
	.pipe(sourcemaps.init())
    .pipe(less({compress: true}).on('error', function(err) {
            gutil.log(err);
            this.emit('end');
        }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(paths.dist.styles));
});

gulp.task('styles', ['less','less-vendors']);

gulp.task('watch', function () {
  gulp.watch([paths.src.index], ['html']);
  gulp.watch([paths.src.styles], ['less']);
  gulp.watch([paths.src.vendor_styles], ['less-vendors']);
  gulp.watch([paths.src.scripts], ['compress:app-js']);
});

gulp.task('compress:app-js', function() {
  return gulp.src(paths.src.scripts)
    //.pipe(uglify())
    .pipe(gulp.dest(paths.dist.scripts));
});

gulp.task('compress:vendor-js', function() {
  return gulp.src(paths.src.vendor_js)
    .pipe(uglify())
    .pipe(rename('vendor.js'))
    .pipe(gulp.dest(paths.dist.scripts));
});

gulp.task('compress:js', ['compress:app-js','compress:vendor-js']);

gulp.task('build', ['html','styles','compress:js']);

gulp.task('default', ['build','connect']);