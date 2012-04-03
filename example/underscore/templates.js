(function(){ window.JST || (window.JST = {}) 
window.JST["multiple"] = function anonymous(obj,_) {
var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<h1>', title ,'</h1>\n\n');}return __p.join('');
};

window.JST["multiple_header"] = function anonymous(obj,_) {
var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('\n<h1>', title ,'</h1>\n\n');}return __p.join('');
};

window.JST["multiple_footer"] = function anonymous(obj,_) {
var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('\n<h1>', title ,'</h1>\n\n');}return __p.join('');
};

window.JST["multiple_foo_bar"] = function anonymous(obj,_) {
var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('\n'); if (foo){ ;__p.push('\n  '); _.forEach(foo, function(value){ ;__p.push('\n    <div>', value ,'</div>\n  '); }); ;__p.push('\n'); } ;__p.push('');}return __p.join('');
};

window.JST["sample"] = function anonymous(obj,_) {
var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<h1>', title ,'</h1>\n \n'); if (typeof foo !== 'undefined'){ ;__p.push('\n  '); _.forEach(foo, function(value){ ;__p.push('\n    <div>', value ,'</div>\n  '); }); ;__p.push('\n'); } ;__p.push('\n');}return __p.join('');
};

window.JST["subfolder/subsub/sample"] = function anonymous(obj,_) {
var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<h1>', title ,'</h1>\n \n'); if (typeof foo !== 'undefined'){ ;__p.push('\n  '); _.forEach(foo, function(value){ ;__p.push('\n    <div>', value ,'</div>\n  '); }); ;__p.push('\n'); } ;__p.push('\n');}return __p.join('');
};

})();