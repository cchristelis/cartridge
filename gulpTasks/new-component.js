var fs = require('fs');
var path = require('path');

var viewsPath = path.join(process.cwd(), 'views')
var partialsPath = path.join(viewsPath, '_partials');

var componentNewPath;
var hbsFileName;
var scssFileName;

module.exports = function(gulp, argv) {


    gulp.task('new-component', function (cb) {

        if(!argv.name) {
            console.log('');
            console.log('A component must have a name');
            console.log('');
            console.log('Example usage:')
            console.log('gulp component --name header');
            console.log('');
            cb();
        } else {

            console.log('time to create a component name: %s', argv.name);

            hbsFileName = argv.name + '.hbs';
            scssFileName = argv.name + '.scss';
            componentNewPath = path.join(partialsPath, argv.name);

            fs.mkdirSync(componentNewPath);

            console.log('create %s', hbsFileName);
            console.log('create %s', scssFileName);


            //@TODO 
            //create folder
            //create handlebars file
            //create sass partial

            cb();
        }

    });

}