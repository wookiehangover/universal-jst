/*jshint onevar: false*/
var fs         = require('fs')
  , path       = require('path')
  , glob       = require("glob")
  , _          = require("underscore")
  , async      = require('async')
  , ENGINES    = path.join(__dirname, './engines/');

var defaults = exports.defaults = {
  namespace: 'window.JST',
  include: '**/*',
  verbose: false
};

var handleError = exports.handleError = function( err, data ){
  if(err){
    err = err.message ? err.message : err;
    return console.error('--->\t'+ err);
  }
}

fs.readdirSync(ENGINES).forEach(function(file){
  if(!/\.js$/.test(file)) return;
  var engineName = file.replace('.js', '')
    , compiler   = require(path.join(ENGINES, engineName));

  // exports each engine.
  exports[engineName] = build;

  function build(inputdir, options, callback){
    if(typeof options == 'function') {
      callback = options;
      options = {};
    }
    if (!options) options = {};
    if (!callback) callback = function(){};
    options = _.extend({}, defaults, options);

    // arrays of compiled templates
    var compiledTemplates = [];

    if( options.verbose ) { console.log('Read dir: ' + inputdir); }

    // list each file in inputdir folder and subfolders
    glob(options.include, {cwd: inputdir}, function(err, files){
      files = files.filter(function(file){
        if(!file) return;

        // Filter files with `.js` extension.
        if(/\.js$/.test(file)) {
          handleError('Skip ' + file);
          return false;
        }

        // Filter folders
        if(/\/$/.test(file)) return false;

        return true;
      }).map(function(file){
        // normalize the file name
        return file.replace(inputdir, '').replace(/^\//, '');
      })

      async.forEach(files, readFile, function(err){
        // errors are logged in readFile. No need to print them here.
        var fileData =
          ['(function(){ ' + options.namespace + ' || (' + options.namespace + ' = {}) ']
          .concat(compiledTemplates)
          .concat(['})();']);
        return callback(null, fileData);
      });
    });


    // Read each file, compile them, and append the result in the `compiledTemplates array`
    function readFile(file, cb){
      var file = path.normalize(file)
        , fpath = path.join(inputdir, file);
      fs.stat(fpath, function(err, stat){
        if(err) { handleError(err); return  cb(); }
        if(!stat.isFile()) {
          if( options.verbose ) { handleError('Skip ' + file); }
          return cb();
        }

        fs.readFile(fpath, 'utf8', function(err, text){
          if(err) { handleError(err); return cb() }

          var subs = subTemplate( text )
            , nm = path.join(path.dirname(file), path.basename(file, path.extname(file))).replace(/\\/g, '/'); // windows users should have the same JST key.

          if( options.verbose ) console.log('Building ' + options.namespace + '["' + nm + '"]');
          if( subs ){
            subTemplateString( nm, subs, text );
          } else {
            compiledTemplates.push(compiler( options, nm, text ));
          }
          cb();
        });
      });
    }

    // Parses a raw template file and extracts subtemplates
    function subTemplate( file_contents ){
      var find_subs = /\/\*\s?(\w+)\s?\*\//
        , subs = file_contents.trim().split( find_subs );

      return subs.length > 1 && subs.length % 2 ? subs : false;
    };

    // Builds multi part template string from subtemplates
     function subTemplateString( nm, subs, file_contents ){
      var i = 0
        , l = subs.length
        , name;

      for(; i < l; i += 2){
        name = subs[ i - 1 ] != null ? nm +'_'+ subs[ i - 1] : nm;
        compiledTemplates.push(compiler( options, name, subs[ i ] ));
      }
      return;
    };

  };

});
