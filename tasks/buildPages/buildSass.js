var gulp = require('gulp');
var sass = require('gulp-sass');

var path = require('path');
var config = require('../../config.json');

module.exports = function buildSass(target) {
	return gulp.src(path.join('src', target.sass))
		.pipe(sass({
			includePaths: [
				"public/bower_components/normalize-scss/sass"
			]
		}).on('error', sass.logError))
		.pipe(gulp.dest(path.join(config.build.dest, target.dest, 'css')))
}