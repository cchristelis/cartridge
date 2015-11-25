[![Stories in Ready](https://badge.waffle.io/code-computerlove/node-static-site-generator.png?label=ready&title=Ready)](https://waffle.io/code-computerlove/node-static-site-generator)
[![devDependency Status](https://david-dm.org/code-computerlove/node-static-site-generator/dev-status.svg)](https://david-dm.org/code-computerlove/node-static-site-generator#info=devDependencies)
[![Dependency Status](https://david-dm.org/code-computerlove/node-static-site-generator.svg)](https://david-dm.org/code-computerlove/node-static-site-generator)

# Basic static website generator [![Build Status](https://travis-ci.org/code-computerlove/node-static-site-generator.svg?branch=master)](https://travis-ci.org/code-computerlove/node-static-site-generator)

> Get yourself going with a ready made basic static website setup

This repository holds the standard Sass, JavaScript and Testing suit for any website at start level.

The site uses [Gulp](https://www.google.com) as a task runner.

The site is setup to use Harry Roberts [csswizardry's](https://github.com/csswizardry) ITCSS (inverted triangle) methodology. See [Managing CSS Projects with ITCSS](https://speakerdeck.com/dafed/managing-css-projects-with-itcss) for further details.

This setup will enable you to run a local node server instance of a website. Through the use of handlebars templating you will be able to compile your website into pre-compiled static HTML files.
It also gives you the ability to package the site up with all the necessarry files.

## Installation

* Clone the git repo - `https://github.com/code-computerlove/node-static-site-generator.git`

Once you have the source code, you will need to do one of the following:

#### Gulp (Client side setup).

* Open a new command prompt (or Terminal on mac).
* Navigate to the folder
* Run the following commands
    * `npm install` (sudo may be required for mac)
    * `gulp`
    * `gulp serve` - this will open a local instance of the site for you ([See 'Viewing your site'](#viewing-your-site))

Optional setup details can be found in [Welcome](docs/welcome.md)

#### Production and release files.

If you need to compile your templates

* `gulp build --prod`. This will do a full build (HTML compile, style compilation, minification) and output in the `build` folder.
* `gulp release --prod`. This will do the same as the above build task but also package all assets into a zip file in the `release` folder.

adding `--prod` after any command will compress and minify the relevant files.

##  Testing

Included as part of the installation are all required dependencies for unit testing using PhantomJS, Karma, Mocha and assertion library chai. These are stored inside of the `test` folder. These can be run by running `npm test` from the root of the project.

The generator itself has tests and are stored seperatly in the folder `generatorTests` along with it's own package file. The entire contents of this folder is to test the correct function of the generator itself e.g. certain files / folders exist and that certain files / folders are created after build tasks.

To this end, after installation, the whole of the `generatorTests` folder **CAN BE** deleted and **WILL NOT** affect to the rest of the files or output.

### Contributing 



- Ensure mocha is installed (preferrably globally) - `npm install -g mocha`
- Open a command line tool and go into the generator tests folder e.g `cd generatorTest`
- Install all of the dependencies using `npm install`. These are seperate from the base dependencies and includes tools specific to running the tests.
- Still inside the `generatorTests` folder, run the command `mocha`. This will run all test files in the `test` folder. **As these tests may test the gulp output, be prepared for any and all gulp tasks to be run (such as creating folders, files etc)**.
