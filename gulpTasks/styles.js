/* ============================================================ *\
    STYLES / SCSS
\* ============================================================ */

var gulpif = require('gulp-if');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var pixrem = require('gulp-pixrem');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var minifyCss = require('gulp-minify-css');

module.exports = function(gulp, config, argv, destStyles) {

    gulp.task('sass', ['sprites'],function () {
        return gulp.src(destStyles + '/main.scss')
                .pipe(gulpif(!argv.prod, sourcemaps.init())) //Default only
                .pipe(sass({ errLogToConsole: true, includePaths: [config.dirs.components], outputStyle: 'compact' }))
                .pipe(postcss([autoprefixer({ browsers: ['> 5%', 'Android 3'] })]))
                .pipe(pixrem(config.pixelBase))
                .pipe(gulpif(!argv.prod, sourcemaps.write('.'))) //Default only
                .pipe(pixrem(config.pixelBase))
                .pipe(gulpif(argv.prod, minifyCss())) //Production only
                .pipe(gulp.dest(config.dest + '/' + config.dirs.styles));
    });

    gulp.task('sass:legacy:ie8', ['sprites'] ,function () {
        return gulp.src(destStyles + '/ie8.scss')
                .pipe(sass({ errLogToConsole: true, includePaths: [config.dirs.components], outputStyle: 'compact' }))
                .pipe(postcss([autoprefixer({ browsers: ['IE 8'] })]))
                .pipe(pixrem(config.pixelBase))
                .pipe(gulp.dest(config.dest + '/' + config.dirs.styles));
    });

}