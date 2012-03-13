(function(){ window.JST || (window.JST = {}) 

JST.templates || (JST.templates = {});JST.templates["multiple"] = function anonymous($,$item) {
var call,_=[],$data=$item.data;with($data){_.push("");if(typeof(JST.templates.multiple_header)!=="undefined" && (JST.templates.multiple_header)!=null){_=_.concat($item.nest(JST.templates.multiple_header,null));}_.push("\n<p>This is a sample template</p>\n");if(typeof(JST.templates.multiple_foo_bar)!=="undefined" && (JST.templates.multiple_foo_bar)!=null){_=_.concat($item.nest(JST.templates.multiple_foo_bar,null));}_.push("\n\n");if(typeof(JST.templates.multiple_footer)!=="undefined" && (JST.templates.multiple_footer)!=null){_=_.concat($item.nest(JST.templates.multiple_footer,null));}_.push("");}return _.join("");
}; JST["multiple"] = function(d){ return jQuery.tmpl( JST.templates["multiple"], d ); };


JST.templates || (JST.templates = {});JST.templates["multiple_header"] = function anonymous($,$item) {
var call,_=[],$data=$item.data;with($data){_.push("<h1>");if(typeof(title)!=="undefined" && (title)!=null){_.push($.encode((typeof(title)==="function"?(title).call($item):(title))));}_.push("</h1>");}return _.join("");
}; JST["multiple_header"] = function(d){ return jQuery.tmpl( JST.templates["multiple_header"], d ); };


JST.templates || (JST.templates = {});JST.templates["multiple_footer"] = function anonymous($,$item) {
var call,_=[],$data=$item.data;with($data){_.push("<h1>");if(typeof(title)!=="undefined" && (title)!=null){_.push($.encode((typeof(title)==="function"?(title).call($item):(title))));}_.push("</h1>");}return _.join("");
}; JST["multiple_footer"] = function(d){ return jQuery.tmpl( JST.templates["multiple_footer"], d ); };


JST.templates || (JST.templates = {});JST.templates["multiple_foo_bar"] = function anonymous($,$item) {
var call,_=[],$data=$item.data;with($data){_.push("");if((typeof(foo)!=="undefined" && (foo)!=null) && (typeof(foo)==="function"?(foo).call($item):(foo))){_.push("\n  ");if(typeof(foo)!=="undefined" && (foo)!=null){$.each((typeof(foo)==="function"?(foo).call($item):(foo)),function($index, $value){with(this){_.push("\n    <div>");if(typeof($value)!=="undefined" && ($value)!=null){_.push($.encode((typeof($value)==="function"?($value).call($item):($value))));}_.push("</div>\n  ");}});}_.push("\n");}_.push("");}return _.join("");
}; JST["multiple_foo_bar"] = function(d){ return jQuery.tmpl( JST.templates["multiple_foo_bar"], d ); };


JST.templates || (JST.templates = {});JST.templates["sample"] = function anonymous($,$item) {
var call,_=[],$data=$item.data;with($data){_.push("<h1>");if(typeof(title)!=="undefined" && (title)!=null){_.push($.encode((typeof(title)==="function"?(title).call($item):(title))));}_.push("</h1>\n<p>This is a sample template</p>\n");if((typeof(foo)!=="undefined" && (foo)!=null) && (typeof(foo)==="function"?(foo).call($item):(foo))){_.push("\n  ");if(typeof(foo)!=="undefined" && (foo)!=null){$.each((typeof(foo)==="function"?(foo).call($item):(foo)),function($index, $value){with(this){_.push("\n    <div>");if(typeof(value)!=="undefined" && (value)!=null){_.push($.encode((typeof(value)==="function"?(value).call($item):(value))));}_.push("</div>\n  ");}});}_.push("\n");}_.push("");}return _.join("");
}; JST["sample"] = function(d){ return jQuery.tmpl( JST.templates["sample"], d ); };


JST.templates || (JST.templates = {});JST.templates["subfolder/subsub/sample"] = function anonymous($,$item) {
var call,_=[],$data=$item.data;with($data){_.push("<h1>");if(typeof(title)!=="undefined" && (title)!=null){_.push($.encode((typeof(title)==="function"?(title).call($item):(title))));}_.push("</h1>\n<p>This is a sample template</p>\n");if((typeof(foo)!=="undefined" && (foo)!=null) && (typeof(foo)==="function"?(foo).call($item):(foo))){_.push("\n  ");if(typeof(foo)!=="undefined" && (foo)!=null){$.each((typeof(foo)==="function"?(foo).call($item):(foo)),function($index, $value){with(this){_.push("\n    <div>");if(typeof(value)!=="undefined" && (value)!=null){_.push($.encode((typeof(value)==="function"?(value).call($item):(value))));}_.push("</div>\n  ");}});}_.push("\n");}_.push("");}return _.join("");
}; JST["subfolder/subsub/sample"] = function(d){ return jQuery.tmpl( JST.templates["subfolder/subsub/sample"], d ); };


})();