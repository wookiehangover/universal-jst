var jst = require('../index.js')
  , dust = require('dustjs-linkedin');

// Returns a string of js with the compiled template
module.exports = function( options, nm, file_contents ){

  var func;
  try {
    func = '; ' + dust.compile(file_contents, nm) + '\n';
    func += options.namespace + '["'+ nm +'"] = function(data, cb){ dust.render("' + nm + '", data, cb); };\n'
  } catch( e ){
    console.error( 'Error processing '+ nm, e, e.stack);
    return '/* Unable to compile ' + nm + ' */\n';
  }

  return func;
};
