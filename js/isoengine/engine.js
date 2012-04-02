/*
 * Setup core namespace.
 */
var IsoEngine = {};

(function() {
	IsoEngine.Engine = new Class({
		
		// Elements and thier canvases
		element: null, context: null,
		
		// Core shit.
		map: null,
		components: [],
		maps: [],
		
		clearStyle: '#4E64AD',
		size: null,
		
		// Element to print the current FPS to.
		// The FPS-number will be "filtered" using the fpsFilter property.
		fpsElement: null,
		
		// Loop properties: FPS, running...
		fpsFilter: 20,
		targetFps: 60,
		fps: 0,
		then: Date.now(),
		running: false,
		ticks: 0,
		totalWorktime: 0,
		
		// Graphics
		cameraTransition: { x: 0, y: 0 },
		tileSize: { width: 64, height: 32 },
		isometricType: 1, // 1 = Diamond, 2 = Zig-zag
		
		// Whether or not to display coordinates on the map.
		displayCoords: false,
		
		/*
		 * Whether or not use the requestAnimationFrame() function to assist the game loop.
		 * This can have lot of impact on the performance.
		 * 
		 * Make sure that the shim rAF.js is included to provide better cross-browser combability.
		 */
		useRequestAnimationFrame: true,
		
		imagesPath: 'images/',
		
		// Time object to be passed to every component and entity.
		// This object will be reused and not renewed for performance.
		gameTime: {
			dt: 0,
			total: 0,
		},
		
		
		initialize: function(element) {
			this.element = document.id(element);
			this.context = this.element.getContext('2d');
			
			this.size = this.element.getSize();
			this.element.width = this.size.x;
			this.element.height = this.size.y;
			
			this.map = this.maps[0] = new IsoEngine.Map();
		},
		load: function() {
			this.map.each(function(item) {
				item.load(this);
			}.bind(this));
		},
		clear: function(style) {
			if(!style) style = this.clearStyle;
			
			if(style) {
				this.context.fillStyle = style;
				this.context.fillRect(0,0,this.size.x, this.size.y);
			}
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
		defaultMap: function() {
			this.map = this.maps[0];
		},
		loop: function() {
			this.ticks++;
			
			// Calculate delta time and fps
			var now = Date.now();
			var dt = now - this.then;
			
			// Work
			var workTime = Date.now();
			this.update(dt);
			this.render();
			workTime = Date.now() - workTime;
			this.totalWorktime += workTime;
			
			// Calculate fps
			this.fps += ((1000 / (now - this.then)) - this.fps) / this.fpsFilter;
			this.then = now;
			
			if(this.running) {
				if(this.useRequestAnimationFrame) window.requestAnimationFrame(this.loop.bind(this));
				else setTimeout(this.loop.bind(this), (1000 / this.targetFps) - workTime);
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
			
			// Render components
			this.components.each(function(item) {
				if(typeof item.render == 'function') item.render(this.context);
			}.bind(this));
		},
		getAverageWorktime: function() {
			return this.totalWorktime / this.ticks;
		}
	});
})();
