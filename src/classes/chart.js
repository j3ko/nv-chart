var ngChart = function($scope, options, $element) {

	var self = this, defaults = {
		chartType: 'line',
		data: [],
		margin: {},
		showXAxis: true,
		xAxisLabel: null,
		xAxisTickFormat: null,
		showYAxis: true,
		yAxisLabel: null,
		yAxisTickFormat: null,
		tooltips: true,
		showValues: false,
		staggerLabels: false,
		useInteractiveGuideline: false,
		transitionDuration: null
	};

	self.data = [];
	
	self.config = $.extend(defaults, options);

	self.updateConfig = function (options) {
		self.config = $.extend(self.config, options);
	}
	
	self.setChartType = function (type) {
		if (typeof type !== 'string') return;
	
		self.model = nv.models[type];
	}
	
	self.render = function () {
		
		self.setChartType(self.config.chartType);
		
		// var svg = $('<svg></svg>');
		var model = self.model();
		
		if (model.useInteractiveGuideline)
			model.useInteractiveGuideline(!!self.config.useInteractiveGuideline);
		if (model.staggerLabels)
			model.staggerLabels(!!self.config.staggerLabels);
		if (model.tooltips)
			model.tooltips(!!self.config.tooltips);
		if (model.showValues)
			model.showValues(!!self.config.showValues);
		
		if (model.xAxis && model.xAxis.axisLabel && typeof self.config.xAxisLabel === 'string')
			model.xAxis.axisLabel(self.config.xAxisLabel);
		if (model.yAxis && model.yAxis.axisLabel && typeof self.config.yAxisLabel === 'string')
			model.yAxis.axisLabel(self.config.yAxisLabel);
		
		if (model.xAxis && model.xAxis.tickFormat && typeof self.config.xAxisTickFormat === 'string')
			model.xAxis.tickFormat(d3.format(self.config.xAxisTickFormat));
		else if (model.xAxis && model.xAxis.tickFormat && typeof self.config.xAxisTickFormat === 'function')
			model.xAxis.tickFormat(self.config.xAxisTickFormat());
			
		if (model.yAxis && model.yAxis.tickFormat && typeof self.config.yAxisTickFormat === 'string')
			model.yAxis.tickFormat(d3.format(self.config.yAxisTickFormat));
		else if (model.yAxis && model.yAxis.tickFormat && typeof self.config.yAxisTickFormat === 'function')
			model.yAxis.tickFormat(self.config.yAxisTickFormat());
			
		$element.empty();
		
		var svg = d3.select($element[0])
		.append('svg')
		.datum(self.data);
		
		if (typeof self.config.transitionDuration === 'number')
			svg = svg.transition().duration(self.config.transitionDuration);
		
		svg.call(model)
		
		nv.utils.windowResize(model.update);
		
		return;
	};
		
}