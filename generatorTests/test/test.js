var assert = require("assert");
var assert = require('assert');
var path = require('path');
var fs = require('fs');

const ROOT_DIR = path.join(process.cwd(), '..');

// describe('Array', function() {
//   describe('#indexOf()', function () {
//     it('should return -1 when the value is not present', function () {
//       assert.equal(-1, [1,2,3].indexOf(5));
//       assert.equal(-1, [1,2,3].indexOf(0));
//     });
//   });
// });


describe('As a dev', function() {

    describe('When using the static site generator', function() {

        it('_config folder should exist', function() {
            var configFolderPath = path.join(ROOT_DIR, '_config');
            fs.statSync(configFolderPath);
        })

        it('routes folder should exist', function() {
            var configFolderPath = path.join(ROOT_DIR, 'routes');
            fs.statSync(configFolderPath);
        })

        it('views folder should exist', function() {
            var configFolderPath = path.join(ROOT_DIR, 'views');
            fs.statSync(configFolderPath);
        })

    });

});