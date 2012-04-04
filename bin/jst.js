#!/usr/bin/env node

var optimist = require('optimist'),
  fs = require('fs'),
  coffee = require('coffee-script'), /* only for watchr */
  watch = require('watchr').watch,
  join = require('path').join,
  _ = require('underscore'),
  engines = require('../lib/index'),
  allowedengine = 'format: string|underscore|_|jquery-engine|handlebars|hbs',
  optimist = optimist.usage('Usage: $0 [--template ' + allowedengine + '] [INPUT_DIR] [OUTPUT]')
  .alias('template', 't')
  .describe('template', allowedengine)
  .demand('template')
  .alias('inputdir', 'i')
  .describe('inputdir', 'directory containings the templates to compile')
  .alias('output', 'o')
  .describe('output', 'output where templates will be compiled')
  .alias('watch', 'w')
  .describe('watch', 'watch `inputdir` for change')
  .alias('namespace', 'ns')
  .describe('namespace', 'object in the browser containing the templates')
  .alias('include', 'I')
  .describe('include', 'Glob patterns for templates files to include in `inputdir`')
  .alias('stdout', 's')
  .describe('stdout', 'Print the result in stdout instead of writing in a file')
  .alias('verbose', 'v')
  .describe('verbose', 'Print logs for debug')
  .default('inputdir', process.cwd())
  .default('output', process.cwd())
  .default('watch', false)
  .default('namespace', engines.defaults.namespace)
  .default('include', engines.defaults.include)
  .default('stdout', false)
  .default('verbose', engines.defaults.verbose),
  options = optimist.argv,
  inputdir;

if(options._ && options._.length >=1 ) options.inputdir = options._[0];
if(options._ && options._.length >=2 ) options.output = options._[1];

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
