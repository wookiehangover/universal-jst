# Universal JST

universal-jst: Pre-compiled JavaScript Templates (JST) with Node.js

The following templates work:

* handlebars
* jquery-tmpl
* underscore
* string ( to be compiled later on the client side )

## CLI usage

universal-jst also comes with a command line tool, which you can use
like this:

    $ jst --template hbs --inuptdir path/to/templates --outputdir path/to/save --watch

This creates the file `templates.js` to the target directory. If no
arguments are passed, the current path will be used instead.

Usage :

    Usage: node jst [--template string|underscore|_|jquery-tmpl|handlebars|hbs]

    Options:
      --template, -t   [required]
      --inputdir, -i   [default: "."]
      --outputdir, -o  [default: "."]
      --watch, -w      [default: false]


## Basic usage.

I explain how to do it with universal-jst but it's the same for the
other allowed templates.

Incant universal-jst into your application with a require statement,
and universal-jst will expose 2 functions: `build` and `process`

    var tmpl = require('./lib/universal-jst');

    // Builds a template string
    tmpl.build( 'path/to/my/templates', function( output ){

      // Creates a file called templates.js
      tmpl.process( output, 'path/to/output/dir' );
    });

Build creates a string of executable javascript from a directory of
templates. It accepts the location of your templates and a callback
function.

Process creates a file called `templates.js` in the specified target
directory. It accepts a template string and a the target location.

## Using as a Cakefile

Since this is really meant to be used as a build tool, a Cakefile is
included as well, but keep in mind that _coffee-script must be included
as a dependency in order to use the Cakefile_.

Modify the Cakefile's `targetDir` and `templateDir` variables to point
to you desired build location and the location of your templates,
respectively.

Run `cake build` or `cake watch` from the root of your project to
generate the compiled templates. `cake watch` will listen for changes in
your templates directory and run the build process on demand.

## JST Output

To start using the compiled templates, just include `templates.js`. Keep
in mind that these are just your templates, so you'll also need jQuery
and jQuery-tmpl in there too.

`templates.js` creates a global object called `window.JST`.

The `JST` object includes a `templates` object containing all of your
precompiled templates:

    JST = {
      <template_name>,
      <template_name_2>,
      ...
    }

The helper methods are meant to make using templates as easy as
possible, so they are functions that take JSON data to be templated as
the only argument.

The functions themselves look like this:

      JST.<file_name> = function( data ){
        return $.tmpl( JST.template.<file_name>, data );
      }

And it's final usage would look something like this:

      var data = { title: "foobar" },
          compiled_template = window.JST.sample_template( my_data );

      $('body').html( compiled_template );


## Multiple Named Templates from a single file

Add as many sub-templates as you want to a single JST file by writing a
c-style comment with the sub-template name.

    multiple_templates.JST
    ---
    <hi>Nothing to see here</h1>

    /* foo */
    <h2>{foo}</h2>
    <p>Check out this other awesome template<p>

This file will product 2 templates:

    JST = {
      multiple_templates,
      multiple_templates_foo
    }


## Contributing

This is a need-based project, so I only wrote it to account for my
needs as of right now.

If you've got any suggestestions, opinions, optimizations or fixes,
please fork and pull request to contribute.

Everything original is MIT, everything else honors whatever license it
was written under.
