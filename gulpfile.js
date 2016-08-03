/**
 * 	gulp plugins
 */
var gulp = require('gulp');
var sass = require('gulp-sass');

/**
 *	else modules 
 */
var assign = require('lodash.assign');
var browserSync = require('browser-sync');
var path = require('path');
var runSequence = require('run-sequence');
var mergeStream = require('merge-stream');

/** 
 * tasks
*/
var copyPublicTask = require('./tasks/copyPublic');
var delTask = require('./tasks/del');
var browserSyncTask = require('./tasks/browserSync');
var buildPagesTask = require('./tasks/buildPages');

/**
 * config
 */
var config = require('./config.json');

/**
 * tasks
 */
gulp.task('del', delTask);
gulp.task('copy-public', copyPublicTask);
gulp.task('browser-sync', browserSyncTask);
gulp.task('browser-sync-watch', browserSyncTask.watch)
gulp.task('build-pages', buildPagesTask);
gulp.task('build-watch', buildPagesTask.watch);

gulp.task('build', function (done) {
  runSequence(
    'del', 
    'build-pages', 
    'copy-public', 
    done);
})

gulp.task('serve', function (done) {
	runSequence(
    'del', 
    'build-pages', 
    'browser-sync', 
    ['browser-sync-watch', 'build-watch'], 
    done);
})

gulp.task('default', ['build'])