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
		size: null,
		
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
			
			this.size = this.element.getSize();
			this.element.width = this.size.x;
			this.element.height = this.size.y;
			
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
			
			// Render components
			this.components.each(function(item) {
				if(typeof item.render == 'function') item.render(this.context);
			}.bind(this));
		},
		renderCoord: function(x, y) {
			this.context.save();
			this.context.fillStyle = 'black';
			this.context.fillText("("+x+","+y+")", 16, 16);
			this.context.restore();
		}
	});
})();
