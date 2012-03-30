(function() {
	IsoEngine.Math = {
		unitVector: function(vector) {
			var len = Math.abs(vector.x) + Math.abs(vector.y);
			return {x: vector.x / len, y: vector.y / len};
		},
		clamp: function(value, floor, ceiling) {
			if(value < floor) return floor;
			else if(value > ceiling) return ceiling;
			return value;
		}
	};
})();