#!/usr/bin/env node

var optimist = require('optimist'),
  fs = require('fs'),
  watch = require('watch').watchTree,
  _ = require('underscore'),
  allowedTmpl = 'string|underscore|_|jquery-tmpl|handlebars|hbs';
  argv = optimist.usage('Usage: $0 [--template ' + allowedTmpl + ']')
  .alias('inputdir', 'i')
  .alias('outputdir', 'o')
  .alias('template', 't')
  .alias('watch', 'w')
  .demand('template')
  .default('inputdir', process.cwd())
  .default('outputdir', process.cwd())
  .default('watch', false)
  .argv;

var tmpl;
try{
  tmpl = require('../lib/' + argv.template + '-jst');
}catch(e){
  return console.error('--template ' + argv.template + ' is not allowed. Use ' + allowedTmpl);
}

function compile(){
  tmpl.build( argv.inputdir, function( data ){
    tmpl.process( data, argv.outputdir );
  });
}

compile.throttled = _.throttle(compile, 100);

compile();
if(argv.watch){
  return watch(argv.inputdir, compile.throttled);
}
