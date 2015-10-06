[![Stories in Ready](https://badge.waffle.io/code-computerlove/node-static-site-generator.png?label=ready&title=Ready)](https://waffle.io/code-computerlove/node-static-site-generator)

# Basic static website generator

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
    * `node website.js`

#### Production and release files.

If you need to compile your templates

* `gulp build --prod`. This will do a full build (HTML compile, style compilation, minification) and output in the `build` folder.
* `gulp release --prod`. This will do the same as the above build task but also package all assets into a zip file in the `release` folder.

adding `--prod` after any command will compress and minify the relevant files.

### Viewing your site

An index has page has puprposely been ommited from this setup to encourage you to build from a styleguide.

Ensure you have a local server instance running using `node website.js` and then navigate to `http://localhost:3001`. 

If you have run the `build` task you can navigate to the build folder and open the static HTML files.

## HTML Template Data

Template data is stored in the `templateData.json` file located in `_config` folder. Anything stored in this file is piped to the handlebars templates under the `data` namespace. If you want to output the value of the key `pageHeading` this would be done via `{{ data.pageHeading }}` (The double brackets tell handlebars to output a dynamic value). As this file is standard json - arrays and objects can be added and used for template loops, passed to partials etc without issue.

### 3rd party plugin notes.

#### [gulp-sass-generate-contents](https://github.com/andrewbrandwood/gulp-sass-generate-contents)
To enable the compiling of a list of contents in the main scss file and to import all the correct files.  It is required to have a comment at the top of each sass file. 

anything on the first line other than a double slash // will result in the file being ignored from the contents and the imports. (see options to change this)

#### [run-sequence](https://www.npmjs.com/package/run-sequence)
Gulp is an asynchronous task runner.  We need the gulp-sass-generate-contents to run and complete before we can compile the sass.  The run-sequence plugin allows us to run the contents file before compiling our SASS. 
