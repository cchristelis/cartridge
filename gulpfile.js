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

// Node
var path = require('path');

// Config
var config    = require('./_config/project.json');
var creds     = require('./_config/creds.json');
var cartridge = require('./.cartridgerc');

// Prep the cartridge settings object
var cartridgeSettings           = {};
cartridgeSettings.tasks         = {};
cartridgeSettings.tasks.default = [];
cartridgeSettings.tasks.watch   = [];
cartridgeSettings.cleanPaths    = [];

config.isprod = argv.prod ? true : false;

/* ============================================================ *\
	TASK MODULES
\* ============================================================ */

var gulpTasksDir = path.join(__dirname, 'gulpTasks');

cartridge.modules.forEach(function(module) {
	require(path.resolve('node_modules/' + module.task))(config, cartridgeSettings, creds);
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
