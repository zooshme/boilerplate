var gulp = require('gulp');
var stylus = require('gulp-stylus');
var nib = require('nib');
var jade = require('gulp-jade');

gulp.task('stylus', function() {
	gulp.src('./compile/stylus/styles.styl')
		.pipe(stylus({
			use: [nib()]
		}))
		.pipe(gulp.dest('./css'));
});

gulp.task('jade', function() {
	gulp.src(['./compile/jade/**/*.jade', '!./compile/jade/partials/*.jade'])
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('./'));
});

gulp.task('default', ['stylus', 'jade']);

gulp.watch('./compile/stylus/**/*.styl', ['stylus']);
gulp.watch('./compile/jade/**/*.jade', ['jade']);