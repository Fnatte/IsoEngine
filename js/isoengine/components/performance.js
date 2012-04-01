(function() {
	IsoEngine.Components.Performance = new Class({
		Extends: IsoEngine.Components.Component,

		timer: 0,
		interval: 100,
		
		worktimes: [],
		
		initialize: function(engine, options) {
			this.parent(engine);
		},
		update: function(gameTime) {
			this.timer += gameTime.dt;
			
			if(this.timer >= this.interval) {
				this.timer = 0;
				this.worktimes.push([
					gameTime.total,
					this.engine.getAverageWorktime()
				]);
			}
		},
		render: function(c) {},
		toCSV: function() {
			var csv = '';
			this.worktimes.each(function(item) {
				csv += item.join(',') + "\t\n";
			});
			return csv;
		}
	});
})();
