var assert = require("assert");
var path = require('path');
var fs = require('fs');

const ROOT_DIR = path.join(process.cwd(), '..');

describe('As a dev', function() {

    describe('When testing for generator directory structure', function() {

        it('then _config folder should exist', function() {
            var pathToTest = path.join(ROOT_DIR, '_config');
            fs.statSync(pathToTest);
        })

        it('then routes folder should exist', function() {
            var pathToTest = path.join(ROOT_DIR, 'routes');
            fs.statSync(pathToTest);
        })

        it('then views folder should exist', function() {
            var pathToTest = path.join(ROOT_DIR, 'views');
            fs.statSync(pathToTest);
        })
    });

});