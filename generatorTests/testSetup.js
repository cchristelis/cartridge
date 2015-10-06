var os = require('os');
var fs = require('fs-extra');
var path = require('path');

const PROJECT_DIRECTORY = path.join(__dirname, '..');
const OS_TEMP_LOCATION = path.join(os.tmpdir(), 'node-static-site-generator-tests');

console.log(PROJECT_DIRECTORY);
console.log(OS_TEMP_LOCATION);

fs.copy(PROJECT_DIRECTORY, OS_TEMP_LOCATION, function (err) {

    if (err) {
        console.error('Unable to copy source files');
        return console.error(err)
    }

    console.log('Test setup complete');

})