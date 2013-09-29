(function() {
	IsoEngine.Components.Textblock = new Class({
		Extends: IsoEngine.Components.Component,
		Implements: Options,
		
		options: {
			text: '',
			fillStyle: 'black',
			x: 100,
			y: 100,
			font: '40pt Arial',
			stroke: false,
			strokeStyle: 'red',
			textAlign: 'start',
			
			lifetime: -1
		},
		
		lifetimeTimer: 0,
		
		initialize: function(engine, options) {
			this.parent(engine);
			this.setOptions(options);
		},
		update: function(gameTime) {
			if(this.options.lifetime > 0) {
				this.lifetimeTimer += gameTime.dt;
				if(this.lifetimeTimer > this.options.lifetime) {
					engine.components.erase(this);
					
				}
			}
		},
		render: function(c) {
			c.save();
			
			// Draw text
			c.fillStyle = this.options.fillStyle;
			c.font = this.options.font;
			c.textAlign = this.options.textAlign;
			c.fillText(this.options.text, this.options.x, this.options.y);
			
			// Draw stroke
			if(this.options.stroke) {
				c.strokeStyle = this.options.strokeStyle;
				c.strokeText(this.options.text, this.options.x, this.options.y);
			}
			
			c.restore();
		}
	});
})();
