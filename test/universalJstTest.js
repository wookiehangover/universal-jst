var vows     = require('vows'),
  assert     = require('assert'),
  fs         = require('fs'),
  _          = require('underscore'),
  join       = require('path').join,
  Handlebars = require('handlebars'),
  hogan      = require('hogan.js'),
  dust       = require('dustjs-linkedin'),
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
      assert.equal(arr.length, 9);
    },
    'Then the templates are valid': function(arr){
      var str = arr.join('\n');
      var window = {};
      vm.runInNewContext(str, { window: window, _: _ });
      assert.include(window.JST.sample({ title: 'hello', foo: [1,2,3] }), '<div>1</div>');
      assert.include(window.JST["sample.with.dots"]({ title: 'hello', foo: [1,2,3] }), '<div>1</div>');
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
      engines.handlebars(example('handlebars'), {
        helpers: join(__dirname, '..', 'example', 'handlebars', 'helpers')
      }, this.callback)
    },
    'Then an array is returned': function(arr){
      assert.equal(arr.length, 11);
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

      var context = {
        author: {firstName: "Alan", lastName: "Johnson"},
        body: "I Love Handlebars",
        comments: [{
          author: {firstName: "Yehuda", lastName: "Katz"},
          body: "Me too!"
        }]
      };
      assert.include(window.JST.helpers(context), '<h1>By Alan Johnson');
      assert.include(window.JST.partials({ title: 'hello'}), '<h1>hello</h1>');
      assert.include(window.JST.partials({ title: 'hello'}), 'This is a plain template');
      assert.include(window.JST.partials({ title: 'hello'}), 'This is a partial in a subdirectory');
    }
  },
  'when compiling jquery tmpl jst': {
    topic: function(){
      engines['jquery-tmpl'](example('jquery-tmpl'), this.callback)
    },
    'then an array is returned': function(arr){
      assert.equal(arr.length, 8);
    },
    'then the templates are valid': function(arr){
      var str = arr.join('\n');
      var window = {};
      vm.runInNewContext(str, { window: window, jQuery: jqtpl });
      assert.include(window.JST.sample({ title: 'hello' }), '<h1>hello</h1>');
      //assert.include(window.JST.multiple({ title: 'hello'}), '<h1>hello</h1>');
      assert.include(window.JST.multiple_footer({ title: 'hello'}), '<h1>hello</h1>');
      assert.include(window.JST.multiple_foo_bar({ foo: [1,2,3] }), '<div>1</div>');
      assert.include(window.JST["subfolder/subsub/sample"]({ title: 'hello'}), '<h1>hello</h1>');
    }
  },
  'when compiling dust jst': {
    topic: function(){
      engines.dust(example('dust'), this.callback)
    },
    'then an array is returned': function(arr){
      assert.equal(arr.length, 5);
    },
    'When asynchronously executing the sample template': {
      topic: function(arr){
        var window = {};
        vm.runInNewContext(arr.join('\n'), { window: window, dust: dust });

        function asyncHelloWorld(chunk) {
            return chunk.map(function(chunk) {
              dust.nextTick(function() {
                chunk.end("hello");
              });
            });
        }
        window.JST.sample({ title: asyncHelloWorld }, this.callback);
      },
      'Then the result is valid': function(err, str){
        assert.include(str, '<h1>hello</h1>')
      }
    },
    'When synchronously executing the sample template': {
      topic: function(arr){
        var window = {};
        vm.runInNewContext(arr.join('\n'), { window: window, dust: dust });
        window.JST.sample({ title: 'hello' }, this.callback);
      },
      'Then the result is valid': function(err, str){
        assert.include(str, '<h1>hello</h1>')
      }
    },
    'When executing the partials template': {
      topic: function(arr){
        var window = {};
        vm.runInNewContext(arr.join('\n'), { window: window, dust: dust });
        window.JST.partials({ title: 'hello', ref: "sample" }, this.callback);
      },
      'Then the result is valid': function(err, str){
        assert.include(str, '<h1>hello</h1>')
        assert.include(str, 'This is a plain template')
      }
    }
  },
  'when compiling hogan': {
    topic: function(){
      engines['hogan'](example('hogan'), this.callback)
    },
    'then an array is returned': function(arr){
      assert.equal(arr.length, 5);
    },
    'then the templates are valid': function(arr){
      var str = arr.join('\n');
      var window = {};
      vm.runInNewContext(str, { window: window, Hogan: hogan });
      assert.include(window.JST.sample({ title: 'hello' }), '<h1>hello</h1>');
      assert.include(window.JST.partials({ title: 'hello'}), '<h1>hello</h1>');
      assert.include(window.JST.partials({ title: 'hello'}), 'This is a plain template');
    }
  },
}).export(module);
