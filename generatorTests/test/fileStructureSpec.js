var assert = require("assert");
var path = require('path');
var fs = require('fs');

const ROOT_DIR = path.join(process.cwd(), '..');

describe('As a dev', function() {

    describe('When testing for generator file structure', function() {

        it('then _config files should exist', function() {
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

        it('then required express files exist', function() {
            var files = [
                'routing.js',
                'website.js'
            ];

            files.forEach(function(fileName) {
                fs.statSync(path.join(ROOT_DIR, fileName));
            });
        })

        it('then required build files exist', function() {
            var files = [
                'gulpfile.js',
                'package.json'
            ];

            files.forEach(function(fileName) {
                fs.statSync(path.join(ROOT_DIR, fileName));
            });
        })

    });

});