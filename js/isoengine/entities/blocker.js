(function() {
	IsoEngine.Entities.Blocker = new Class({
		Extends: IsoEngine.Entities.Entity,
		
		image: null,
		owner: null,
		hidden: true,
		
		initialize: function(owner) {
			this.image = new Image();
			this.image.src = engine.imagesPath + "player.png";
			this.owner = owner;
		},
		update: function(gameTime) {},
		render: function(c) {
			if(this.hidden) return;
			c.translate(this.movingOffset.x, this.movingOffset.y);
			c.drawImage(this.image, 0, -16 - 13*(this.z-1));
		}
	});
})();
