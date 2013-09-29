(function() {
	IsoEngine.Components.AudioManager = new Class({
		Extends: IsoEngine.Components.Component,
		
		context: null,
		gainNode: null,
		buffers: null,
		
		initialize: function(engine, buffers) {
			this.parent(engine);
			this.buffers = buffers || {};
			try {
				this.context = new webkitAudioContext();
				this.gainNode = this.context.createGainNode();
				this.gainNode.connect(this.context.destination);
			}
			catch(e) { console.log("Web Audio API is not supported in this browser."); }
		},
		
		load: function(key, url) {
			var self = this;
			var request = new XMLHttpRequest();
			request.open('GET', url, true);
			request.responseType = 'arraybuffer';
			request.onload = function() {
				self.context.decodeAudioData(request.response,
					function(buffer) {
						self.buffers[key] = buffer;
					},
					function(e) {
						console.log('Error decoding sound: ', e);
					}
				);
			};
			request.send();
		},
		
		play: function(key, volume) {
			if(!this.context) return;

			var source = this.context.createBufferSource();
			source.buffer = this.buffers[key];
			source.connect(this.gainNode);
			if(volume) source.gain.value = volume;
			source.noteOn(0);
			return source;
		},
		
		setVolume: function(volume) {
			if(this.gainNode) {
				this.gainNode.gain.value = volume;
			}
		},
		
		update: function(gameTime) {},
		render: function(c) {}
	});
})();
