var gulp = require('gulp');
var browserSync = require('browser-sync');
var config = require('../config.json');

function browserSyncTask () {
	browserSync.init({
		server: {
			baseDir: config.build.dest
		},
		open : false
	})
}

function browserSyncWatch () {
  gulp.watch([
  	`${config.build.dest}/**/*.html`,
  	`${config.build.dest}/**/*.css`
  ]).on('change', browserSync.reload);

}

// browserSyncTask.watch = browserSyncWatch;

module.exports = browserSyncTask;
module.exports.watch = browserSyncWatch