/*jshint onevar: false*/
var fs    = require('fs')
  , join  = require('path').join
  , api   = {};

api.handleError = function( err ){
  console.error('--->\t'+ err);
};

api.process = function process( data, output_dir, callback ){
  var nm = output_dir +'/templates.js'
    , fileData = [
      '(function(){ window.JST || (window.JST = {}) ',
      data.join('\n\n'),
      '})();'
    ];

  fs.writeFile( nm, fileData.join('\n\n'), 'utf8', function( err ){
    if( err ) api.handleError( err );
    console.log(nm +' written.');
    if( typeof callback == "function" ) callback();
  });
};

api.compiler = function(){
  // Override this method for your compiler implementation.
  throw new Error('No JST compiler implemented!' +
                  ' Implement your own, or use handlebars, jquery-tmpl or underscore.');
};

api.build = function build( target_dir, callback ){
  var templates = fs.readdirSync(target_dir)
    , len = templates.length
    , output = []
    , readFiles
    , subTemplate;

  // Reads a file and appends it's template function to @output
  build.readFile = function( index ){
    var tmpl = templates[ index ]
      , nm = tmpl.split('.')[0]
      , path = join(target_dir, tmpl);

    /* Accept every file extension except .js */
    if( /\.js$/.test(tmpl)) return api.handleError('Skip ' + tmpl);
    if(!fs.statSync(path).isFile()) return api.handleError('Skip ' + tmpl);

    var file_contents = fs.readFileSync( path, 'utf8' );

    if( typeof file_contents == 'undefined')
      api.handleError('Error reading'+ path);

    var subs = build.subTemplate( file_contents );

    if( subs ){
      build.subTemplateString( nm, subs, index, file_contents );
    } else {
      output[index] = api.compiler( nm, file_contents );
    }

    return;
  };


  // Parses a raw template file and extracts subtemplates
  build.subTemplate = function( file_contents ){
    var find_subs = /\/\*\s?(\w+)\s?\*\//
      , subs = file_contents.trim().split( find_subs );

    return subs.length > 1 && subs.length % 2 ? subs : false;
  };

  // Builds multi part template string from subtemplates
  build.subTemplateString = function( nm, subs, index, file_contents ){
    output[index] = "";

    var i = 0
      , l = subs.length
      , name;

    for(; i < l; i += 2){
      name = subs[ i - 1 ] != null ? nm +'_'+ subs[ i - 1] : nm;
      output[index] += api.compiler( name, subs[ i ] );
    }
    return;
  };

  // Process each file in the target_directory
  while(len--){
    build.readFile(len);
  }

  if( typeof callback == "function" ){
    return callback.call( api, output );
  } else {
    return output.join('\n\n');
  }
};

module.exports = api;
