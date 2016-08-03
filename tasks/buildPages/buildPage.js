var mergeStream = require('merge-stream');
var buildSass = require('./buildSass');
var buildHtml = require('./buildHtml');

module.exports = function buildPage(target, option) {
  return mergeStream(
    buildSass(target), 
    buildHtml(target, option)
  );
}
