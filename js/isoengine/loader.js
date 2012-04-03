(function() {
	IsoEngine.Loader = new Class({
		Implements: Events,
		
		images: [],
		audio: {},
		audioBuffers: {},
		
		loadings: -1,
		
		initialize: function() {},
		
		loadImages: function() {
			if(this.loadings < 0) this.loadings = 0;
			this.loadings += this.images.length;
			this.images.each(function(url) {
				var image = new Image();
				image.addEvent('load', function() {
					this.loadings--;
					this.update();
				}.bind(this));
				image.src = url;
			}.bind(this));
		},
		
		loadAudio: function() {
			var self = this;
			var context = new webkitAudioContext();
			if(this.loadings < 0) this.loadings = 0;
			this.loadings += Object.getLength(this.audio);
			Object.each(this.audio, function(url, key) {
				var request = new XMLHttpRequest();
				request.open('GET', url, true);
				request.responseType = 'arraybuffer';
				request.onload = function() {
					context.decodeAudioData(request.response,
						function(buffer) {
							self.audioBuffers[key] = buffer;
							self.loadings--;
							self.update();
						},
						function(e) {
							console.log('Error decoding sound: ', e);
							self.loadings--;
							self.update();
						}
					);
				};
				request.send();
			});
		},
		
		update: function() {
			// Fire update event
			var length = this.images.length + Object.getLength(this.audio);
			this.fireEvent('update', 1-this.loadings/length);
			
			// If we completed, fire the completed event.
			if(this.loadings == 0) {
				this.fireEvent('completed', this);
				this.loadings = -1;
			}
		}
		
	});
})();