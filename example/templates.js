(function() {Handlebars.registerPartial("partial", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;


  buffer += "<div>woot- ";
  stack1 = helpers.foo || depth0.foo
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "foo", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</div>\n";
  return buffer;}));}).call(this);

(function(){this.JST || (this.JST = {});this.JST["multiple"] = function(context) { return HandlebarsTemplates["multiple"](context); };this.HandlebarsTemplates || (this.HandlebarsTemplates = {});this.HandlebarsTemplates["multiple"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;


  buffer += "<h1>";
  stack1 = helpers.title || depth0.title
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "title", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</h1>\n\n";
  return buffer;});}).call(this);(function(){this.JST || (this.JST = {});this.JST["multiple_footer"] = function(context) { return HandlebarsTemplates["multiple_footer"](context); };this.HandlebarsTemplates || (this.HandlebarsTemplates = {});this.HandlebarsTemplates["multiple_footer"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;


  buffer += "\n<h1>";
  stack1 = helpers.title || depth0.title
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "title", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</h1>\n\n";
  return buffer;});}).call(this);(function(){this.JST || (this.JST = {});this.JST["multiple_foo_bar"] = function(context) { return HandlebarsTemplates["multiple_foo_bar"](context); };this.HandlebarsTemplates || (this.HandlebarsTemplates = {});this.HandlebarsTemplates["multiple_foo_bar"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n  ";
  stack1 = helpers.foo || depth0.foo
  stack2 = helpers.each
  tmp1 = self.program(2, program2, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div>";
  stack1 = depth0;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</div>\n  ";
  return buffer;}

  buffer += "\n";
  stack1 = helpers.foo || depth0.foo
  stack2 = helpers['if']
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;});}).call(this);

(function(){this.JST || (this.JST = {});this.JST["sample"] = function(context) { return HandlebarsTemplates["sample"](context); };this.HandlebarsTemplates || (this.HandlebarsTemplates = {});this.HandlebarsTemplates["sample"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;


  buffer += "<h1>";
  stack1 = helpers.title || depth0.title
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "title", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</h1>\n<p>This is a sample template</p>\n\n";
  return buffer;});}).call(this);