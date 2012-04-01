(function() {
	IsoEngine.Components.Renderer.Canvas = new Class({
		Extends: IsoEngine.Components.Component,
		
		canvas: null,
		
		initialize: function(engine, canvas) {
			this.parent(engine);
			this.canvas = canvas;
		},
		render: function(c) {
			c.drawImage(this.canvas, 0, 0);
		}
	});
})();