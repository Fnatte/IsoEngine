(function() {
	IsoEngine.Components.Renderer.Diamond = new Class({
		Extends: IsoEngine.Components.Component,
		
		onlyRenderClose: false,
		tilesToRenderX: 18,
		tilesToRenderY: 18,
		updateEntities: false,
		
		initialize: function(engine) {
			this.parent(engine);
		},
		render: function(c, gameTime) {
			c.save();
			
			this.translate(c);
			if(this.onlyRenderClose) {
				
				var cur = this.engine.map.getMapCoords(0,0);
				var fromy = Math.max(0, cur.y-1);
				var toy = Math.min(this.engine.map.size.height, cur.y + this.tilesToRenderY);
				var fromx = Math.max(0, cur.x-this.tilesToRenderX/2);
				var tox = Math.floor(Math.min(this.engine.map.size.width, cur.x + this.tilesToRenderX/2));
				
				for(var z = 0; z < this.engine.map.size.depth; z++) {
					for(var y = fromy; y < toy; y++) {
						for(var x = tox-1; x >= fromx; x--) {
							var entity = this.engine.map.get(x, y, z);
							if(entity != null) {
								if(this.updateEntities) entity.update(gameTime);
								this.renderEntity(c, x, y, z, entity);
							}
						}
					}
				}
			}
			else {
				for(var z = 0; z < this.engine.map.size.depth; z++) {
					for(var y = 0; y < this.engine.map.size.height; y++) {
						for(var x = this.engine.map.size.width-1; x >= 0; x--) {
							var entity = this.engine.map.get(x, y, z);
							if(entity != null) this.renderEntity(c, x, y, z, entity);
						}
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
			if(this.engine.displayCoords) {
				c.fillStyle = 'black';
				c.fillText(x + " " + y + " " + z, this.engine.tileSize.width/2, this.engine.tileSize.height/2);
			}
			c.restore();
		},
		translate: function(c) {
			/*
			var ty = this.engine.tileSize.height/2;
			if(this.engine.map.size.height % 2) ty *= (this.engine.map.size.height - 1);
			else ty *= this.engine.map.size.height;
	*/
			ty = 0;
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