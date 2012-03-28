(function() {
	
	// Setup new namespace
	IsoEngine.Entities = {};

	// Create new class in namespace
	IsoEngine.Entities.Entity = new Class({
		x: 0, y: 0, z: 0,
		map: null,
		initialize: function() {
			console.log("Creating entity.");
		},
		render: function(context) {},
		update: function(gameTime) {},
		load: function(engine) {}
	});
	
})();
