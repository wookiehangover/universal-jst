/*global jasmine, describe, it, beforeEach */

var tmpl = require('../../lib/jquery-tmpl-jst');

describe('basic requirements', function(){
  it('should exist', function(){
    expect(tmpl).toBeDefined();
  });
});

describe('#build', function(){

  it('should exist', function(){
    expect(tmpl.build).toBeDefined();
  });

  it('should read a directory of tempaltes', function(){
    jasmine.asyncSpecWait();
    tmpl.build('example/jquery-tmpl/templates', function( output ){
      expect(/sample/.test(output)).toBeTruthy();
      jasmine.asyncSpecDone();
    });
  });

  it('should parse subtemplates', function(){
    jasmine.asyncSpecWait();
    tmpl.build('example/jquery-tmpl/templates', function( output ){
      expect(/multiple_footer/.test( output )).toBeTruthy();
      jasmine.asyncSpecDone();
    });
  });

});
