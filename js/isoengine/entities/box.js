(function() {
	IsoEngine.Entities.Box = new Class({
		Extends: IsoEngine.Entities.Entity,
		
		image: null,
		
		initialize: function() {
			this.image = document.createElement('img');
			this.image.src = engine.imagesPath + "box.png";
		},
		update: function(gameTime) {
			this.parent(gameTime);
			if(!this.isMoving) {
				
				var x = 0;
				var y = 0;
				do {
					x = Math.round(Math.random()*2-1);
					y = Math.round(Math.random()*2-1);
				} while(Math.abs(x) == Math.abs(y));
				
				this.move(this.x+x, this.y+y, 1);
			}
		},
		render: function(c) {
			c.translate(this.movingOffset.x, this.movingOffset.y);
			c.drawImage(this.image, 0, -16 - 13*(this.z-1));
		}
	});
})();
