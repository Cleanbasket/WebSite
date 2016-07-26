var gulp = require('gulp');
var path = require('path');

var config = require('../../config.json');

module.exports = function buildHtml(target) {
  return gulp.src(path.join('src', target.html))
    .pipe(gulp.dest(path.join(config.build.dest, target.dest)))
}
