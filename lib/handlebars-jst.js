var jst = require('./index.js'),
  handlebars = require('handlebars');

// Returns a string of js with the compiled template
jst.compiler = function( nm, file_contents ){
  var output, compiled_hbs;

  try {
    // delete any cached versions of the template
    compiled_hbs = handlebars.precompile( file_contents );

    output = nm.slice(0,1) == '_' ?
      [
        'Handlebars.registerPartial("'+ nm.slice( 1, nm.length ) +'", ',
        'Handlebars.template('+ compiled_hbs +'));\n'
      ] : [
        'this.JST["'+ nm +'"] = function(context) { return HandlebarsTemplates["'+ nm +'"](context); };',
        'this.HandlebarsTemplates || (this.HandlebarsTemplates = {});',
        'this.HandlebarsTemplates["'+ nm +'"] = Handlebars.template('+ compiled_hbs +');\n'
      ];

  } catch( e ){
    console.log( 'Error processing'+ nm, e);
    return '/* Unable to compile ' + nm + ' */\n';
  }

  return output.join('');
};

module.exports = jst;
