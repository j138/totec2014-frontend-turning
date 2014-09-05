// Generated by CoffeeScript 1.8.0
(function() {
  var PASHALIST, Templates;

  PASHALIST = window.PASHALIST = window.PASHALIST || {};

  Templates = (function() {
    function Templates() {}

    Templates.sponsorship = '<li><a href="<%= href %>"><img src="i/sponsorships/<%= fileName %>.png" alt="<%= altText %>"/></a></li>';

    Templates.onlineshopitem = '<li>\n	<p class="photo"><img src="i/onlineshopitems/<%= imgName %>.png" alt="<%= name %>"/></p>\n	<div class="name"><%= name %></div>\n	<div class="summary"><%= summary %></div>\n	<div class="price">＄<%= price %>-<a href="<%= url %>" class="cart"><img src="i/onlineshop-cart.png" alt="add to cart"/></a></div>\n	<div class="productCode">Product code: <%= code %></div>\n</li>';

    Templates.pashalist = '<li>\n	<div class="box1">\n		<div class="box1-1">\n			<p class="photo"><img src="i/pashalists/<%= imgName %>.png" alt="<%= username %>" width="40" height="40" /></p>\n		</div>\n		<div class="box1-2">\n			<p class="username"><%= username %></p>\n			<p class="favorites"><%= favorites %></p>\n		</div>\n	</div>\n	<div class="box2">\n		<p class="summary"><%= summary %></p>\n	</div>\n</li>';

    Templates.top5pashalist = '<li class="top5pahsalistlistitem">\n	<div class="box1">\n		<div class="box1-1">\n			<p class="photo"><img src="i/pashalists/<%= imgName %>.png" alt="<%= username %>" width="130" height="130" /></p>\n		</div>\n		<div class="box1-2">\n			<p class="username"><%= username %></p>\n			<p class="address"><%= address %></p>\n			<p class="summary"><%= summary %></p>\n		</div>\n	</div>\n	<div class="box2">\n		<div class="box2-1">\n			<p class="favorites"><%= favorites %></p>\n		</div>\n		<div class="box2-2">\n			<p class="photos"><%= photos %></p>\n			<p class="socials"><a href="<%= pinteresetUrl %>" class="pitereset"><img src="i/top5pashalist-pintereset.png" alt="pinterest"/></a><a href="<%= twitterUrl %>" class="twitter"><img src="i/top5pashalist-twitter.png" alt="twitter"/></a><a href="<%= facebookUrl %>" class="facebook"><img src="i/top5pashalist-facebook.png" alt="facebook"/></a><a href="<%= googlePlusUrl %>" class="googleplus"><img src="i/top5pashalist-googleplus.png" alt="google plus"/></a></p>\n		</div>\n	</div>\n</li>';

    Templates.freePhoto = '<div class="gridItem"><a href="<%= url %>"><img src="i/photos/<%= imgName %>.png" alt="<%= imgAlt %>"/></a></div>';

    Templates.featured = '<li><img src="i/features/<%= imgName %>.png" width="861" height="483" alt="<%= imgAlt %>"/></li>';

    return Templates;

  })();

  window.PASHALIST.Templates = Templates;

}).call(this);