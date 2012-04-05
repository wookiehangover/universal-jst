#!/usr/bin/env node

var nopt = require("nopt")
  , fs = require('fs')
  , coffee = require('coffee-script') /* only for watchr */
  , watch = require('watchr').watch
  , Path = require('path')
  , join = Path.join
  , _ = require('underscore')
  , engines = require('../lib/index')
  , allowedengine = ['string', 'underscore', '_', 'jquery-engine', 'handlebars', 'hbs']
  , knownOpts = { "template" : allowedengine
                , "inputdir" : Path
				, "output" : Path
                , "watch" : Boolean
			    , "namespace" : String
			    , "include" : String
                , "stdout" : Boolean
                , "verbose" : Boolean
                }
  , shortHands = { "t" : ["--template"]
                 , "i" : ["--inputdir"]
                 , "o" : ["--output"]
                 , "w" : ["--watch"]
                 , "ns" : ["--namespace"]
                 , "I" : ["--include"]
                 , "s" : ["--stdout"]
                 , "v" : ["--verbose"]
                 }
  , options = nopt(knownOpts, shortHands, process.argv, 2)
  , inputdir;

// defaults value
options.inputdir = options.inputdir || process.cwd()
options.output = options.output || process.cwd()
options.namespace = options.namespace || engines.defaults.namespace
options.include = options.include || engines.defaults.include
options.stdout = options.stdout || false
options.verbose = options.verbose || engines.defaults.verbose

if(!options.template){
  console.error([ 'Usage: /home/romain/universal-jst/bin/jst.js [--template format: string|underscore|_|jquery-tmpl|handlebars|hbs] [INPUT_DIR] [OUTPUT]'
    , ''
    , 'Options:'
    , '  --template, -t     format: string|underscore|_|jquery-engine|handlebars|hbs    [required]'
    , '  --inputdir, -i     directory containings the templates to compile              [default: "$CWD"]'
    , '  --output, -o       output where templates will be compiled                     [default: "$CWD"]'
    , '  --watch, -w        watch `inputdir` for change                                 [default: false]'
    , '  --namespace, --ns  object in the browser containing the templates              [default: "window.JST"]'
    , '  --include, -I      Glob patterns for templates files to include in `inputdir`  [default: "**/*"]'
    , '  --stdout, -s       Print the result in stdout instead of writing in a file     [default: false]'
    , '  --verbose, -v      Print logs for debug                                        [default: false]'
  ].join('\n'))
  process.exit(-1);
}

if(options.argv.remain && options.argv.remain.length >=1 ) options.inputdir = options.argv.remain[0];
if(options.argv.remain && options.argv.remain.length >=2 ) options.output = options.argv.remain[1];

if(!options.inputdir || !options.output) return optimist.showHelp();

if(!options.templates in engines) {
  return console.error('--template ' + options.template + ' is not allowed. Use ' + allowedengine);
}

var inputdir = options.inputdir;

var engine = engines[options.template];

function compile(){
  if( options.verbose ) console.log("Use template format : " + options.template);
  engine( inputdir, options, function( err, compiledTemplates ){
    if( err ) return engines.handleError( err );
    write(compiledTemplates, function(err, output){
      if( err ) return engines.handleError( err );
      if( options.verbose ) console.log(output + " written.");
    });
  });
}

function write( data, callback ){
  data = data.join('\n');
  if(options.stdout) {
    return console.log(data);
  }
  var output = options.output;
  fs.stat(output, function(err, stat){
    if(err){
      // do nothing
    }else if(stat.isFile()){
      // do nothing
    }else if(stat.isDirectory()){
      // if `output` is a directory, create a new file called `templates.js` in this directory.
      output = join(output, 'templates.js');
    }else{
      return engines.handleError(ouput, 'is not a file nor a directory');
    }

    fs.writeFile( output, data, 'utf8', function( err ){
      if( typeof callback == "function" ) callback(err, output);
    });
  });
};

compile();
if(options.watch){
  return watch(options.inputdir, _.debounce(compile, 100));
}
