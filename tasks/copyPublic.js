var gulp = require('gulp');
var path = require('path');
var config = require('../config.json');

function copyPublic () {
	// to array
	var publicGlob = [].concat(config.build.publicPath);
  
	// to glob
	publicGlob = publicGlob.map(function (i) {
		if (i[i.length - 1] === path.sep) {
			i = i.slice(0, i.length - 1);
		}
		return i + '/**/*';
	})
	
	return gulp.src(publicGlob)
		.pipe(gulp.dest(config.build.dest))
}

module.exports = copyPublic;
