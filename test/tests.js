module("jquery-tmpl-jst");

test("creates a global JST object",function(){
  expect(1);
  ok(window.JST);
});

module("sample template");

test("sample template should exist",function(){
  ok(JST.sample);
});

test("template should compile as expected", function(){
  expect(2);
  var tmp = JST.sample({ title: 'foobar', foo: [ 'bar', 'bar', 'bar' ] }),
      content = $('<div>').html( tmp );

  equals( content.find('h1').text(), 'foobar');
  equals( content.find('div').length, 3);
});


module("multiple templates");

test("should created sub templates", function(){

  ok(window.JST.multiple);
  ok(window.JST.multiple_footer);
  ok(window.JST.multiple_foo_bar);
});

