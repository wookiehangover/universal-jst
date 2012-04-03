(function(){ window.JST || (window.JST = {}) 
window.JST["multiple"] = "<h1>You rock!</h1>";

window.JST["multiple_header"] = "<h1><%= title %></h1>";

window.JST["multiple_footer"] = "<h1><%= title %></h1>";

window.JST["multiple_foo_bar"] = "<% if (foo){ %>  <% _.forEach(foo, function(value){ %>    <div><%= value %></div>  <% }); %><% } %>";

window.JST["sample"] = "<h1 class=\"toto\"><%= title %></h1><% if (typeof foo !== 'undefined'){ %>  <% _.forEach(foo, function(value){ %>    <div><%= value %></div>  <% }); %><% } %>";

})();