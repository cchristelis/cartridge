/*jslint node: true */
'use strict';

var gulp = require('gulp'),
		plugins = require('gulp-load-plugins')(),
    sgc = require('gulp-sass-generate-contents'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer-core'),
    imagemin = require('gulp-imagemin'),
		pngquant = require('imagemin-pngquant'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		minifyCss = require('gulp-minify-css'),
		jshint = require('gulp-jshint'),
		argv = require('yargs').argv,
    gulpif = require('gulp-if'),
    runSeq = require('run-sequence'),
		config = require('./_config/project.json'),
        templateDataJson = require('./_config/templateData.json'),
        templateHelpers = require('./_config/templateHelpers.js')(),
		jshintConfig = require('./_config/jshint.json'),
		creds = require('./_config/creds.json'),
		itcss = require('./_config/itcss'),
		destStyles = config.src + '/' + config.dirs.styles,
		sourcemaps   = require('gulp-sourcemaps'),
		handlebars = require('gulp-compile-handlebars'),
		pixrem = require('gulp-pixrem'),
		rename = require('gulp-rename'),
		zip = require('gulp-zip'),
        browserSync = require('browser-sync'),
        nodemon = require('gulp-nodemon'),
        gulpCache = require('gulp-cached'),
        handlebarsConfig = require('./_config/handlebars.json');

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

gulp.task('scripts:vendor', function(){
    return gulp.src([config.src + '/' + config.dirs.scripts + '/vendor/*.js'])
        .pipe(gulpif(argv.prod, jshint(jshintConfig))) //Default only
    .pipe(concat('bundle-critical.js'))
    .pipe(gulpif(argv.prod, uglify())) //Production only
    .pipe(gulp.dest(config.dest + '/' + config.dirs.scripts));
});

gulp.task('scripts:ie', function(){
    return gulp.src([config.src + '/' + config.dirs.scripts + '/ie/*.js'])
    .pipe(concat('ie.js'))
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


gulp.task('sass', ['sprites'],function () {
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

gulp.task('sass:legacy:ie8', ['sprites'] ,function () {
    return gulp.src(destStyles + '/ie8.scss')
            .pipe(plugins.sass({ errLogToConsole: true, includePaths: [config.dirs.components], outputStyle: 'compact' }))
            .pipe(postcss([autoprefixer({ browsers: ['IE 8'] })]))
            .pipe(pixrem(config.pixelBase))
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

gulp.task('svgmin', function () {
    return gulp.src(config.src + '/' + config.dirs.images + '/**/*.svg')
        .pipe(gulpCache('svgmin'))
        .pipe(plugins.svgmin({
            plugins: [{
                removeDimensions: true
            }, {
                removeTitle: true
            }]
        }))
        .pipe(gulp.dest(config.src + '/' + config.dirs.images));
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
        batch : handlebarsConfig.partials,
        helpers: templateHelpers
    }
 	
    return gulp.src(handlebarsConfig.views)
        .pipe(handlebars(templateData, options))
        .pipe(rename({extname: '.html'}))
        .pipe(gulp.dest('build'));
});

/* ============================================================ *\
    SPRITES
\* ============================================================ */

gulp.task('sprites', function() {
    return gulp.src(config.src + '/' + config.dirs.images + '/**/*.svg')
        .pipe(plugins.svgSpritesheet({
            cssPathNoSvg: '../' + config.dirs.images + '/sprite.png',
            cssPathSvg: '../' + config.dirs.images + '/sprite.svg',
            padding: 5,
            pixelBase: config.pixelBaseNoUnit,
            positioning: 'packed',
            templateSrc: config.src + '/svg-sprite-sass.tpl',
            templateDest: destStyles + '/_tools/_tools.sprites.scss',
            units: 'em'
        }))
        .pipe(gulp.dest(config.dest + '/' + config.dirs.images + '/sprite.svg'))
        .pipe(plugins.svg2png())
        .pipe(gulp.dest(config.dest + '/' + config.dirs.images + '/sprite.png'));
});

/* ============================================================ *\
    LOCAL TESTING
\* ============================================================ */

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        proxy: "http://localhost:3001",
        files: [config.dest + '/' +  '**/*.*'],
        browser: "google chrome",
        port: 7000,
        ui: {
            port: 7001
        }
    }, function browserSyncCallback() {
        console.log('browser-sync ready, listening on port: 7000')
    });
});


gulp.task('localServer', function(cb) {

    var started = false;

    //Reload website.js if templateData file changes (among other files)
    return nodemon({
        script: 'website.js',
        ext: 'js json'
    }).on('start', function() {
        if (!started) {
            cb();
            started = true;
        }
    });
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

gulp.task('serve', function(cb) {
    runSeq(['localServer'], ['browser-sync'], cb);
});

gulp.task('default', function (cb) {
	runSeq(['sass-generate-contents'],['sass', 'scripts','scripts:vendor' ,'scripts:ie' ,'copy:fonts', 'imagemin'], ['sass:legacy:ie8'], cb);
});
