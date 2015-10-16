var path = require('path');
var chai = require('chai');

chai.use(require('chai-fs'));
chai.should();

const ROOT_DIR = path.join(process.cwd(), '..');

describe('As a dev', function() {

    describe('When testing generator directory structure', function() {

        it('then _config folder should exist', function() {
            var pathToTest = path.join(ROOT_DIR, '_config');
            pathToTest.should.be.a.directory();
        })

        it('then routes folder should exist', function() {
            var pathToTest = path.join(ROOT_DIR, 'routes');
            pathToTest.should.be.a.directory();
        })

        it('then views folder should exist', function() {
            var pathToTest = path.join(ROOT_DIR, 'views');
            pathToTest.should.be.a.directory();
        })
    });

});