(function() {
	IsoEngine.Input = new Class({
		// Entity to control
		entity: null,
			
		// Boolean to determine whether to move at this moment.
		moving: false,
		
		// Unit vector used as direction to move.
		direction: { x: 0, y: 0},
		
		// Move speed
		moveSpeed: 10,
		
		
		update: function(gameTime) {
			if(this.entity == null) return;
			
			if(this.moving) {
				this.entity.velocity.x = this.direction.x * this.moveSpeed;
				this.entity.velocity.y = this.direction.y * this.moveSpeed;
			} else {
				this.entity.velocity.x = this.entity.velocity.y = 0;
			}
		}
	});
})();