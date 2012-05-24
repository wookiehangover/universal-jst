#!/usr/bin/env node

var nopt = require("nopt")
  , fs = require('fs')
  , coffee = require('coffee-script') /* only for watchr */
  , watch = require('watchr').watch
  , Path = require('path')
  , join = Path.join
  , _ = require('underscore')
  , engines = require('../lib/index')
  , allowedengine = ['string', 'underscore', '_', 'jquery-tmpl', 'handlebars', 'hbs', 'dust', 'hogan', 'mustache', 'mu']
  , knownOpts = { "template"  : allowedengine
                , "inputdir"  : Path
                , "output"    : Path
                , "watch"     : Boolean
                , "namespace" : String
                , "include"   : String
                , "stdout"    : Boolean
                , "verbose"   : Boolean
                }
  , description = { "template"  : "format : " + allowedengine.join('|')
                  , "inputdir"  : "directory containings the templates to compile"
                  , "output"    : "output where templates will be compiled"
                  , "watch"     : "watch `inputdir` for change"
                  , "namespace" : "object in the browser containing the templates"
                  , "include"   : "Glob patterns for templates files to include in `inputdir`"
                  , "stdout"    : "Print the result in stdout instead of writing in a file"
                  , "verbose"   : "Print logs for debug"
                  }
  , defaults = { "inputdir"  : process.cwd()
               , "watch"     : false
               , "namespace" : engines.defaults.namespace
               , "include"   : engines.defaults.include
               , "stdout"    : false
               , "verbose"   : engines.defaults.verbose
               }
  , shortHands = { "t"  : ["--template"]
                 , "i"  : ["--inputdir"]
                 , "o"  : ["--output"]
                 , "w"  : ["--watch"]
                 , "ns" : ["--namespace"]
                 , "I"  : ["--include"]
                 , "s"  : ["--stdout"]
                 , "v"  : ["--verbose"]
                 }
  , options = nopt(knownOpts, shortHands, process.argv, 2)
  , inputdir;

// defaults value
_(defaults).forEach(function(value, key){
    options[key] = options[key] || value;
})

if(!options.template){
  showUsage();
  process.exit(-1);

  function showUsage(){
    var usage = 'Usage: jst [--template format: ' + allowedengine.join('|') + '] [INPUT_DIR] [OUTPUT?]';
    var out = {}
      , getLenght = function( it ){ return it.length }
      , optsLen  = _(_(description).keys()  ).max(getLenght).length
      , descLen  = _(_(description).values()).max(getLenght).length
      , shortLen = _(_(shortHands).keys()   ).max(getLenght).length;

    var shortHands2 = {};
    _(shortHands).forEach(function(value, key){
      var opt = value[0].replace('--', '');
      shortHands2[opt] = key;
    });

    _(description).forEach(function(value, key){
        var cmd = rpad('--' + key + ' -' + shortHands2[key], ' ', optsLen + 8);
      var txt = cmd + value || '';
      out[key] = '  ' + rpad(txt, ' ', optsLen + 12 + descLen);
    });

    _(defaults).forEach(function(value, key){
      out[key] += value
    });

    // string right padding helper
    function rpad(str, padString, length) {
      while (str.length < length)
          str = str + padString;
      return str;
    }

    console.error(usage + '\n');
    console.error(_(out).values().join('\n'));
  }
}

if(options.argv.remain && options.argv.remain.length >=1 ) options.inputdir = options.argv.remain[0];
if(options.argv.remain && options.argv.remain.length >=2 ) options.output = options.argv.remain[1];
if(!options.output) options.stdout = true;

if(!options.inputdir) return optimist.showUsage();

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
  fs.writeFile( output, data, 'utf8', function( err ){
    if( typeof callback == "function" ) callback(err, output);
  });
};

compile();
if(options.watch){
  return watch(options.inputdir, _.debounce(compile, 100));
}
