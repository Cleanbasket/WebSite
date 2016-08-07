var mergeStream = require('merge-stream');
var buildSass = require('./buildSass');
var buildHtml = require('./buildHtml');
var buildJs = require('./buildJs');

module.exports = function buildPage(target, option) {
  var streams = [];
  if (target.html) {
    streams.push(buildHtml(target, option));
  }

  if (target.sass) {
    streams.push(buildSass(target));
  }

  if (target.js) {
    streams.push(buildJs(target, option));
  }
  return mergeStream(streams);
}
