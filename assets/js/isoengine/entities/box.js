(function() {
	IsoEngine.Entities.Box = new Class({
		Extends: IsoEngine.Entities.Entity,
		
		image: null,
		
		initialize: function() {
			this.image = new Image();
			this.image.src = "assets/images/box.png";
		},
		update: function(gameTime) {
			
		},
		render: function(c) {
			c.drawImage(this.image, 0, -16 - 13*(this.z-1));
		}
	});
})();
