/* ============================================================ *\
    SETUP
\* ============================================================ */

/*jslint node: true */
'use strict';

// Gulp
var gulp   = require('gulp');
var argv   = require('yargs').argv;
var runSeq = require('run-sequence');

// Tasks
var del = require('del');

// Config
var config = require('./_config/project.json');
var creds  = require('./_config/creds.json');
var slate  = require('./.slaterc');

var cartridgeSettings = {
	tasks: {
		default: [],
		watch:   [],
	}
	cleanPaths: []
};

config.isprod = argv.prod ? true : false;

/* ============================================================ *\
	TASK MODULES
\* ============================================================ */

var gulpTasksDir = path.join(__dirname, 'gulpTasks');

slate.modules.forEach(function(module) {
	require('node_modules/' + module.task)(config, cartridgeSettings, creds);
});

gulp.task('clean', function () {
	return del(cartridgeSettings.cleanPaths);
});

/* ============================================================ *\
	MAIN TASKS
\* ============================================================ */

gulp.task('watch', cartridgeSettings.tasks.watch);

// Task for local dev
gulp.task('default', cartridgeSettings.tasks.default.concat(['watch']));

// Task for team city
gulp.task('build', function (cb) {
	return runSeq(['clean'], cartridgeSettings.tasks.default, cb);
});
