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

var slateSettings = {
	tasks: {
		default: [],
		watch:   [],
	}
	cleanPaths: []
};

config.isprod  = argv.prod ? true : false;
config.paths   = require('./_config/paths')(config);

/* ============================================================ *\
	TASK MODULES
\* ============================================================ */

var gulpTasksDir = path.join(__dirname, 'gulpTasks');

slate.modules.forEach(function(module) {
	require('node_modules/' + module.taskFile)(gulp, config, slateSettings, argv, creds);
});

gulp.task('clean', function () {
	return del(slateSettings.cleanPaths);
});

/* ============================================================ *\
	MAIN TASKS
\* ============================================================ */

gulp.task('watch', slateSettings.tasks.watch);

// Task for team city
gulp.task('build', function (cb) {
	return runSeq(['clean'], slateSettings.tasks.default, cb);
});

// Task for local dev
gulp.task('default', slateSettings.tasks.default.concat(['watch']));
