(function() {
	IsoEngine.Map = new Class({
		tiles: null,
		size: { width: 10, height: 10, depth: 5 },
		initialize: function() {
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
				this.tiles[x][y][z] = entity;
			} else {
				delete this.tiles[x][y][z];
			}
			
			if(previous) previous.remove();
			
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
			var offset = engine.tileSize.height * ((engine.map.size.height%2) ? engine.map.size.height - 1 : engine.map.size.height) / 2;
			y-= engine.cameraTransition.y + offset;
			x-= engine.cameraTransition.x;
			return {
				x: Math.floor((x / engine.tileSize.width) - ((y-engine.map.size.height) / engine.tileSize.height)),
				y: Math.floor((x / engine.tileSize.width) + (y / engine.tileSize.height)) - 1
			};
		},
		getScreenCoords: function(x, y) {
			return {
				x: (x * engine.tileSize.width / 2) + (y * engine.tileSize.width / 2),
				y: (y * engine.tileSize.height / 2) - (x * engine.tileSize.height / 2)
			};
		},
		isVaildCoords: function(x, y, z) {
			return x >= 0 && y >= 0 && z >= 0 && 
				x < this.size.width && y < this.size.height && z < this.size.depth;
		}
	});
})();