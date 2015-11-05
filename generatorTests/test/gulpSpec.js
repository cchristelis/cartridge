var path = require('path');
var spawn = require('child_process').spawn;
var fs = require('fs-plus');
var path = require('path');
var chai = require('chai');

chai.use(require('chai-fs'));
chai.should();

const ROOT_DIR = path.join(process.cwd(), '..');

function runGulpTask(options, callback) {

    process.chdir(ROOT_DIR);

    var gulp = spawn('gulp', options)

    gulp.on('close', function() {
        callback();
    });

}

function cleanBuildAndReleaseFolders() {
    var buildPath = path.join(ROOT_DIR, 'build');
    var releasePath = path.join(ROOT_DIR, 'release');

    fs.removeSync(buildPath);
    fs.removeSync(releasePath);
}

describe('As a dev', function() {

    this.timeout(10000);

    before(function(done) {
        cleanBuildAndReleaseFolders();
        done();
    })

    describe('When running `gulp release --prod`', function() {

        before(function(done) {
            cleanBuildAndReleaseFolders();
            runGulpTask(['release', '--prod'], done)
        });

        it('the release folder should exist and not be empty', function() {
            var pathToTest = path.join(ROOT_DIR, 'release');
            pathToTest.should.be.a.directory().and.not.empty;
        });

        it('the release folder should contain atleast one zip file', function() {
            var pathToTest = path.join(ROOT_DIR, 'release/');
            var directoryFileName = fs.readdirSync(pathToTest);
            var actualFileExtName = path.extname(directoryFileName);
            var expectedFileExtName = '.zip';

            actualFileExtName.should.equal(expectedFileExtName);
        });

    });

    describe('When running `gulp build --prod`', function() {

        before(function(done) {
            cleanBuildAndReleaseFolders();
            runGulpTask(['build', '--prod'], done)
        });

        it('the build folder should exist and not be empty', function() {
            var pathToTest = path.join(ROOT_DIR, 'build');
            pathToTest.should.be.a.directory().and.not.empty;
        });

        it('the build folder should not include the _partials folder', function() {
            var pathToTest = path.join(ROOT_DIR, 'build', '_partials');
            pathToTest.should.not.be.a.path();
        });

    });

});