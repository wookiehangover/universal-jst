var jst = require('./index.js')
  , jqtpl = require('jqtpl')

// Returns a string of js with the compiled template
jst.compiler = function( nm, file_contents ){
  var func;

  try {
    // delete any cached versions of the template
    delete jqtpl.template[nm];

    console.log( 'Building '+ nm );
    func = [
      'JST.templates || (JST.templates = {});',
      'JST.templates["'+ nm +'"] = ',
      jqtpl.template( nm, file_contents ),
      '; JST["'+ nm +'"] = function '+ nm +'(d){ return jQuery.tmpl( JST.templates["'+ nm +'"], d ); };\n'
    ];
  } catch( e ){
    console.log( 'Error processing'+ nm, e);
    return '/* Unable to compile ' + nm + ' */\n';
  }

  return func.join('');
};

module.exports = jst;
