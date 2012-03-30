(function() {
	
	// Setup new namespace
	IsoEngine.Entities = {};

	// Create new class in namespace
	/**
	 * Entity Class
	 */
	IsoEngine.Entities.Entity = new Class(
	{
		x: 0, y: 0, z: 0,
		map: null,
		
		// Set to true if the entity is blocking its current tile.
		blocking: true,
		
		speed: 1, // Movement speed
		isMoving: false, // Whether the entity is moving or not.
		movingOffset: {x:0, y:0}, // Screen coords
		movingTowards: {x:0, y:0}, // Screen coords
		movingTowardsTiles: {x: 0, y: 0}, // Tile coords
		
		// The blocker is used to block a tile while moving to it, so that no other entity will move to it.
		blocker: null,
		
		// The moveType will either be true or false.
		// True means that the entity moved directly to the targeting tile and is just animating the movement offset.
		// False means that the entity will move when the entity has reached the targeting tile.
		// This is needed so that the tiles won't be drawn underneath another tile, because of the rendering order.
		// var moveType = (this.movingTowards.x == 0 && this.movingTowards.y == 0);
		moveType: false,
		
		debug: false,
		
		gravity: true,
		
		initialize: function() {
		},
		render: function(context) {},
		update: function(gameTime) {
			this.updateMovement(gameTime);
		},
		load: function(engine) {},
		
		/**
		 * Moves the entity to the specified position.
		 * @param x
		 * @param y
		 * @param z
		 */
		move: function(x, y, z) {
			
			var dx = this.x - x;
			var dy = this.y - y;
			
			if(!this.isMoving && engine.map.isVaildCoords(x, y, z)) {
				var tileEntity = this.map.get(x, y, z);
				if(tileEntity == null || tileEntity.owner == this || !tileEntity.blocking) {
					this.isMoving = true;
					this.movingOffset = engine.map.getScreenCoords(dx, dy);
					this.movingTowardsTiles.x = x;
					this.movingTowardsTiles.y = y;
					this.movingTowardsTiles.z = z;
					
					if(dx >= 0 && dy <= 0) {
						this.moveType = true;
						engine.map.set(null, this.x, this.y, this.z);
						engine.map.set(this, x, y, z);
					} else {
						this.moveType = false;
						this.movingTowards.x = -this.movingOffset.x;
						this.movingTowards.y = -this.movingOffset.y;
						this.movingOffset.x = 0;
						this.movingOffset.y = 0;
						this.blocker = new IsoEngine.Entities.Blocker(self);
						engine.map.set(this.blocker, x, y, z);
						this.blocking = false;
					}
				}
			}
		},
		updateMovement: function(gameTime) {
			if(this.isMoving) {
				
				var moveType = this.moveType;
				var x = this.movingOffset.x,
					y = this.movingOffset.y;
				
				if(!moveType) {
					x -= this.movingTowards.x;
					y -= this.movingTowards.y;
				}
				
				if(Math.abs(x) > 1) {
					this.movingOffset.x += (x<0?1:-1) * engine.tileSize.width * this.speed * gameTime.dt * 0.0005;
				} else {
					this.movingTowards.x = 0;
					this.movingTowards.y = 0;
				}
				
				if(Math.abs(y) > 1) {
					this.movingOffset.y += (y<0?1:-1) * engine.tileSize.height * this.speed * gameTime.dt * 0.0005;
				}
				
				if(Math.abs(y) <= this.speed && Math.abs(x) <= this.speed) {
					
					if(!moveType) {
						engine.map.set(null, this.x, this.y, this.z);
						engine.map.set(null, this.blocker.x, this.blocker.y, this.blocker.z);
						
						engine.map.set(
							this, this.movingTowardsTiles.x, this.movingTowardsTiles.y, this.movingTowardsTiles.z
						);
						
						this.blocker = null;
					}
					
					this.blocking = true;
					this.isMoving = false;
					this.movingTowards.x = 0;
					this.movingTowards.y = 0;
					this.movingOffset.x = 0;
					this.movingOffset.y = 0;
				}
			}
		},
		
		/**
		 * Removes the entity and its children from the map.
		 */
		remove: function() {
			this.map.set(null, this.x, this.y, this.z);
			if(this.blocker) this.blocker.remove();
		}
	});
	
})();
