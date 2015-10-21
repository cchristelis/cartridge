/*jslint node: true */
'use strict';

	// Gulp
var gulp            = require('gulp'),
	plugins          = require('gulp-load-plugins')(),
	gulpif           = require('gulp-if'),

	// Utilities
	argv             = require('yargs').argv,
	zip              = require('gulp-zip'),
	sourcemaps       = require('gulp-sourcemaps'),
	runSeq           = require('run-sequence'),
	rename           = require('gulp-rename'),
	concat           = require('gulp-concat'),

	// Javascript
	uglify           = require('gulp-uglify'),
	jshint           = require('gulp-jshint'),

	// Templates
	handlebars       = require('gulp-compile-handlebars'),

	// CSS
	minifyCss        = require('gulp-minify-css'),
	autoprefixer     = require('autoprefixer-core'),
	sgc              = require('gulp-sass-generate-contents'),
	postcss          = require('gulp-postcss'),
	pixrem           = require('gulp-pixrem'),

	// Images
	imagemin         = require('gulp-imagemin'),
	pngquant         = require('imagemin-pngquant'),

	// Configuration
	config           = require('./_config/project.json'),
	templateDataJson = require('./_config/templateData.json'),
	templateHelpers  = require('./_config/templateHelpers.js')(),
	jshintConfig     = require('./_config/jshint.json'),
	creds            = require('./_config/creds.json'),
	itcss            = require('./_config/itcss'),
	destStyles       = config.src + '/' + config.dirs.styles;

/* ============================================================ *\
	SCRIPTS JS / lint, concat and minify scripts
\* ============================================================ */


gulp.task('scripts', function(){
	return gulp.src([config.src + '/' + config.dirs.scripts + '/**/*.js'])
		.pipe(gulpif(argv.prod, jshint(jshintConfig))) //Default only
		.pipe(concat('bundle.js'))
		.pipe(gulpif(argv.prod, uglify())) //Production only
		.pipe(gulp.dest(config.dest + '/' + config.dirs.scripts));
});

/* ============================================================ *\
	GENERATE SASS IMPORTS AND
\* ============================================================ */


gulp.task('sass-generate-contents', function () {
	return gulp.src(itcss())
	.pipe(sgc(destStyles + '/main.scss', creds))
	.pipe(gulp.dest(destStyles));
});

/* ============================================================ *\
	STYLES / SCSS
\* ============================================================ */


gulp.task('sass', function () {
	return gulp.src(destStyles + '/main.scss')
		.pipe(gulpif(!argv.prod, plugins.sourcemaps.init())) //Default only
		.pipe(plugins.sass({ errLogToConsole: true, includePaths: [config.dirs.components], outputStyle: 'compact' }))
		.pipe(postcss([autoprefixer({ browsers: ['> 5%', 'Android 3'] })]))
		.pipe(plugins.pixrem(config.pixelBase))
		.pipe(gulpif(!argv.prod, plugins.sourcemaps.write('.'))) //Default only
		.pipe(plugins.pixrem(config.pixelBase))
		.pipe(gulpif(argv.prod, minifyCss())) //Production only
		.pipe(gulp.dest(config.dest + '/' + config.dirs.styles));
});

/* ============================================================ *\
	IMAGES / minify images
\* ============================================================ */


gulp.task('imagemin', function () {
	return gulp.src(config.src + '/' + config.dirs.images + '/**/*')
		.pipe(gulpif(argv.prod, imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))) //Production only
		.pipe(gulp.dest(config.dest + '/' + config.dirs.images));
});

/* ============================================================ *\
	MOVE / Copy files
\* ============================================================ */


gulp.task('copy:fonts', function(){
	return gulp.src([config.src + '/' + config.dirs.fonts + '/**/*'])
		.pipe(gulp.dest(config.dest + '/' + config.dirs.fonts));
})

gulp.task('copy', function(){
	return gulp.src(['!' + config.dest + '/styles', '!' + config.dest + '/styles/*.map', config.dest + '/**/*'])
		.pipe(gulp.dest(config.build));
})

/* ============================================================ *\
	PACKAGE THE FOLDER UP
\* ============================================================ */


gulp.task('package-release', function () {

	var d = new Date();
	var packageName = creds.packageName + '' + d.getDay() + '.' + d.getMonth() + '.' + d.getFullYear() + '_' + d.getHours() + '.' + d.getMinutes();

	return gulp.src('build/**/*')
		.pipe(zip(packageName + '.zip'))
		.pipe(gulp.dest('release'));
});

/* ============================================================ *\
	COMPILE TEMPLATES / HTML
\* ============================================================ */


gulp.task('compile-html', function () {
	var templateData = {
		data: templateDataJson
	},

	options = {
		batch : ['./views/_partials'],
		helpers: templateHelpers
	}

	return gulp.src(['./views/*.hbs'])
		.pipe(handlebars(templateData, options))
		.pipe(rename({extname: '.html'}))
		.pipe(gulp.dest('build'));
});

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

gulp.task('default', function (cb) {
	runSeq(['sass-generate-contents'],['sass', 'scripts', 'copy:fonts', 'imagemin'], cb);
});
