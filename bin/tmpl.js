#!/usr/bin/env node

var tmpl = require("../lib/index");

var args = process.argv.slice(0);
// shift off node and script name
args.shift(); args.shift();

var target_dir = args[0] || process.cwd()
  , output_dir = args[1] || process.cwd();

tmpl.build( target_dir, function( data ){
  tmpl.process( data, output_dir );
});
