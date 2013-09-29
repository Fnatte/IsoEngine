(function() {
	IsoEngine.Components.Renderer.ZigZag = new Class({
		Extends: IsoEngine.Components.Component,
		initialize: function(engine) {
			this.parent(engine);
		},
		render: function(c) {
			var offset_x = 0;
			var halfTileWidth = this.engine.tileSize.width / 2;;
			
			for(var y = 0; y < this.engine.map.size.height; y++) {
				offset_x = (y%2==0) ? halfTileWidth : 0;
				
				for(var x = 0; x < this.engine.map.size.width; x++) {
					var entity = this.engine.map.get(x, y);
					if(entity != null) {
						c.save();
						c.translate(
							x * this.engine.tileSize.width + offset_x,
							y * this.engine.tileSize.height / 2
						);
						entity.render(c);
						c.restore();
					}
				}
			}
		}
	});
})();