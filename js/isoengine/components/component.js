(function() {
	IsoEngine.Components = {};
	IsoEngine.Components.Component = new Class({
		engine: null,
		initialize: function(engine) {
			this.engine = engine;
		},
		update: function(gameTime) {},
		render: function(c) {}
	});
})();
