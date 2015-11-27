var fs = require('fs');
var path = require('path');
var chalk = require('chalk');

var viewsPath = path.join(process.cwd(), 'views')
var partialsPath = path.join(viewsPath, '_partials');

var componentPath;
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
        } else {

            hbsFileName = argv.name + '.hbs';
            scssFileName = argv.name + '.scss';
            componentPath = path.join(partialsPath, argv.name);

            fs.mkdirSync(componentPath);
            console.log(chalk.green('Folder "%s" created'), argv.name);

            fs.writeFileSync(path.join(componentPath, hbsFileName), '<h1>' + argv.name +'</h1>', 'utf8');
            console.log(chalk.green('Handlebars file "%s" created'), hbsFileName);

            fs.writeFileSync(path.join(componentPath, scssFileName), '//' + argv.name + ' styles', 'utf8');
            console.log(chalk.green('Sass file "%s" created'), scssFileName);
            console.log(chalk.green('Component files created in "%s"'), componentPath);

        }

        cb();

    });

}