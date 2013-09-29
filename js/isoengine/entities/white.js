(function() {
	IsoEngine.Entities.White = new Class({
		Extends: IsoEngine.Entities.Entity,
		
		image: null,
		
		initialize: function() {
			this.image = document.createElement('img');
			this.image.src =  engine.imagesPath + "white.png";
		},
		update: function(gameTime) {
			this.parent(gameTime);
		},
		render: function(c) {
			c.drawImage(this.image, 0, 0);
		}
	});
})();
