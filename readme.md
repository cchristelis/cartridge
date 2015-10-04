[![Stories in Ready](https://badge.waffle.io/code-computerlove/node-static-site-generator.png?label=ready&title=Ready)](https://waffle.io/code-computerlove/node-static-site-generator)

# Basic website generator.  

> Get yourself going with a ready made basic static website setup

This repository holds the standard SASS, JavaScript and Testing suit for any website at start level.

The site uses [Gulp](https://www.google.com) as a task runner.

The site is setup to use Harry Roberts [csswizardry's](https://github.com/csswizardry) ITCSS (inverted triangle) methodology. See [Managing CSS Projects with ITCSS](https://speakerdeck.com/dafed/managing-css-projects-with-itcss) for further details.

This setup will enable you to run a local node server based instance of a website. Through the use of handlebars templating you will be able to publish your website out into pre-compiled static HTML files.
It also gives you the ability to package the site up with all the necessarry files.

## Installation

Do one of the following

* Clone the git repo - `https://github.com/code-computerlove/node-static-site-generator.git`

### Gulp (Client side setup).

* Open a new command prompt (or Terminal on mac).
* Navigate to the folder
* run - `npm install` (sudo may be required for mac)
* run - `gulp`
* run - `node website.js`

### production and release files.

* run - `gulp build --prod`
* run - `gulp release --prod`

adding `--prod` after any command will compress and minify the relevant files.

### viewing your site
An index has page has puprposely been ommited from this setup to encourage you to build from a styleguide.

navigate to `http://localhost:3001`

or

if you have run build you can navigate to the build folder and open the static HTML files

### 3rd party plugin notes.

#### [gulp-sass-generate-contents](https://github.com/andrewbrandwood/gulp-sass-generate-contents)
To enable the compiling of a list of contents in the main scss file and to import all the correct files.  It is required to have a comment at the top of each sass file. 

anything on the first line other than a double slash // will result in the file being ignored from the contents and the imports. (see options to change this)

#### [run-sequence](https://www.npmjs.com/package/run-sequence)
Gulp is an asynchronous task runner.  We need the gulp-sass-generate-contents to run and complete before we can compile the sass.  The run-sequence plugin allows us to run the contents file before compiling our SASS. 
