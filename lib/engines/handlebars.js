var jst = require('../index.js'),
  fs = require('fs'),
  handlebars = require('handlebars'),
  Path = require('path'),
  helpers = {};

// Returns a string of js with the compiled template
module.exports = function( options, nm, file_contents ){
  var output, compiled_hbs;

  // `options.helpers` directory containing helper files.
  // See `example/handlebars/helpers`
  if(options.helpers && !Object.keys(helpers).length){
    var files = fs.readdirSync(options.helpers)
    files.forEach(function(file){
      if(!/\.js$/.test(file)) return;
      file = file.replace(/\.js$/, '');
      if( options.verbose ) { console.log('Register helper ' + file); }
      var helper = helpers[file] = require(Path.join(options.helpers, file) );

      handlebars.registerHelper(file, helper);
    });
  }

  handlebars.registerPartial(nm, file_contents);

  try {
    // delete any cached versions of the template
    compiled_hbs = handlebars.precompile( file_contents );

    output = nm.slice(0,1) == '_' ?
      [
        'Handlebars.registerPartial("'+ nm.slice( 1, nm.length ) +'", ',
        'Handlebars.template('+ compiled_hbs +'));\n'
      ] : [
        options.namespace + '["'+ nm +'"] = function(context) { return HandlebarsTemplates["'+ nm +'"](context); };',
        'this.HandlebarsTemplates || (this.HandlebarsTemplates = {});',
        'this.HandlebarsTemplates["'+ nm +'"] = Handlebars.template('+ compiled_hbs +');\n'
      ];

  } catch( e ){
    console.error( 'Error processing'+ nm, e);
    return '/* Unable to compile ' + nm + ' */\n';
  }

  return output.join('');
};
