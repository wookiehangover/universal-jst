(function(){ window.JST || (window.JST = {}) 
window.JST.templates || (window.JST.templates = {});
window.JST.templates["partials"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b(_.rp("sample",c,p,""));_.b(_.rp("plain",c,p,""));return _.fl();;}, "partials" );
window.JST["partials"] = function(d){ return window.JST.templates["partials"].render(d, window.JST.templates); };
window.JST.templates || (window.JST.templates = {});
window.JST.templates["sample"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<h1>");_.b(_.v(_.f("title",c,p,0)));_.b("</h1>");_.b("\n");return _.fl();;}, "sample" );
window.JST["sample"] = function(d){ return window.JST.templates["sample"].render(d, window.JST.templates); };
window.JST.templates || (window.JST.templates = {});
window.JST.templates["plain"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("This is a plain template");_.b("\n");return _.fl();;}, "plain" );
window.JST["plain"] = function(d){ return window.JST.templates["plain"].render(d, window.JST.templates); };
})();