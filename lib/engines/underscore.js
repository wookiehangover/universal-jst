var jst = require('../index.js')
  , _ = require('underscore');

// Returns a string of js with the compiled template
module.exports = function( options, nm, file_contents ){

  // override those settings
  ['evaluate', 'interpolate', 'escape'].forEach(function(key){
    if( !options[key] ) return;
    if( !_.isRegExp(options[key]) ) options[key] = new RegExp(options[key]);
  });

  var func;
  try {
    func = options.namespace + '["'+ nm +'"] = '+ _.template(file_contents, null, options).source + ';\n'
  } catch( e ){
    console.error( 'Error processing '+ nm, e, e.stack);
    return '/* Unable to compile ' + nm + ' */\n';
  }

  return func;
};
