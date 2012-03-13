var jst = require('./index.js')
  , _ = require('underscore')

// Pulled from underscore 1.3.1
function underscoreTemplating(str) {
    var c  = _.templateSettings;
    var tmpl = '' +
      'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
      'with(obj||{}){__p.push(\'' +
      str.replace(/\\/g, '\\\\')
         .replace(/'/g, "\\'")
         .replace(c.escape || noMatch, function(match, code) {
           return "',_.escape(" + code.replace(/\\'/g, "'") + "),'";
         })
         .replace(c.interpolate || noMatch, function(match, code) {
           return "'," + code.replace(/\\'/g, "'") + ",'";
         })
         .replace(c.evaluate || noMatch, function(match, code) {
           return "');" + code.replace(/\\'/g, "'")
                              .replace(/[\r\n\t]/g, ' ')
                              .replace(/\\\\/g, '\\') + ";__p.push('";
         })
         .replace(/\r/g, '\\r')
         .replace(/\n/g, '\\n')
         .replace(/\t/g, '\\t')
         + "');}return __p.join('');";

    return new Function('obj', '_', tmpl).toString();
};

// Returns a string of js with the compiled template
jst.compiler = function( nm, file_contents ){
  var func;
  try {
    func = 'JST["'+ nm +'"] = '+ underscoreTemplating(file_contents) + ';\n'
  } catch( e ){
    console.error( 'Error processing'+ nm, e);
    return '/* Unable to compile ' + nm + ' */\n';
  }

  return func;
};

module.exports = jst;
