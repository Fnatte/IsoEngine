(function() {
	IsoEngine.Entities.White = new Class({
		Extends: IsoEngine.Entities.Entity,
		
		image: null,
		
		initialize: function() {
			this.image = new Image();
			this.image.src = "assets/images/white.png";
		},
		update: function(gameTime) {
			
		},
		render: function(c) {
			c.drawImage(this.image, 0, 0);
		}
	});
})();
