/* ============================================================ *\
    IMAGES / minify images
\* ============================================================ */

var gulpif = require('gulp-if')
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var svgmin = require('gulp-svgmin');

module.exports = function(gulp, config, argv) {
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
            .pipe(svgmin({
                plugins: [{
                    removeDimensions: true
                }, {
                    removeTitle: true
                }]
            }))
            .pipe(gulp.dest(config.src + '/' + config.dirs.images));
    });
}