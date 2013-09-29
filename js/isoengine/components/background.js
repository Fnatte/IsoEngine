(function() {
	IsoEngine.Components.Background = new Class({
		Extends: IsoEngine.Components.Component,
		image: null,
		
		initialize: function(engine, image) {
			this.parent(engine);
			this.image = document.createElement('img');
			this.image.src = engine.imagesPath + image;
		},
		update: function(gameTime) {},
		render: function(c) {
			c.drawImage(this.image, 0, 0);
		}
	});
})();
