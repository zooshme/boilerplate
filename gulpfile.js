var gulp = require('gulp');
var jade = require('gulp-jade');
var connect = require('gulp-connect');
var sass = require('gulp-ruby-sass');
var changed = require('gulp-changed');

gulp.task('connect', function() {
	connect.server({
		root: './public',
		livereload: true,
		port: 4141
	});
});

gulp.task('sass', function() {
	gulp.src('./public/sass/styles.scss')
		.pipe(sass({
			sourcemapPath: '../sass',
			sourcemap: true,
		}))
		.pipe(gulp.dest('./public/css'))
		.pipe(connect.reload());
});

gulp.task('jade', function() {
	gulp.src(['./compile/jade/**/*.jade', '!./compile/jade/partials/*.jade'])
		.pipe(changed('./'))
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('./public'))
		.pipe(connect.reload());
});

gulp.task('default', ['sass', 'jade', 'connect']);

gulp.watch('./public/sass/**/*.css.scss', ['sass']);
gulp.watch('./compile/jade/**/*.jade', ['jade']);
