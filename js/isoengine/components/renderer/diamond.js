(function() {
	IsoEngine.Components.Renderer.Diamond = new Class({
		Extends: IsoEngine.Components.Component,
		initialize: function(engine) {
			this.parent(engine);
		},
		render: function(c) {
			c.save();
			
			this.translate(c);
			
			for(var z = 0; z < this.engine.map.size.depth; z++) {
				for(var y = 0; y < this.engine.map.size.height; y++) {
					for(var x = this.engine.map.size.width-1; x >= 0; x--) {
						var entity = this.engine.map.get(x, y, z);
						if(entity != null) this.renderEntity(c, x, y, z, entity);
					}
				}
			}
			
			c.restore();
		},
		renderEntity: function(c, x, y, z, entity) {
			c.save();
			c.translate(
				(x * this.engine.tileSize.width / 2) + (y * this.engine.tileSize.width / 2),
				(y * this.engine.tileSize.height / 2) - (x * this.engine.tileSize.height / 2)
			);
			entity.render(c);
			if(this.engine.displayCoords) this.engine.renderCoord(x, y);
			c.restore();
		},
		translate: function(c) {
			var ty = this.engine.tileSize.height/2;
			if(this.engine.map.size.height % 2) ty *= (this.engine.map.size.height - 1);
			else ty *= this.engine.map.size.height;
	
			c.translate(
				this.engine.cameraTransition.x,
				this.engine.cameraTransition.y + ty
			);
		},
		renderZ: function(c, z) {
			c.save();
			
			this.translate(c);
			
			for(var y = 0; y < this.engine.map.size.height; y++) {
				for(var x = this.engine.map.size.width-1; x >= 0; x--) {
					var entity = this.engine.map.get(x, y, z);
					if(entity != null) this.renderEntity(c, x, y, z, entity);
				}
			}
			
			
			
			c.restore();
		}
	});
})();