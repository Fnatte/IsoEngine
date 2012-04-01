(function() {
	IsoEngine.Loader = new Class({
		Implements: Events,
		
		images: [],
		loadings: -1,
		
		initialize: function() {},
		
		loadImages: function() {
			this.images.each(function(url) {
				if(this.loadings < 0) this.loadings = 1;
				else this.loadings++;
				
				var image = new Image();
				image.addEvent('load', function() {
					this.loadings--;
					this.fireEvent('update', 1-this.loadings/this.images.length);
					if(this.loadings == 0) {
						this.fireEvent('completed', this);
						this.loadings = -1;
					}
				}.bind(this));
				image.src = url;
			}.bind(this));
		},
		
	});
})();