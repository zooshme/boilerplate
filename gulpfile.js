var gulp = require('gulp');
var stylus = require('gulp-stylus');
var nib = require('nib');
var jade = require('gulp-jade');
var connect = require('gulp-connect');
var changed = require('gulp-changed');

gulp.task('connect', function() {
	connect.server({
		root: './public',
		livereload: true,
		port: 4141
	});
});

gulp.task('stylus', function() {
	gulp.src('./compile/stylus/styles.styl')
		.pipe(stylus({
			use: [nib()]
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

gulp.task('default', ['stylus', 'jade', 'connect']);

gulp.watch('./compile/stylus/**/*.styl', ['stylus']);
gulp.watch('./compile/jade/**/*.jade', ['jade']);
