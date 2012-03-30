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
		
		speed: 1, // Movement speed
		isMoving: false, // Whether the entity is moving or not.
		movingOffset: {x:0, y:0}, // Screen coords
		
		// Not in use
		gravity: true,
		
		debug: false,
		
		initialize: function() {},
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
			
			if(!this.isMoving && engine.map.isVaildCoords(x, y, z) && this.map.isEmpty(x, y, z)) {
				this.isMoving = true;
				this.movingOffset = engine.map.getScreenCoords(dx, dy);
				this.remove();
				engine.map.set(this, x, y, z);
			}
		},
		updateMovement: function(gameTime) {
			if(this.isMoving) {
				
				var x = this.movingOffset.x,
					y = this.movingOffset.y;
				
				if(Math.abs(x) > 1) {
					this.movingOffset.x += (x<0?1:-1) * engine.tileSize.width * this.speed * gameTime.dt * 0.0005;
				}
				
				if(Math.abs(y) > 1) {
					this.movingOffset.y += (y<0?1:-1) * engine.tileSize.height * this.speed * gameTime.dt * 0.0005;
				}
				
				if(Math.abs(y) <= this.speed && Math.abs(x) <= this.speed) {
					this.isMoving = false;
					this.movingOffset.x = 0;
					this.movingOffset.y = 0;
				}
			}
		},
		
		/**
		 * Removes the entity from the map.
		 */
		remove: function() {
			this.map.set(null, this.x, this.y, this.z);
		}
	});
	
})();
