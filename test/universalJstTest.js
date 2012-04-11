var vows     = require('vows'),
  assert     = require('assert'),
  fs         = require('fs'),
  _          = require('underscore'),
  join       = require('path').join,
  Handlebars = require('handlebars'),
  jqtpl      = require('jqtpl'),
  vm         = require('vm'),
  engines    = require('../lib/index');

function example(name){
  return join(__dirname, '..', 'example', name, 'templates') ;
}

function noop(){}

vows.describe('Test universal JST').addBatch({
  'When creating string JST': {
    topic: function(){
      engines.string(example('string'), this.callback)
    },
    'Then an array is returned': function(arr){
      assert.equal(arr.length, 7);
    },
    'Then the templates are valid': function(arr){
      var str = arr.join('\n');
      var window = {};
      vm.runInNewContext(str, {window: window});
      assert.include(window.JST.sample, 'h1');
      assert.include(window.JST.multiple, 'h1');
      assert.include(window.JST.multiple_header, 'h1');
      assert.include(window.JST.multiple_footer, 'h1');
      assert.include(window.JST.multiple_foo_bar, 'div');
    }
  },
  'When compiling underscore JST': {
    topic: function(){
      engines.underscore(example('underscore'), this.callback)
    },
    'Then an array is returned': function(arr){
      assert.equal(arr.length, 8);
    },
    'Then the templates are valid': function(arr){
      var str = arr.join('\n');
      var window = {};
      vm.runInNewContext(str, { window: window, _: _ });
      assert.include(window.JST.sample({ title: 'hello', foo: [1,2,3] }), '<div>1</div>');
      assert.include(window.JST.multiple({ title: 'hello' }), '<h1>hello</h1>');
      assert.include(window.JST.multiple_header({ title: 'hello'}), '<h1>hello</h1>');
      assert.include(window.JST.multiple_footer({ title: 'hello'}), '<h1>hello</h1>');
      assert.include(window.JST.multiple_foo_bar({ foo: [1,2,3] }), '<div>1</div>');
      assert.include(window.JST["subfolder/subsub/sample"]({ title: 'hello', foo: [1,2,3] }), '<div>1</div>');
    }
  },
  'When compiling underscore JST with a mustache interpolate regex': {
    topic: function(){
      engines.underscore(
        example('handlebars'),
        { include: 'sample.hbs', interpolate: '\{\{(.+?)\}\}'},
        this.callback);
    },
    'Then an array is returned': function(arr){
      assert.equal(arr.length, 3);
    },
    'Then the templates are valid': function(arr){
      var str = arr.join('\n');
      var window = {};
      vm.runInNewContext(str, { window: window, _: _ });
      assert.include(window.JST.sample({ title: 'hello' }), '<h1>hello</h1>');
    }
  },
  'When compiling handlebars JST': {
    topic: function(){
      engines.handlebars(example('handlebars'), this.callback)
    },
    'Then an array is returned': function(arr){
      assert.equal(arr.length, 8);
    },
    'Then the templates are valid': function(arr){
      var str = arr.join('\n');
      var window = {};
      vm.runInNewContext(str, { window: window, Handlebars: Handlebars });
      assert.include(window.JST.sample({ title: 'hello' }), '<h1>hello</h1>');
      assert.include(window.JST.multiple({ title: 'hello'}), '<h1>hello</h1>');
      assert.include(window.JST.multiple_footer({ title: 'hello'}), '<h1>hello</h1>');
      assert.include(window.JST.multiple_foo_bar({ foo: [1,2,3] }), '<div>1</div>');
      assert.include(window.JST["subfolder/subsub/sample"]({ title: 'hello'}), '<h1>hello</h1>');
    }
  },
  'When compiling jQuery tmpl JST': {
    topic: function(){
      engines['jquery-tmpl'](example('jquery-tmpl'), this.callback)
    },
    'Then an array is returned': function(arr){
      assert.equal(arr.length, 8);
    },
    'Then the templates are valid': function(arr){
      var str = arr.join('\n');
      var window = {};
      vm.runInNewContext(str, { window: window, jQuery: jqtpl });
      assert.include(window.JST.sample({ title: 'hello' }), '<h1>hello</h1>');
      //assert.include(window.JST.multiple({ title: 'hello'}), '<h1>hello</h1>');
      assert.include(window.JST.multiple_footer({ title: 'hello'}), '<h1>hello</h1>');
      assert.include(window.JST.multiple_foo_bar({ foo: [1,2,3] }), '<div>1</div>');
      assert.include(window.JST["subfolder/subsub/sample"]({ title: 'hello'}), '<h1>hello</h1>');
    }
  }
}).export(module);
