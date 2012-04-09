var jst = require('../index.js')
  , _ = require('underscore');

// Returns a string of js with the compiled template
module.exports = function( options, nm, file_contents ){

  // apply default underscore settings
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // override those settings
  ['evaluate', 'interpolate', 'escape'].forEach(function(key){
    if( !options[key] ) return;
    if( !_.isRegExp(options[key]) ) options[key] = new RegExp(options[key]);
    _.templateSettings[key] = options[key];
  });

  var func;
  try {
    func = options.namespace + '["'+ nm +'"] = '+ _.template(file_contents).source + ';\n'
  } catch( e ){
    console.error( 'Error processing'+ nm, e);
    return '/* Unable to compile ' + nm + ' */\n';
  }

  return func;
};
