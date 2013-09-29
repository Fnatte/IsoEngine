(function() {
	IsoEngine.Input.Desktop = new Class({
		Extends: IsoEngine.Input,
		Binds: ['mouseup', 'mousedown', 'mousemove', 'click', 'contextmenu', 'keypress', 'keydown'],
		
		moving: false,
		lastPos: null,
		lastTotalMove: null,
		
		navigateWithMouse: true,
		
		initialize: function(engine) {
			this.parent(engine);
			this.canvas = this.engine.element;
			this.register();
		},
		register: function() {
			this.canvas.addEvent('mouseup', this.mouseup);
			this.canvas.addEvent('mousedown', this.mousedown);
			this.canvas.addEvent('mousemove', this.mousemove);
			this.canvas.addEvent('click', this.click);
			this.canvas.addEvent('contextmenu', this.contextmenu);
			window.addEvent('keypress', this.keypress);
			window.addEvent('keydown', this.keydown);
		},
		unregister: function() {
			this.canvas.removeEvent('mouseup', this.mouseup);
			this.canvas.removeEvent('mousedown', this.mousedown);
			this.canvas.removeEvent('mousemove', this.mousemove);
			this.canvas.removeEvent('click', this.click);
			this.canvas.removeEvent('contextmenu', this.contextmenu);
			window.removeEvent('keypress', this.keypress);
		},
		getCoordsFromEvent: function(e) {
			return {x: e.event.x, y: e.event.y};
		},
		mouseHasMoved: function() {
			return Math.abs(this.lastTotalMove.x) < 10 && Math.abs(this.lastTotalMove.y) < 10;
		},
		keypress: function(e) {
			if(e.key == 'c') {
				e.stop();
				this.engine.displayCoords ^= 1;
			}
		},
		keydown: function(e) {},
		contextmenu: function(e) {
			e.stop();
		},
		click: function(e) {
			e.stop();
			if(this.mouseHasMoved()) {
				var rpos = this.engine.map.getMapCoords(e.event.offsetX, e.event.offsetY);
				
				if(e.control) {
					// Debug object
					console.log(rpos.x, rpos.y);
					// this.engine.map.get(rpos.x, rpos.y)
					
				}
			}
		},
		mousemove: function(e) {
			if(this.navigateWithMouse && this.moving) {
				var dx = e.event.x - this.lastPos.x;
				var dy = e.event.y - this.lastPos.y;
				this.lastPos = {x: e.event.x, y: e.event.y };
				this.lastTotalMove.x += dx;
				this.lastTotalMove.y += dy;
				this.engine.cameraTransition.x += dx;
				this.engine.cameraTransition.y += dy;
			}
		},
		mousedown: function(e) {
			e.stop();
			this.moving = true;
			this.lastPos = {x: e.event.x, y: e.event.y };
			this.lastTotalMove = {x: 0, y: 0};
		},
		mouseup: function(e) {
			e.stop();
			this.moving = false;
		}
	});
})();