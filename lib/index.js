/*jshint onevar: false*/
var fs         = require('fs')
  , join       = require('path').join
  , listFiles  = require('read-dir-files').list
  , async      = require('async')
  , api        = {};

api.handleError = function( err ){
  err = err.message ? err.message : err;
  console.error('--->\t'+ err);
};

// merge the compiledTemplates inside a JST string, and write the result in
// output.
api.process = function process(compiledTemplates, output, callback ){
  fs.stat(output, function(err, stat){
    if(err) return api.handleError(err);
    if(stat.isFile()){
      // do nothing
    }else if(stat.isDirectory()){
      // if `output` is a directory, create a new file called `templates.js` in this directory.
      output = join(output, 'templates.js');
    }else{
      return api.handleError(ouput, 'is not a file nor a directory');
    }
    var fileData = [
        '(function(){ window.JST || (window.JST = {}) ',
        compiledTemplates.join('\n\n'),
        '})();'
      ];

    fs.writeFile( output, fileData.join('\n\n'), 'utf8', function( err ){
      if( err ) api.handleError( err );
      console.log(output +' written.');
      if( typeof callback == "function" ) callback();
    });
  });
};

api.compiler = function(){
  // Override this method for your compiler implementation.
  throw new Error('No JST compiler implemented!' +
                  ' Implement your own, or use handlebars, jquery-tmpl or underscore.');
};

api.build = function build( target_dir, callback ){
  // arrays of compiled templates
  var output = [];

  listFiles(target_dir, {normalize: false, recursive: true}, function(err, files){

    files = files.map(function(file){ return file.replace(files[0], ''); });
    files = files.filter(function(file){
      if(!file) return;

      // Filter files with `.js` extension.
      if(/\.js$/.test(file)) {
        api.handleError('Skip ' + file);
        return false;
      }

      // Filter folders
      if(/\/$/.test(file)) return false;

      return true;
    });

    async.forEach(files, build.readFile, function(){
      // errors are logged in readFile. No need to print them here.
      if( typeof callback == "function" ) return callback.call( api, output );
    });
  });


  // Read each file, compile them, and append the result in the `output array`
  build.readFile = function readFile(file, cb){
    var path = join(target_dir, file);
    fs.stat(path, function(err, stat){
      if(err) return api.handleError(err);
      if(!stat.isFile()) return api.handleError('Skip ' + file);

      fs.readFile(path, 'utf8', function(err, text){
        if(err) return api.handleError(err);

        var subs = build.subTemplate( text )
          , nm = join(file).split('.')[0];

        console.log('Building JST["' + nm + '"]');
        if( subs ){
          build.subTemplateString( nm, subs, text );
        } else {
          output.push(api.compiler( nm, text ));
        }
        cb();
      });
    });
  }

  // Parses a raw template file and extracts subtemplates
  build.subTemplate = function( file_contents ){
    var find_subs = /\/\*\s?(\w+)\s?\*\//
      , subs = file_contents.trim().split( find_subs );

    return subs.length > 1 && subs.length % 2 ? subs : false;
  };

  // Builds multi part template string from subtemplates
  build.subTemplateString = function( nm, subs, file_contents ){
    var i = 0
      , l = subs.length
      , name;

    for(; i < l; i += 2){
      name = subs[ i - 1 ] != null ? nm +'_'+ subs[ i - 1] : nm;
      output.push(api.compiler( name, subs[ i ] ));
    }
    return;
  };

};

module.exports = api;
