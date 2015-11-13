/* ============================================================ *\
    GENERATE SASS IMPORTS AND
\* ============================================================ */

var itcss = require('../_config/itcss');
var sgc = require('gulp-sass-generate-contents');

module.exports = function(gulp, creds, destStyles) {

    gulp.task('sass-generate-contents', function () {
        return gulp.src(itcss())
        .pipe(sgc(destStyles + '/main.scss', creds))
        .pipe(gulp.dest(destStyles));
    });

}