(function() {
	
	// Setup new namespace
	IsoEngine.Entities = {};

	// Create new class in namespace
	IsoEngine.Entities.Entity = new Class({
		x: 0, y: 0, z: 0,
		map: null,
		
		speed: 0.0005,
		isMoving: false,
		movingOffset: {x:0, y:0},
		movingTowards: {x:0, y:0},
		movingTowardsTiles: {x: 0, y: 0},
		
		gravity: true,
		
		initialize: function() {
		},
		render: function(context) {},
		update: function(gameTime) {
			this.updateMovement(gameTime);
		},
		load: function(engine) {},
		
		move: function(x, y, z) {
			
			var dx = this.x - x;
			var dy = this.y - y;
			
			if(!this.isMoving && engine.map.isVaildCoords(x, y, z) && engine.map.isEmpty(x, y, z)) {
				this.isMoving = true;
				this.movingOffset = engine.map.getScreenCoords(dx, dy);
				
				if(dx >= 0 && dy <= 0) {
					engine.map.set(null, this.x, this.y, this.z);
					engine.map.set(this, x, y, z);
				} else {
					this.movingTowards.x = -this.movingOffset.x;
					this.movingTowards.y = -this.movingOffset.y;
					this.movingOffset.x = 0;
					this.movingOffset.y = 0;
					this.movingTowardsTiles.x = x;
					this.movingTowardsTiles.y = y;
					this.movingTowardsTiles.z = z;
					engine.map.set(new IsoEngine.Entities.Entity(), x, y, z);
				}
			}
		},
		updateMovement: function(gameTime) {
			if(this.isMoving) {
				
				// p is used to set the offset with the tile size proportions in mind.
				var p = engine.tileSize.height / engine.tileSize.width;
				
				// The moveType will either be true or false.
				// True means that the entity moved directly to the targeting tile and is just animating the movement offset.
				// False means that the entity will move when the entity has reached the targeting tile.
				// This is needed so that the tiles won't be drawn underneath another tile, because of the rendering order.
				var moveType = (this.movingTowards.x == 0 && this.movingTowards.y == 0);
				
				var x = this.movingOffset.x,
					y = this.movingOffset.y;
				
				if(!moveType) {
					x -= this.movingTowards.x;
					y -= this.movingTowards.y;
				}
				
				if(Math.abs(x) > 1) {
					this.movingOffset.x += (x<0?1:-1) * engine.tileSize.width * this.speed * gameTime.dt;
				} else {
					this.movingTowards.x = 0;
					this.movingTowards.y = 0;
				}
				
				if(Math.abs(y) > 1) {
					this.movingOffset.y += (y<0?1:-1) * engine.tileSize.height * this.speed * gameTime.dt;
				}
				
				if(Math.abs(y) <= 1 && Math.abs(x) <= 1) {
					this.isMoving = false;
					if(!moveType) {
						engine.map.set(null, this.x, this.y, this.z);
						engine.map.set(
							this, this.movingTowardsTiles.x, this.movingTowardsTiles.y, this.movingTowardsTiles.z
						);
						this.movingOffset.x = 0;
						this.movingOffset.y = 0;
					}
				}
			}
		} 
	});
	
})();
