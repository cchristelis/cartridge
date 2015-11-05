# Welcome

> It's dangerous to go alone. Here's a quick run through of optional post-install setup

**Prerequisite:** Readme client side setup

Assuming you have cloned the repo and done your first gulp, here are a few things you may need to do after initial setup.

* [Adding Project Credentials](#adding-project-credentials)
* [Adding images](#adding-images)
* [Adding custom fonts](#adding-custom-fonts)
* [Setting the default development homepage](#setting-the-default-development-homepage)
* [Pretty URLs](#pretty-urls)

---

##Adding Project Credentials

`_config/creds.json` is a small file where anchillary project details are kept. These are used through the generator and include the following:

* Site - the name of the site.
* Author - the person or organisation that developed the site.
* packageName - The name of the package which is used when creating a release zip file. It is recommended to include characters instead of spaces here e.g. "package-name" instead of "package name"

##Adding images

Creating the directory `images` in the `_source` directory will mean that anything inside of this folder is copied over during the build process.

This folder is copied to the `public` folder whenever the `gulp` task is run **and will need to be re-run when adding new images**

When referencing images in the styles, reference them as:  

`url('/_client/images/<path>')`

##Adding custom fonts

Creating the directory `fonts` in the `_source` directory will mean that anything inside of this folder is copied over during the build process.

This folder is copied to the `public` folder whenever the `gulp` task is run **and will need to be re-run when adding new images**

When referencing fonts in the styles, reference them as:

`/_client/fonts/<font-name>`

##Setting the default development homepage

By default, the development server directs to the inbuilt styleguide if a view file cannot be found. To change this, in the file `styleguide.js` change line 28 to be the view name that you want to act as the homepage / default. For example, changing it to the following will make the root level `index.hbs` file act as the default homepage.

```
url = 'index'
```

##Pretty URLs

When developing views, by following a directory structure you can ensure URLs are displayed without the file extension both locally and on a remote server.

An address such as `localhost/pretty-url` can be achieved by following the structure below

```
└── views/
    └── pretty-url/
        └── index.hbs
```

Similarily, `localhost/pretty-url/another-pretty-url` can be achieved via the following

```
└── views/
    └── pretty-url/
        └── index.hbs
        └── another-pretty-url
            └── index.hbs
```