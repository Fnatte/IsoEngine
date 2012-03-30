/*
 * Setup core namespace.
 */
var IsoEngine = {};

(function() {
	IsoEngine.Engine = new Class({
		
		element: null, context: null,
		map: null,
		components: [],
		
		clearStyle: '#4E64AD',
		
		fpsElement: null,
		fpsFilter: 20,
		targetFps: 60,
		fps: 0,
		then: Date.now(),
		running: false,
		
		cameraTransition: { x: 0, y: 0 },
		tileSize: { width: 64, height: 32 },
		isometricType: 1, // 1 = Diamond, 2 = Zig-zag
		
		displayCoords: false,
		
		imagesPath: 'images/',
		
		gameTime: {
			dt: 0,
			total: 0,
		},
		initialize: function(element) {
			this.element = document.id(element);
			this.context = this.element.getContext('2d');
			
			var size = this.element.getSize();
			this.element.width = size.x;
			this.element.height = size.y;
			
			this.map = new IsoEngine.Map();
		},
		load: function() {
			this.map.each(function(item) {
				item.load(this);
			}.bind(this));
		},
		clear: function(style) {
			if(!style) style = this.clearStyle;
			this.context.fillStyle = style;
			this.context.fillRect(0,0,this.element.clientWidth, this.element.clientHeight);
		},
		start: function() {
			this.running = true;
			this.load();
			
			setTimeout(this.loop.bind(this), 1);
		},
		stop: function() {
			this.running = false;
		},
		setFpsElement: function(element) {
			this.fpsElement = document.id(element);
			this.updateFpsElement();
		},
		updateFpsElement: function() {
			if(this.fpsElement) {
				this.fpsElement.set('text', this.fps.toInt());
				setTimeout(this.updateFpsElement.bind(this), 1000);
			}
		},
		loop: function() {
			// Calculate delta time and fps
			var now = Date.now();
			var dt = now - this.then;
			
			// Work
			var workTime = Date.now();
			this.update(dt);
			this.render();
			workTime = Date.now() - workTime;
			
			// Calculate fps
			this.fps += ((1000 / (now - this.then)) - this.fps) / this.fpsFilter;
			this.then = now;
			
			if(this.running) {
				setTimeout(this.loop.bind(this), (1000 / this.targetFps) - workTime);
			}
		},
		update: function(dt) {
			// Update game time
			this.gameTime.dt = dt;
			this.gameTime.total += dt;
			
			// Update components
			this.components.each(function(item) {
				item.update(this.gameTime);
			}.bind(this));
			
			// Update entities
			this.map.each(function(item) {
				item.update(this.gameTime);
			}.bind(this));
		},
		render: function() {
			this.clear();
			
			this.context.save();
			this.context.translate(this.cameraTransition.x, this.cameraTransition.y);
			
			if(this.isometricType == 1) this.renderDiamond();
			else if(this.isometricType == 2) this.renderZigZag();
			
			this.context.restore();
		},
		renderDiamond: function() {
			this.context.save();
			this.context.translate(
				0,
				this.tileSize.height * ( (this.map.size.height%2) ? this.map.size.height - 1 : this.map.size.height) /2
			);
			
			for(var y = 0; y < this.map.size.height; y++) {
				for(var x = this.map.size.width-1; x >= 0; x--) {
					for(var z = 0; z < this.map.size.depth; z++) {
						var entity = this.map.get(x, y, z);
						if(entity != null) {
							this.context.save();
							this.context.translate(
								(x * this.tileSize.width / 2) + (y * this.tileSize.width / 2),
								(y * this.tileSize.height / 2) - (x * this.tileSize.height / 2)
							);
							entity.render(this.context);
							if(this.displayCoords) this.renderCoord(x, y);
							this.context.restore();
						}
					}
				}
			}
			this.context.restore();
		},
		renderZigZag: function() {
			var offset_x = 0;
			var halfTileWidth = this.tileSize.width / 2;;
			
			for(var y = 0; y < this.map.size.height; y++) {
				offset_x = (y%2==0) ? halfTileWidth : 0;
				
				for(var x = 0; x < this.map.size.width; x++) {
					var entity = this.map.get(x, y);
					if(entity != null) {
						this.context.save();
						this.context.translate(
							x * this.tileSize.width + offset_x,
							y * this.tileSize.height / 2
						);
						entity.render(this.context);
						this.context.restore();
					}
				}
			}
		},
		renderCoord: function(x, y) {
			this.context.save();
			this.context.fillStyle = 'black';
			this.context.fillText("("+x+","+y+")", 16, 16);
			this.context.restore();
		}
	});
})();
