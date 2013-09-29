var engine = null;

window.addEvent('domready', function() {

	// Initialize IsoEngine
	engine = new IsoEngine.Engine('main');
	engine.setFpsElement('fps');

	// Set background style
	engine.clearStyle = '#4785ff';
	
	// Set map size
	engine.map.size.width = 14;
	engine.map.size.height = 15;
	engine.map.reset();
	
	// Center map a bit
	engine.cameraTransition.x = engine.tileSize.width/4;
	engine.cameraTransition.y = engine.tileSize.height/2;
	
	// Add white
	for(var x = 0; x < engine.map.size.width; x++) {
		for(var y = 0; y < engine.map.size.height; y++) {
			var white = new IsoEngine.Entities.White();
			engine.map.set(white, x, y, 0);
		}
	}
	
	var box = new IsoEngine.Entities.Box();
	engine.map.set(box, 10, 10, 1);
	
	// Setup input
	var input = new IsoEngine.Input.Desktop();
	engine.components.push(input);
	
	// Start game
	engine.clear();
	engine.start();
});