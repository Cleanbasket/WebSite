var gulp = require('gulp');
var path = require('path');

var config = require('../../config.json');

module.exports = function buildJs(target, option) {
  option = option || {};
  return gulp.src(path.join('src', target.js))
    .pipe(gulp.dest(path.join(config.build.dest, target.dest, "js")))
}
