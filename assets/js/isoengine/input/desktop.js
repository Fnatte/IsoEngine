(function() {
	IsoEngine.Input.Desktop = new Class({
		Extends: IsoEngine.Input,
		
		moving: false,
		lastPos: null,
		lastTotalMove: null,
		
		initialize: function() {
			document.id('main').addEvent('mouseup', function(e) { e.stop(); this.moving = false; }.bind(this));
			document.id('main').addEvent('mousedown', function(e) {
				e.stop();
				this.moving = true;
				this.lastPos = {x: e.event.x, y: e.event.y };
				this.lastTotalMove = {x: 0, y: 0};
			}.bind(this));
			document.id('main').addEvent('mousemove', function(e) {
				if(this.moving) {
					var dx = e.event.x - this.lastPos.x;
					var dy = e.event.y - this.lastPos.y;
					this.lastPos = {x: e.event.x, y: e.event.y };
					this.lastTotalMove.x += dx;
					this.lastTotalMove.y += dy;
					engine.cameraTransition.x += dx;
					engine.cameraTransition.y += dy;
				}
			}.bind(this));
			document.id('main').addEvent('click', function(e) {
				e.stop();
				if(this.mouseHasMoved()) {
					var rpos = engine.map.getMapCoords(e.event.x, e.event.y);
					var firstEmpty = engine.map.firstEmpty(rpos.x, rpos.y);
					if(firstEmpty < 5) {
						engine.map.set(new IsoEngine.Entities.Box(), rpos.x, rpos.y, firstEmpty);
					}
				}
			}.bind(this));
			
			document.id('main').addEvent('contextmenu', function(e) {
				e.stop();
				if(this.mouseHasMoved()) {
					var rpos = engine.map.getMapCoords(e.event.x, e.event.y);
					var firstEmpty = engine.map.firstEmpty(rpos.x, rpos.y);
					if(firstEmpty == null) firstEmpty = 5;
					if(firstEmpty > 1) {
						engine.map.set(null, rpos.x, rpos.y, firstEmpty-1);
					}
				}
			}.bind(this));
			
			window.addEvent('keypress', function(e) {
				if(e.key == 'c') {
					engine.displayCoords ^= 1;
				}
			});
		},
		getCoordsFromEvent: function(e) {
			return {x: e.event.x, y: e.event.y};
		},
		mouseHasMoved: function() {
			return Math.abs(this.lastTotalMove.x) < 10 && Math.abs(this.lastTotalMove.y) < 10;
		}
	});
})();