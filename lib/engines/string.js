// Leave your template strings as strings, and compile them later
var jst = require('../index.js')
  , _ = require('underscore');

// Returns a string of js with the compiled template
module.exports = function( options, nm, file_contents ){
  var func;
  try {
    func = options.namespace + '["'+ nm +'"] = "'+ file_contents.replace(/"/g, '\\"').replace(/\n/g, '').replace(/\r/g, '') + '";\n'
  } catch( e ){
    console.error( 'Error processing'+ nm, e);
    return '/* Unable to compile ' + nm + ' */\n';
  }

  return func;
};
