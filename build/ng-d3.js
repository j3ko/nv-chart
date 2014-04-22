/***********************************************
* ng-d3 JavaScript Library
* Author: Jeffrey Ko
* License: MIT (http://www.opensource.org/licenses/mit-license.php)
* Compiled At: 04/21/2014 23:30
***********************************************/
(function(window, $) {
'use strict';
var ngD3Directives = angular.module('ngD3.directives', []);

angular.module('ngD3', ['ngD3.directives']);
var ngChart = function($scope, options, $element) {

    var self = this, defaults = {
        chartType: 'line',
        data: [],
        color: [],
        margin: {},
        showXAxis: true,
        xValue: null,
        xAxisLabel: null,
        xAxisTickFormat: null,
        x2AxisLabel: null,
        x2AxisTickFormat: null,
        showYAxis: true,
        yValue: null,
        yAxisLabel: null,
        yAxisTickFormat: null,
        y1AxisLabel: null,
        y1AxisTickFormat: null,
        y2AxisLabel: null,
        y2AxisTickFormat: null,
        y3AxisLabel: null,
        y3AxisTickFormat: null,
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

        tooltips: true,
        showValues: false,
        useInteractiveGuideline: false,
        transitionDuration: null
    };

    self.data = [];
    
    self.config = $.extend(defaults, options);

    self.updateConfig = function (options) {
        self.config = $.extend(self.config, options);
    };
    
    self.setChartType = function (type) {
        if (typeof type !== 'string') return;
    
        self.model = nv.models[type];
    };
    
    self.configAxis = function (model) {

        if (typeof self.config.xValue === 'function')
            model.x(self.config.xValue);
        if (typeof self.config.yValue === 'function')
            model.y(self.config.yValue);

            // x axis labels
        self.setAxisLabel(model, 'xAxis', self.config.xAxisLabel);
        self.setAxisLabel(model, 'x2Axis', self.config.x2AxisLabel);
            
        // y axis labels
        self.setAxisLabel(model, 'yAxis', self.config.yAxisLabel);
        self.setAxisLabel(model, 'y1Axis', self.config.yAxisLabel);
        self.setAxisLabel(model, 'y2Axis', self.config.yAxisLabel);
        self.setAxisLabel(model, 'y3Axis', self.config.yAxisLabel);
        self.setAxisLabel(model, 'y4Axis', self.config.yAxisLabel);
        
        // x axis tick formats
        self.setTickFormat(model, 'xAxis', self.config.xAxisTickFormat);
        self.setTickFormat(model, 'x2Axis', self.config.x2AxisTickFormat);
        
        // y axis tick formats
        self.setTickFormat(model, 'yAxis', self.config.yAxisTickFormat);
        self.setTickFormat(model, 'y1Axis', self.config.y1AxisTickFormat);
        self.setTickFormat(model, 'y2Axis', self.config.y2AxisTickFormat);
        self.setTickFormat(model, 'y3Axis', self.config.y3AxisTickFormat);
        self.setTickFormat(model, 'y4Axis', self.config.y4AxisTickFormat);         
    };
    
    self.setAxisLabel = function (model, axis, label) {
        if (model[axis] && model[axis].axisLabel && typeof label === 'string')
            model[axis].axisLabel(label);
    };
    
    self.setTickFormat = function (model, axis, tickFormat) {
        if (model[axis] && model[axis].tickFormat && typeof tickFormat === 'string')
            model[axis].tickFormat(d3.format(tickFormat));
        else if (model[axis] && model[axis].tickFormat && typeof tickFormat === 'function')
            model[axis].tickFormat(tickFormat);
    };
    
    self.render = function () {
        
        self.setChartType(self.config.chartType);
        
        var model = self.model();
        
        if (model.margin)
            model.margin(self.config.margin);
        if (model.color && typeof $.isArray(self.config.color) && self.config.color.length)
            model.color(self.config.color);
        if (model.useInteractiveGuideline)
            model.useInteractiveGuideline(!!self.config.useInteractiveGuideline);
        if (model.staggerLabels)
            model.staggerLabels(!!self.config.staggerLabels);
        if (model.tooltips)
            model.tooltips(!!self.config.tooltips);
        if (model.showValues)
            model.showValues(!!self.config.showValues);
        if (model.showLabels)
            model.showLabels(!!self.config.showLabels);
        if (model.labelThreshold)
            model.labelThreshold(self.config.labelThreshold);
        if (model.labelType)
            model.labelType(self.config.labelType);
        if (model.donut)
            model.donut(!!self.config.donut);
        if (model.donutRatio)
            model.donutRatio(self.config.donutRatio);
        
        self.configAxis(model);
            
        $element.empty();
        var svg = d3.select($element[0])
        .append('svg')
        .datum(self.data);
        
        if (typeof self.config.transitionDuration === 'number')
            svg = svg.transition().duration(self.config.transitionDuration);
        
        svg.call(model);

        $scope.refresh = model.update;
        nv.utils.windowResize(model.update);
    };
        
};
ngD3Directives
.directive('ngD3', ['$compile', function($compile) {
    var ngD3Directive = {
        scope: true,
        compile: function() {
            return {
                post: function($scope, iElement, iAttrs) {
                    var scope = $scope.$parent;
                    var $element = $(iElement);
                    var options = scope.$eval(iAttrs.ngD3);
                    var chart = new ngChart($scope, options, $element);

                    if (options) {
                        options.$chartScope = $scope;

                        var chartTypeWatcher = function (oldVal, newVal) {
                            if (oldVal === newVal) return;
                            chart.updateConfig({ chartType: scope.$eval(iAttrs.ngD3 + '.chartType') });
                            chart.render();
                        };
                        scope.$watch(iAttrs.ngD3 + '.chartType', chartTypeWatcher);

                        // setup data watcher
                        if (typeof options.data === 'string') {
                            var dataWatcher = function (e) {
                                chart.data = $.extend([], e);
                                chart.render();
                                //iElement.empty().append(chart.render());
                            };
                            scope.$watch(options.data, dataWatcher);
                            scope.$watch(options.data + '.length', function() {
                                dataWatcher(scope.$eval(options.data));
                            });
                        }
                    }

                }
            };

        }
    };

    return ngD3Directive;
}]);
}(window, jQuery));