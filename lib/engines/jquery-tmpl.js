var jst = require('../index.js')
  , jqtpl = require('jqtpl')

// Returns a string of js with the compiled template
module.exports = function( options, nm, file_contents ){
  var func;

  try {
    // delete any cached versions of the template
    delete jqtpl.template[nm];

    func = [
      options.namespace + '.templates || (' + options.namespace + '.templates = {});',
      options.namespace + '.templates["'+ nm +'"] = ',
      jqtpl.template( nm, file_contents ) + ';',
      options.namespace + '["'+ nm +'"] = function(d){ return jQuery.tmpl( ' + options.namespace + '.templates["'+ nm +'"], d ); };\n'
    ];
  } catch( e ){
    console.log( 'Error processing'+ nm, e);
    return '/* Unable to compile ' + nm + ' */\n';
  }

  return func.join('');
};
