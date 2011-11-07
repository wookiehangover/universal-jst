/*global jasmine, describe, it, beforeEach */

var tmpl = require('../lib/index.js');

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
    tmpl.build('example/templates', function( output ){
      expect(/sample/.test(output)).toBeTruthy();
      jasmine.asyncSpecDone();
    });

    jasmine.asyncSpecWait();
  });

  it('should parse subtemplates', function(){
    tmpl.build('example/templates', function( output ){
      expect(/multiple_footer/.test( output )).toBeTruthy();
      jasmine.asyncSpecDone();
    });

    jasmine.asyncSpecWait();
  });

});
