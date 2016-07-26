var mergeStream = require('merge-stream');
var buildSass = require('./buildSass');
var buildHtml = require('./buildHtml');

module.exports = function buildPage(target) {
  console.log("build page", target);
  return mergeStream(
    buildSass(target), 
    buildHtml(target)
  );
}
