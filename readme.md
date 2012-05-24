# Universal JST

universal-jst: Pre-compiled JavaScript Templates (JST) with Node.js

Transform a set of HTML or template files into javascript functions
ready to be used.

The following templates work:

* [handlebars](http://handlebarsjs.com/)
* [jquery-tmpl](http://api.jquery.com/jquery.tmpl/)
* [underscore](http://documentcloud.github.com/underscore/#template)
* [dust](http://akdubya.github.com/dustjs/)
* [mustache with hogan](http://twitter.github.com/hogan.js/)
* string ( useful for svg, or for templates to be compiled later on client side )


## Quick-start:

    jst --template handlebars templates/ javascripts/templates.js

Edit your index.html, and add:

    <script src="lib/handlebars.runtime-1.0.0.beta.6.js"></script>
    <script src="javascripts/templates.js"></script>

In your javascript application, use the compiled templates this way:

    var data = { title: "foobar" },
        compiled_template = window.JST.sample_template( my_data );

    $('body').html( compiled_template );

For more examples, look at the [example](universal-jst/tree/master/example) folder.

## Install

    npm install -g universal-jst

Or from sources

    git clone https://github.com/wookiehangover/universal-jst.git universal-jst
    cd universal-jst
    npm install -g

## CLI usage

universal-jst comes with a command line tool.

    $ jst --template [template-engine] [path/to/templates] > [path/to/output]

or

    $ jst --template [template_engine] [path/to/templates] [path/to/output]

Usage :

    $ jst [--template format: string|underscore|_|jquery-tmpl|handlebars|hbs|dust|hogan|mustache|mu] [INPUT_DIR] [OUTPUT?]

      --template -t    format : string|underscore|_|jquery-tmpl|handlebars|hbs|dust|hogan|mustache|mu
      --inputdir -i    directory containings the templates to compile                                    $PWD
      --output -o      output where templates will be compiled
      --watch -w       watch `inputdir` for change                                                       false
      --namespace -ns  object in the browser containing the templates                                    window.JST
      --include -I     Glob patterns for templates files to include in `inputdir`                        **/*
      --stdout -s      Print the result in stdout instead of writing in a file                           false
      --verbose -v     Print logs for debug                                                              false


## Node usage.

Universal-JST export a list of engines.

    require('universal-jst')
    {
      handlebars: [Function: build],
      string: [Function: build],
      _: [Function: build],
      hbs: [Function: build],
      'jquery-tmpl': [Function: build],
      underscore: [Function: build],
      dust: [Function: build],
      mu: [Function: build],
      mustache: [Function: build],
      hogan: [Function: build]
    }

Just choose your engine and use it:

    var engines = require('universal-jst')
    engines.hbs('./example/handlebars/templates/', function(err, data){
      console.log(data.join('\n'));
    });

Be aware that the result data is an array. You can filter this array if
you want or just use the whole result by using `data.join('\n')`.


## JST Output

To start using the compiled templates, just include `templates.js`. Keep
in mind that these are just your templates, so you'll also need your templates dependencies in there too.

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
      multiple_templates: function(){ /* */},
      multiple_templates_foo: function(){ /* */}
    }

## Templates in a subdirectory

If you specify a recursive glob pattern (by default) : `**/*`, then
templates in subfolders will be compiled too.

    JST = {
      "sub/folder/template": function(){ /* */},
      "sub/sub/folder/template": function(){ /* */}
    }

The path separator is a `/`, so to get the template, use the hook
notation.

    JST["sub/folder/template"]

## Template engine options

Each template engine is different, and may be configured via options.

### Dust.js

Partials are working. Look at this example [helper](universal-jst/tree/master/example/dust/templates/partials.dust)

### Handlebars

Partials are working. Each template is also a partial, i.e. `Handlebars.partials == window.JST`

`--helpers /path/to/a/dir/containing/helpers` look at this example [helper](universal-jst/tree/master/example/handlebars/helpers), [template](universal-jst/tree/master/example/handlebars/templates/helpers.hbs)

### Underscore

`--evaluate`, `--interpolate`, `--escape` are accepted. Those strings will be transformed into a new RegExp


## Contributing

This is a need-based project, so I only wrote it to account for my
needs as of right now.

If you've got any suggestestions, opinions, optimizations or fixes,
please fork and pull request to contribute.

Everything original is MIT, everything else honors whatever license it
was written under.
