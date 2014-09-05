PASHALIST=window.PASHALIST=window.PASHALIST||{}

class Templates
	@sponsorship: '''
		<li><a href="<%= href %>"><img src="i/sponsorships/<%= fileName %>.png" alt="<%= altText %>"/></a></li>
		'''
	@onlineshopitem: '''
		<li>
			<p class="photo"><img src="i/onlineshopitems/<%= imgName %>.png" alt="<%= name %>"/></p>
			<div class="name"><%= name %></div>
			<div class="summary"><%= summary %></div>
			<div class="price">＄<%= price %>-<a href="<%= url %>" class="cart"><img src="i/onlineshop-cart.png" alt="add to cart"/></a></div>
			<div class="productCode">Product code: <%= code %></div>
		</li>
		'''
	@pashalist: '''
		<li>
			<div class="box1">
				<div class="box1-1">
					<p class="photo"><img src="i/pashalists/<%= imgName %>.png" alt="<%= username %>" width="40" height="40" /></p>
				</div>
				<div class="box1-2">
					<p class="username"><%= username %></p>
					<p class="favorites"><%= favorites %></p>
				</div>
			</div>
			<div class="box2">
				<p class="summary"><%= summary %></p>
			</div>
		</li>
		'''
	@top5pashalist: '''
		<li class="top5pahsalistlistitem">
			<div class="box1">
				<div class="box1-1">
					<p class="photo"><img src="i/pashalists/<%= imgName %>.png" alt="<%= username %>" width="130" height="130" /></p>
				</div>
				<div class="box1-2">
					<p class="username"><%= username %></p>
					<p class="address"><%= address %></p>
					<p class="summary"><%= summary %></p>
				</div>
			</div>
			<div class="box2">
				<div class="box2-1">
					<p class="favorites"><%= favorites %></p>
				</div>
				<div class="box2-2">
					<p class="photos"><%= photos %></p>
					<p class="socials"><a href="<%= pinteresetUrl %>" class="pitereset"><img src="i/top5pashalist-pintereset.png" alt="pinterest"/></a><a href="<%= twitterUrl %>" class="twitter"><img src="i/top5pashalist-twitter.png" alt="twitter"/></a><a href="<%= facebookUrl %>" class="facebook"><img src="i/top5pashalist-facebook.png" alt="facebook"/></a><a href="<%= googlePlusUrl %>" class="googleplus"><img src="i/top5pashalist-googleplus.png" alt="google plus"/></a></p>
				</div>
			</div>
		</li>
		'''
	@freePhoto: '''
		<div class="gridItem"><a href="<%= url %>"><img src="i/photos/<%= imgName %>.png" alt="<%= imgAlt %>"/></a></div>
		'''
	@featured: '''
		<li><img src="i/features/<%= imgName %>.png" width="861" height="483" alt="<%= imgAlt %>"/></li>
		'''

window.PASHALIST.Templates=Templates
