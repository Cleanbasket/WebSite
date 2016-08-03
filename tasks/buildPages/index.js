var gulp = require('gulp');
var path = require('path');

var mergeStream = require('merge-stream');
var buildSass = require('./buildSass');
var buildHtml = require('./buildHtml');
var buildPage = require('./buildPage');
var config = require('../../config.json');

function getSrc(filepath) {
  var relPath = path.relative(path.join(__dirname, '../../src'), filepath);
  var dirArr = relPath.split(path.sep);
  return dirArr[0];
}

module.exports = function () {
  var streams = [];
  for (page in config.build.src) {
    streams.push(buildPage(config.build.src[page], {
      rootPath: ''
    }));
  }
  return mergeStream(streams);
}

module.exports.ghPages = function () {
  var streams = [];
  for (page in config.build.src) {
    streams.push(buildPage(config.build.src[page], {
      rootPath: '/WebSite'
    }));
  }
  return mergeStream(streams); 
}

module.exports.watch = function () {
  gulp.watch("src/**/*.scss", function (e) {
    var name = getSrc(e.path);
    if (name === "common") {
      for (page in config.build.src) {
        buildSass(config.build.src[page]);
      }     
    } else {
      buildSass(config.build.src[name]);  
    }
  });
  gulp.watch("src/**/*.html", function (e) {
    var name = getSrc(e.path);
    buildHtml(config.build.src[name]);
  });
}