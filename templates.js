(function(){ window.JST || (window.JST = {}) 

JST["multiple"] = "";
JST["multiple_header"] = "<h1><%= title %></h1>";
JST["multiple_footer"] = "<h1><%= title %></h1>";
JST["multiple_foo_bar"] = "<% if (foo){ %>  <% _.forEach(foo, function(value){ %>    <div><%= value %></div>  <% }); %><% } %>";


JST["sample"] = "<h1><%= title %></h1> <% if (typeof foo !== 'undefined'){ %>  <% _.forEach(foo, function(value){ %>    <div><%= value %></div>  <% }); %><% } %>";


})();