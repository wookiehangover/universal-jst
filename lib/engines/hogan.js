var jst = require('../index.js')
  , hogan = require('hogan.js');

// Returns a string of js with the compiled template
module.exports = function( options, nm, file_contents ){
  options.asString = 1;
  var func;
  try {
    func = [
      options.namespace + '.templates || (' + options.namespace + '.templates = {});',
      options.namespace + '.templates["'+ nm +'"] = new Hogan.Template(' + hogan.compile(file_contents, options) + ', "' + nm +'" );',
      options.namespace + '["'+ nm +'"] = function(d){ return ' + options.namespace + '.templates["'+ nm +'"].render(d, ' + options.namespace + '.templates' + '); };'
    ];
  } catch( e ){
    console.error( 'Error processing '+ nm, e, e.stack);
    return '/* Unable to compile ' + nm + ' */\n';
  }
  return func.join('\n');
};
