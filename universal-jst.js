var jst = exports.compile = function jst( inputdir, outputdir, engine ){

  engine = engine || 'handlebars';

  var allowedTmpl = 'string|underscore|_|jquery-tmpl|handlebars|hbs';

  var tmpl;
  try{
    tmpl = require('../lib/' + engine + '-jst');
  }catch(e){
    return console.error('--template ' + engine + ' is not allowed. Use ' + allowedTmpl);
  }

  tmpl.build( inputdir, function( data ){
    tmpl.process( data, outputdir );
  });

};
