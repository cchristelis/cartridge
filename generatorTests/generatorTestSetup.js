var os = require('os');
var fs = require('fs-extra');
var path = require('path');
var exec = require('child_process').exec;

const PROJECT_DIRECTORY = path.join(__dirname, '..');
const OS_TEMP_LOCATION = path.join(os.tmpdir(), 'node-static-site-generator-tests');

console.log('1) Setting up environment for testing');
console.log('2) Copying source files to OS temp directory');

fs.copy(PROJECT_DIRECTORY, OS_TEMP_LOCATION, { 
    clobber: true,
    filter: function(directory) { 
        //exclude specific directories (mainly node_modules) from being copied over
        return directory.indexOf('karma') === -1 && directory.indexOf('phantom') === -1 && directory.indexOf('express') === -1 && directory.indexOf('build') === -1 && directory.indexOf('release') === -1 && directory.indexOf('_source') === -1; 
    }
}, function (err) {

    if (err) {
        console.error('3) Unable to copy source files');
        return console.error(err)
    }

    process.chdir(path.join(OS_TEMP_LOCATION ,'generatorTests'));

    exec('mocha', function(err, stdout, stderr) {

        if(err) {
            console.error(stderr);
        }

        console.log(stdout);
    });
})