var assert = require("assert");
var assert = require('assert');
var path = require('path');
var fs = require('fs');

const ROOT_DIR = path.join(process.cwd(), '..');

describe('As a dev', function() {

    describe('When using the static site generator', function() {

        it('_config folder should exist', function() {
            var pathToTest = path.join(ROOT_DIR, '_config');
            fs.statSync(pathToTest);
        })

        it('routes folder should exist', function() {
            var pathToTest = path.join(ROOT_DIR, 'routes');
            fs.statSync(pathToTest);
        })

        it('views folder should exist', function() {
            var pathToTest = path.join(ROOT_DIR, 'views');
            fs.statSync(pathToTest);
        })

        it('_config files should exist', function() {
            //add all files into array
            //loop over all of them]
            //ensure they all exist

            var pathToTest = path.join(ROOT_DIR, '_config/');

            var files = [
                'creds.json',
                'itcss.js',
                'jshint.json',
                'project.json',
                'sass.json',
                'templateData.json',
                'templateHelpers.js'
            ];

            files.forEach(function(fileName) {
                fs.statSync(path.join(pathToTest, fileName));
            });
        })

    });

});