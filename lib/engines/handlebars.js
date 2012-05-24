var jst = require('../index.js'),
  fs = require('fs'),
  handlebars = require('handlebars'),
  _ = require('underscore'),
  Path = require('path'),
  helpers = {};

// Returns a string of js with the compiled template
module.exports = function( options, nm, file_contents ){
  var output = [], compiled_hbs;

  // `options.helpers` directory containing helper files.
  // See `example/handlebars/helpers`
  if(options.helpers && !Object.keys(helpers).length){
    var files = fs.readdirSync(options.helpers)
    files.forEach(function(file){
      if(!/\.js$/.test(file)) return;
      file = file.replace(/\.js$/, '');
      if( options.verbose ) { console.log('Register helper ' + file); }
      var helper = helpers[file] = require(Path.resolve(Path.join(options.helpers, file)) );

      output.push('Handlebars.registerHelper("' + file + '", ' + helper.toString() + ');');
    });
  }


  try {
    // delete any cached versions of the template
    compiled_hbs = handlebars.precompile( file_contents );

    output.push(options.namespace + '["'+ nm +'"] = Handlebars.template('+ compiled_hbs +');\n');
    output.push('Handlebars.partials["'+ nm.replace(/\//g, '.') +'"] = ' + options.namespace + '["'+ nm +'"];\n');

    if(options.vars) {
      var vars = recursiveVarSearch( handlebars.parse( file_contents ).statements, [], undefined, [] );
      vars = _.uniq(vars);
      output.push(options.namespace + '["'+ nm +'"].vars = ' + JSON.stringify(vars)+';\n');
    }
  } catch( e ){
    console.error( 'Error processing'+ nm, e);
    return '/* Unable to compile ' + nm + ' */\n';
  }

  return output.join('');
};


// copied from SlexAxton <https://github.com/SlexAxton/require-handlebars-plugin/blob/master/hbs.js>
function composeParts ( parts ) {
    if ( !parts ) {
      return [];
    }
    var res = [parts[0]],
        cur = parts[0],
        i;

    for (i = 1; i < parts.length; ++i) {
      if ( parts.hasOwnProperty(i) ) {
        cur += "." + parts[i];
        res.push( cur );
      }
    }
    return res;
  }


// copied from SlexAxton <https://github.com/SlexAxton/require-handlebars-plugin/blob/master/hbs.js>
function recursiveVarSearch( statements, res, prefix, helpersres ) {
  prefix = prefix ? prefix+"." : "";

  var  newprefix = "", flag = false;

  // loop through each statement
  statements.forEach(function ( statement ) {
    var parts, part, sideways;

    // if it's a mustache block
    if ( statement && statement.type && statement.type === 'mustache' ) {

      // If it has params, the first part is a helper or something
      if ( !statement.params || ! statement.params.length ) {
        parts = composeParts( statement.id.parts );
        for( part in parts ) {
          if ( parts[ part ] ) {
            newprefix = parts[ part ] || newprefix;
            res.push( prefix + parts[ part ] );
          }
        }
        res.push(prefix + statement.id.string);
      }

      // grab the params
      if ( statement.params ) {
        statement.params.forEach(function(param){
          parts = composeParts( param.parts );

          for(var part in parts ) {
            if ( parts[ part ] ) {
              newprefix = parts[part] || newprefix;
              helpersres.push(statement.id.string);
              res.push( prefix + parts[ part ] );
            }
          }
        });
      }
    }

    // If it's a meta block
    if ( statement && statement.mustache  ) {
      recursiveVarSearch( [statement.mustache], res, prefix + newprefix, helpersres );
    }

    // if it's a whole new program
    if ( statement && statement.program && statement.program.statements ) {
      sideways = recursiveVarSearch([statement.mustache],[], "", helpersres)[0] || "";
      recursiveVarSearch( statement.program.statements, res, prefix + newprefix + (sideways ? (prefix+newprefix) ? "."+sideways : sideways : ""), helpersres);
    }
  });
  return res;
}

