var gulp = require('gulp');
var replace = require('gulp-replace');
var path = require('path');

var config = require('../../config.json');

module.exports = function buildHtml(target, option) {
  return gulp.src(path.join('src', target.html))
    .pipe(replace('{rootPath}', option.rootPath || ''))
    .pipe(gulp.dest(path.join(config.build.dest, target.dest)))
}
