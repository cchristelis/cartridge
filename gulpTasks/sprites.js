/* ============================================================ *\
    SPRITES
\* ============================================================ */

var svgSpritesheet = require('gulp-svg-spritesheet');
var svg2png = require('gulp-svg2png');

module.exports = function(gulp, config, destStyles) {

    gulp.task('sprites', function() {
        return gulp.src(config.src + '/' + config.dirs.images + '/**/*.svg')
            .pipe(svgSpritesheet({
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
            .pipe(svg2png())
            .pipe(gulp.dest(config.dest + '/' + config.dirs.images + '/sprite.png'));
    });

}