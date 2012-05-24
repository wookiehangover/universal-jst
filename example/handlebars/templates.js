(function(){ window.JST || (window.JST = {}) 
Handlebars.registerHelper("fullName", function (person) {
  return person.firstName + " " + person.lastName + " " + foo();

  function foo(){
    return 'foo';
  }
});window.JST["helpers"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n  <h2>By ";
  foundHelper = helpers.author;
  stack1 = foundHelper || depth0.author;
  foundHelper = helpers.fullName;
  stack2 = foundHelper || depth0.fullName;
  if(typeof stack2 === functionType) { stack1 = stack2.call(depth0, stack1, { hash: {} }); }
  else if(stack2=== undef) { stack1 = helperMissing.call(depth0, "fullName", stack1, { hash: {} }); }
  else { stack1 = stack2; }
  buffer += escapeExpression(stack1) + "</h2>\n  <div class=\"body\">";
  foundHelper = helpers.body;
  stack1 = foundHelper || depth0.body;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "body", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</h2>\n  ";
  return buffer;}

  buffer += "<div class=\"post\">\n  <h1>By ";
  foundHelper = helpers.author;
  stack1 = foundHelper || depth0.author;
  foundHelper = helpers.fullName;
  stack2 = foundHelper || depth0.fullName;
  if(typeof stack2 === functionType) { stack1 = stack2.call(depth0, stack1, { hash: {} }); }
  else if(stack2=== undef) { stack1 = helperMissing.call(depth0, "fullName", stack1, { hash: {} }); }
  else { stack1 = stack2; }
  buffer += escapeExpression(stack1) + "</h1>\n  <div class=\"body\">";
  foundHelper = helpers.body;
  stack1 = foundHelper || depth0.body;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "body", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</div>\n\n  <h1>Comments</h1>\n\n  ";
  foundHelper = helpers.comments;
  stack1 = foundHelper || depth0.comments;
  stack2 = helpers.each;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n";
  return buffer;});
Handlebars.partials["helpers"] = window.JST["helpers"];
window.JST["helpers"].vars = ["author","body","body.comments","body.comments.author","body.comments.body"];

window.JST["multiple"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;


  buffer += "<h1>";
  foundHelper = helpers.title;
  stack1 = foundHelper || depth0.title;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "title", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</h1>\n\n";
  return buffer;});
Handlebars.partials["multiple"] = window.JST["multiple"];
window.JST["multiple"].vars = ["title"];

window.JST["multiple_footer"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;


  buffer += "\n<h1>";
  foundHelper = helpers.title;
  stack1 = foundHelper || depth0.title;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "title", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</h1>\n\n";
  return buffer;});
Handlebars.partials["multiple_footer"] = window.JST["multiple_footer"];
window.JST["multiple_footer"].vars = ["title"];

window.JST["multiple_foo_bar"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n  ";
  foundHelper = helpers.foo;
  stack1 = foundHelper || depth0.foo;
  stack2 = helpers.each;
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
  foundHelper = helpers.foo;
  stack1 = foundHelper || depth0.foo;
  stack2 = helpers['if'];
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;});
Handlebars.partials["multiple_foo_bar"] = window.JST["multiple_foo_bar"];
window.JST["multiple_foo_bar"].vars = ["foo","foo..foo","foo..foo."];

window.JST["partials"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials;
  var buffer = "", stack1, foundHelper, self=this;


  stack1 = depth0;
  stack1 = self.invokePartial(partials.sample, 'sample', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.plain, 'plain', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  stack1 = depth0;
  stack1 = self.invokePartial(partials['subfolder.subsub._sample'], 'subfolder.subsub._sample', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;});
Handlebars.partials["partials"] = window.JST["partials"];
window.JST["partials"].vars = [];

window.JST["sample"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;


  buffer += "<h1>";
  foundHelper = helpers.title;
  stack1 = foundHelper || depth0.title;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "title", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</h1>\n\n";
  return buffer;});
Handlebars.partials["sample"] = window.JST["sample"];
window.JST["sample"].vars = ["title"];

window.JST["plain"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "<p>This is a plain template</p>\n\n";});
Handlebars.partials["plain"] = window.JST["plain"];
window.JST["plain"].vars = [];

window.JST["subfolder/subsub/_sample"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "<h1>This is a partial in a subdirectory</h1>";});
Handlebars.partials["subfolder.subsub._sample"] = window.JST["subfolder/subsub/_sample"];
window.JST["subfolder/subsub/_sample"].vars = [];

window.JST["subfolder/subsub/sample"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;


  buffer += "<h1>";
  foundHelper = helpers.title;
  stack1 = foundHelper || depth0.title;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "title", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</h1>\n";
  return buffer;});
Handlebars.partials["subfolder.subsub.sample"] = window.JST["subfolder/subsub/sample"];
window.JST["subfolder/subsub/sample"].vars = ["title"];

})();
