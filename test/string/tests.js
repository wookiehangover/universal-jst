/*jshint onevar: false */
/*globals Handlebars, JST, $ */

module("jst");

test("sample template should exist",function(){
  ok(JST.sample);
});

test("template should compile as expected", function(){
  var data = {
    title: 'foobar'
  };

  var tmp = _.template(JST.sample, data );
  var content = $('<div>').html( tmp );

  equal( content.find('h1').text(), 'foobar');
});


module("multiple templates");

test("should created sub templates", function(){

  ok(window.JST.multiple);
  ok(window.JST.multiple_footer);
  ok(window.JST.multiple_foo_bar);
});

