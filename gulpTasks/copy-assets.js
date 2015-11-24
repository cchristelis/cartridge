/* ============================================================ *\
    MOVE / Copy files 
\* ============================================================ */

module.exports = function(gulp, config) {
    gulp.task('copy:fonts', function(){
        return gulp.src([config.src + '/' + config.dirs.fonts + '/**/*'])
        .pipe(gulp.dest(config.dest + '/' + config.dirs.fonts));
    })

    gulp.task('copy', function(){
        return gulp.src(['!' + config.dest + '/styles', '!' + config.dest + '/styles/*.map', config.dest + '/**/*'])
        .pipe(gulp.dest(config.build));
    })
}