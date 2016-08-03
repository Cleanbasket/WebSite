var gulp = require('gulp');
var del = require('del');
var config = require('../config.json');

function delTask () {
	return del(config.build.dest);
}

module.exports = delTask;