/**
 * 	gulp plugins
 */
var gulp = require('gulp');
var sass = require('gulp-sass');

/**
 *	else modules 
 */
var browserSync = require('browser-sync');
var path = require('path');
var del = require('del');
var runSequence = require('run-sequence');
var mergeStream = require('merge-stream');

/**
 * config
 */
var config = require('./config.json');

/**
 * tasks
 */
gulp.task('default', ['build'])

gulp.task('del', function (done) {
	return del(['build']);
})

gulp.task('build-all', function () {
	var streams = [];
	for (page in config.build.src) {
		streams.push(buildAssets(config.build.src[page]));
	}
	return mergeStream(streams);
})

gulp.task('build', function (done) {
	runSequence('del', 'build-all', done);
})

function buildSass(target) {
	return gulp.src(path.join('src', target.sass))
		.pipe(sass({
			includePaths: [
				"bower_components/normalize-scss/sass"
			]
		}).on('error', sass.logError))
		.pipe(gulp.dest(path.join(config.build.dest, target.dest, 'css')))
}

function buildHtml(target) {
	return gulp.src(path.join('src', target.html))
		.pipe(gulp.dest(path.join(config.build.dest, target.dest)))
}

function buildAssets(target) {
	return mergeStream(buildSass(target), buildHtml(target));
}

function getSrc(filepath) {
	var relPath = path.relative(path.join(__dirname, 'src'), filepath);
	var dirArr = relPath.split(path.sep);
	return dirArr[0];
}

gulp.task('serve', function (done) {
	runSequence('build', 'browser-sync', 'watch', done)
})

gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: './build'
		},
		open : false
	})
})

gulp.task('watch', function () {
    gulp.watch("src/**/*.scss", function (e) {
    	var name = getSrc(e.path);
    	buildSass(config.build.src[name]);
    });
    gulp.watch("src/**/*.html", function (e) {
    	var name = getSrc(e.path);
    	buildHtml(config.build.src[name]);
    });
    gulp.watch([
    	`${config.build.dest}/**/*.html`,
    	`${config.build.dest}/**/*.css`
    ]).on('change', browserSync.reload);
});