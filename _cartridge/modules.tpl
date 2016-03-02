Module | Version | Repo
------ | ------- | -----
<% modules.forEach(function(module){ %>
<%= module.name %> | <%= module.version %> | (<%= module.site %>)[<%= module.site %>]
<% }); %>
