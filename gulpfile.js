/*jslint node: true */
'use strict';

var gulp = require('gulp'),
		plugins = require('gulp-load-plugins')(),
    // sgc = require('gulp-sass-generate-contents'),
    // postcss = require('gulp-postcss'),
    // autoprefixer = require('autoprefixer-core'),
    // imagemin = require('gulp-imagemin'),
		// pngquant = require('imagemin-pngquant'),
		// concat = require('gulp-concat'),
		// uglify = require('gulp-uglify'),
		// minifyCss = require('gulp-minify-css'),
		// jshint = require('gulp-jshint'),
		argv = require('yargs').argv,
    // gulpif = require('gulp-if'),
    runSeq = require('run-sequence'),
		config = require('./_config/project.json'),
        // templateDataJson = require('./_config/templateData.json'),
        // templateHelpers = require('./_config/templateHelpers.js')(),
		// jshintConfig = require('./_config/jshint.json'),
		creds = require('./_config/creds.json'),
		// itcss = require('./_config/itcss'),
		destStyles = config.src + '/' + config.dirs.styles;
		// sourcemaps   = require('gulp-sourcemaps'),
		// handlebars = require('gulp-compile-handlebars'),
		// pixrem = require('gulp-pixrem');
		// rename = require('gulp-rename'),
		// zip = require('gulp-zip'),
        // browserSync = require('browser-sync'),
        // nodemon = require('gulp-nodemon'),
        // gulpCache = require('gulp-cached');
        // handlebarsConfig = require('./_config/handlebars.json');

require('./gulpTasks/styles.js')(gulp, config, argv, destStyles);
require('./gulpTasks/scripts.js')(gulp, config, argv);
require('./gulpTasks/sprites.js')(gulp, config, destStyles);
require('./gulpTasks/sass-generate-contents.js')(gulp, creds, destStyles);
require('./gulpTasks/image-minify.js')(gulp, config, argv);
require('./gulpTasks/copy-assets.js')(gulp, config);
require('./gulpTasks/release.js')(gulp, creds);
require('./gulpTasks/compile-html.js')(gulp);
require('./gulpTasks/local-testing.js')(gulp, config);

/* ============================================================ *\
    MAIN TASKS
\* ============================================================ */


gulp.task('watch:sass', function () {
	gulpif(!argv.prod, gulp.watch([config.src + '/' + config.dirs.styles + '/**/*.scss', config.dirs.components + '/**/*.scss'], ['sass']));
});
gulp.task('watch:js', function () {
	gulpif(!argv.prod, gulp.watch([config.src + '/' + config.dirs.scripts + '/**/*.js', config.dirs.components + '/**/*.js'], ['scripts']));
});
gulp.task('watch', function (cb) {
	runSeq(['watch:sass', 'watch:js'], cb);
});

gulp.task('build', function (cb) {
	runSeq(['default'], ['copy'], ['compile-html'],  cb);
});

gulp.task('release', function (cb) {
	runSeq(['build'], ['package-release'],  cb);
});

gulp.task('serve', function(cb) {
    runSeq(['localServer'], ['browser-sync'], cb);
});

gulp.task('default', function (cb) {
	runSeq(['sass-generate-contents'],['sass', 'scripts','scripts:vendor' ,'scripts:ie' ,'copy:fonts', 'imagemin'], ['sass:legacy:ie8'], cb);
});
