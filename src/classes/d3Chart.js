var d3Chart = function($scope, $element, event) {

    var self = this, defaults = {
        // nv-chart properties
        chartType: null,
        data: [],

        // general chart properties
        color: [],
        margin: {},
        width: null,
        height: null,
        showLegend: true,
        noData: null,
        tooltips: true,
        tooltipContent: null,
        useInteractiveGuideline: false,
        transitionDuration: null,

        // x-axis
        showXAxis: true,
        xValue: null,
        xShowMaxMin: true,
        xAxisLabel: null,
        xAxisTickFormat: null,

        // x2-axis
        x2AxisLabel: null,
        x2AxisTickFormat: null,

        // y-axis
        showYAxis: true,
        yValue: null,
        yShowMaxMin: true,
        yAxisLabel: null,
        yAxisTickFormat: null,
        rightAlignYAxis: false, // lineChart

        // y1-axis
        y1AxisLabel: null,
        y1AxisTickFormat: null,

        // y2-axis
        y2AxisLabel: null,
        y2AxisTickFormat: null,

        // y3-axis
        y3AxisLabel: null,
        y3AxisTickFormat: null,

        // y4-axis
        y4AxisLabel: null,
        y4AxisTickFormat: null,
        
        // pie chart
        showLabels: true,
        labelThreshold: 0.5,
        labelType: 'key', // key, value or percent
        donut: false,
        donutRatio: 0,

        // discrete bar
        staggerLabels: false,
        showValues: false,

        // scatter
        showDistX: false,
        showDistY: false,
        onlyCircles: false
    };

    var availAxes = [
        'xAxis',
        'x2Axis',
        'yAxis',
        'y1Axis',
        'y2Axis',
        'y3Axis',
        'y4Axis'
    ];

    self.data = [];

    self.model = self.modelFn = null;

    self.config = extend(defaults, {});

    self.updateConfig = function (options) {
        self.config = extend(self.config, options);

        if (typeof self.config.data === "object") {
            self.data = self.config.data;
        }
    };

    self.updateModel = function() {
        if (self.model) self.drawModel(self.model);
    };

    self.setChartType = function (type) {
        if (typeof type !== 'string') return;
    
        self.modelFn = nv.models[type];
    };
    
    self.configAxis = function (model) {

        if (typeof self.config.xValue === 'function')
            model.x(self.config.xValue);
        if (typeof self.config.yValue === 'function')
            model.y(self.config.yValue);

        if (model.xAxis && model.xAxis.showMaxMin)
            model.xAxis.showMaxMin(!!self.config.xShowMaxMin);
        if (model.yAxis && model.yAxis.showMaxMin)
            model.yAxis.showMaxMin(!!self.config.yShowMaxMin);

        angular.forEach(availAxes, function(e) {
            self.setAxisLabel(model, e);
            self.setTickFormat(model, e);
        });
    };
    
    self.setAxisLabel = function (model, axis) {
        var label = self.config[axis + 'Label'];
        if (model[axis] && model[axis].axisLabel && typeof label === 'string')
            model[axis].axisLabel(label);
    };
    
    self.setTickFormat = function (model, axis) {
        var tickFormat = self.config[axis + 'TickFormat'];
        if (model[axis] && model[axis].tickFormat && typeof tickFormat === 'string')
            model[axis].tickFormat(d3.format(tickFormat));
        else if (model[axis] && model[axis].tickFormat && typeof tickFormat === 'function')
            model[axis].tickFormat(tickFormat);
    };
    
    self.render = function () {

        if (self.model) event.unbindModel(self.model);

        self.setChartType(self.config.chartType);
        if (!self.modelFn) return;
        var model = self.modelFn();

        self.drawModel(model);
    };

    self.redraw = function() {
        if (self.model) self.model.update();
    };

    self.drawModel = function(model) {

        if (model.margin && self.config.margin !== null && typeof self.config.margin === 'object')
            model.margin(self.config.margin);
        if (model.color && isArray(self.config.color) && self.config.color.length)
            model.color(self.config.color);
        if (model.width && typeof self.config.width === 'number')
            model.width(self.config.width);
        if (model.height && typeof self.config.height === 'number')
            model.height(self.config.height);
        if (model.rightAlignYAxis)
            model.rightAlignYAxis(!!self.config.rightAlignYAxis);
        if (model.showLegend)
            model.showLegend(!!self.config.showLegend);
        if (model.showXAxis)
            model.showXAxis(!!self.config.showXAxis);
        if (model.showYAxis)
            model.showYAxis(!!self.config.showYAxis);
        if (typeof self.config.noData === 'string')
            model.noData(self.config.noData);
        if (model.useInteractiveGuideline)
            model.useInteractiveGuideline(!!self.config.useInteractiveGuideline);
        if (model.staggerLabels)
            model.staggerLabels(!!self.config.staggerLabels);
        if (model.tooltips)
            model.tooltips(!!self.config.tooltips);
        if (typeof self.config.tooltipContent === 'string')
            model.tooltipContent(self.config.tooltipContent);
        if (model.showValues)
            model.showValues(!!self.config.showValues);
        if (model.showLabels)
            model.showLabels(!!self.config.showLabels);
        if (model.forceX && self.config.forceX instanceof Array)
            model.forceX(self.config.forceX);
        if (model.forceY && self.config.forceY instanceof Array)
            model.forceY(self.config.forceY);

        // pie
        if (model.labelThreshold && typeof self.config.labelThreshold === 'number')
            model.labelThreshold(self.config.labelThreshold);
        if (model.labelType)
            model.labelType(self.config.labelType);
        if (model.donut)
            model.donut(!!self.config.donut);
        if (model.donutRatio)
            model.donutRatio(self.config.donutRatio);

        // scatter
        if (model.showDistX)
            model.showDistX(!!self.config.showDistX);
        if (model.showDistY)
            model.showDistY(!!self.config.showDistY);
        if (model.scatter && model.scatter.onlyCircles)
            model.scatter.onlyCircles(!!self.config.onlyCircles);

        self.configAxis(model);

        $element.find('svg').remove();

        var svg = d3.select($element[0])
            .append('svg')
            .datum(self.data);

        if (typeof self.config.transitionDuration === 'number')
            svg = svg.transition().duration(self.config.transitionDuration);

        svg.call(model);

        event.bindModel(model);

        self.model = model;
    };
};
