/* ============================================================ *\
    UNIT TESTING
\* ============================================================ */

var path = require('path');

var karmaServer = require('karma').Server

module.exports = function(gulp, config) {

    gulp.task('tests', function(done) {
        new karmaServer({
            configFile: path.resolve(__dirname, '..', config.tests.configFile)
        }, done).start();
    });

}