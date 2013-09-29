(function() {
	IsoEngine.Map = new Class({
		engine: null,
		tiles: null,
		size: { width: 10, height: 10, depth: 5 },
		initialize: function(engine, width, height, depth) {
			this.engine = engine;
			if(width) this.size.width = width;
			if(height) this.size.height = height;
			if(depth) this.size.depth = depth;
			this.reset();
		},
		reset: function() {
			this.tiles = new Array(this.size.width);
			for(var x = 0; x < this.size.width; x++) {
				this.tiles[x] = new Array(this.size.height);
				for(var y = 0; y < this.size.height; y++) {
					this.tiles[x][y] = new Array(this.size.depth);
				}
			};
		},
		isEmpty: function(x, y, z) {
			return this.get(x, y, z) == null;
		},
		get: function(x, y, z) {
			if(z == null) {
				return this.tiles[x][y];
			}
			return this.tiles[x][y][z];
		},
		set: function(entity, x, y, z) {
			var previous = this.get(x, y, z);
			
			if(entity != null) {
				entity.map = this;
				entity.x = x;
				entity.y = y;
				entity.z = z;
				entity.isOnMap = true;
				this.tiles[x][y][z] = entity;
			} else {
				delete this.tiles[x][y][z];
			}
			
			if(previous) {
				previous.remove();
			}
			
			return previous;
		},
		each: function(fnc) {
			this.tiles.each(function(arrX, x) {
				arrX.each(function(arrY, y) {
					arrY.each(function(item, z) {
						fnc(item, x, y, z);
					});
				});
			});
		},
		firstEmpty: function(x, y) {
			var arr = this.tiles[x][y];
			for(var z = 0; z < arr.length; z++) {
				if(arr[z] == null) return z;
			}
		},
		getMapCoords: function(x, y) {
			// Fuck this shit. 
			// Detta är det sämsta.
			
			var w = this.engine.tileSize.width;
			var h = this.engine.tileSize.height;
			
			var ty = h/2;
			if(this.engine.map.size.height % 2) ty *= (this.engine.map.size.height - 1);
			else ty *= this.engine.map.size.height;
			
			var tx = this.engine.cameraTransition.x;
			ty += this.engine.cameraTransition.y;
			
			x -= tx;
			y -= ty;
			
			return {
				x: Math.round(x/w-y/h - this.size.width/2),
				y: Math.round(x/w+y/h + this.size.width/2)-1
			};
			
		},
		getScreenCoords: function(x, y) {
			return {
				x: (x * this.engine.tileSize.width / 2) + (y * this.engine.tileSize.width / 2),
				y: (y * this.engine.tileSize.height / 2) - (x * this.engine.tileSize.height / 2)
			};
		},
		isVaildCoords: function(x, y, z) {
			return x >= 0 && y >= 0 && z >= 0 && 
				x < this.size.width && y < this.size.height && z < this.size.depth;
		}
	});
})();