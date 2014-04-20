/***********************************************
* ng-d3 JavaScript Library
* Author: Jeffrey Ko
* License: MIT (http://www.opensource.org/licenses/mit-license.php)
* Compiled At: 04/20/2014 16:12
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
    
    // todo: refactor this
    self.configAxis = function (model) {
        // x value function
        if (typeof self.config.xValue === 'function')
            model.x(self.config.xValue);
    
        // x axis labels
        if (model.xAxis && model.xAxis.axisLabel && typeof self.config.xAxisLabel === 'string')
            model.xAxis.axisLabel(self.config.xAxisLabel);
        if (model.x2Axis && model.x2Axis.axisLabel && typeof self.config.x2AxisLabel === 'string')
            model.x2Axis.axisLabel(self.config.x2AxisLabel);
            
        // y axis labels
        if (model.yAxis && model.yAxis.axisLabel && typeof self.config.yAxisLabel === 'string')
            model.yAxis.axisLabel(self.config.yAxisLabel);
        if (model.y1Axis && model.y1Axis.axisLabel && typeof self.config.y1AxisLabel === 'string')
            model.y1Axis.axisLabel(self.config.y1AxisLabel);
        if (model.y2Axis && model.y2Axis.axisLabel && typeof self.config.y2AxisLabel === 'string')
            model.y2Axis.axisLabel(self.config.y2AxisLabel);
        if (model.y3Axis && model.y3Axis.axisLabel && typeof self.config.y3AxisLabel === 'string')
            model.y3Axis.axisLabel(self.config.y3AxisLabel);
        if (model.y4Axis && model.y4Axis.axisLabel && typeof self.config.y4AxisLabel === 'string')
            model.y4Axis.axisLabel(self.config.y4AxisLabel);
        
        // x axis tick formats
        if (model.xAxis && model.xAxis.tickFormat && typeof self.config.xAxisTickFormat === 'string')
            model.xAxis.tickFormat(d3.format(self.config.xAxisTickFormat));
        else if (model.xAxis && model.xAxis.tickFormat && typeof self.config.xAxisTickFormat === 'function')
            model.xAxis.tickFormat(self.config.xAxisTickFormat);
        if (model.x2Axis && model.x2Axis.tickFormat && typeof self.config.x2AxisTickFormat === 'string')
            model.x2Axis.tickFormat(d3.format(self.config.x2AxisTickFormat));
        else if (model.x2Axis && model.x2Axis.tickFormat && typeof self.config.x2AxisTickFormat === 'function')
            model.x2Axis.tickFormat(self.config.x2AxisTickFormat);
        
        // y axis tick formats
        if (model.yAxis && model.yAxis.tickFormat && typeof self.config.yAxisTickFormat === 'string')
            model.yAxis.tickFormat(d3.format(self.config.yAxisTickFormat));
        else if (model.yAxis && model.yAxis.tickFormat && typeof self.config.yAxisTickFormat === 'function')
            model.yAxis.tickFormat(self.config.yAxisTickFormat);
        if (model.y1Axis && model.y1Axis.tickFormat && typeof self.config.y1AxisTickFormat === 'string')
            model.y1Axis.tickFormat(d3.format(self.config.y1AxisTickFormat));
        else if (model.y1Axis && model.y1Axis.tickFormat && typeof self.config.y1AxisTickFormat === 'function')
            model.y1Axis.tickFormat(self.config.y1AxisTickFormat);
        if (model.y2Axis && model.y2Axis.tickFormat && typeof self.config.y2AxisTickFormat === 'string')
            model.y2Axis.tickFormat(d3.format(self.config.y2AxisTickFormat));
        else if (model.y2Axis && model.y2Axis.tickFormat && typeof self.config.y2AxisTickFormat === 'function')
            model.y2Axis.tickFormat(self.config.y2AxisTickFormat);
        if (model.y3Axis && model.y3Axis.tickFormat && typeof self.config.y3AxisTickFormat === 'string')
            model.y3Axis.tickFormat(d3.format(self.config.y3AxisTickFormat));
        else if (model.y3Axis && model.y3Axis.tickFormat && typeof self.config.y3AxisTickFormat === 'function')
            model.y3Axis.tickFormat(self.config.y3AxisTickFormat);
        if (model.y4Axis && model.y4Axis.tickFormat && typeof self.config.y4AxisTickFormat === 'string')
            model.y4Axis.tickFormat(d3.format(self.config.y4AxisTickFormat));
        else if (model.y4Axis && model.y4Axis.tickFormat && typeof self.config.y4AxisTickFormat === 'function')
            model.y4Axis.tickFormat(self.config.y4AxisTickFormat);
         
    };
    
    self.render = function () {
        
        self.setChartType(self.config.chartType);
        
        // var svg = $('<svg></svg>');
        var model = self.model();
        
        if (model.margin)
            model.margin(self.config.margin);
        if (model.color && typeof $.isArray(self.config.color))
            model.color(self.config.color);
        if (model.useInteractiveGuideline)
            model.useInteractiveGuideline(!!self.config.useInteractiveGuideline);
        if (model.staggerLabels)
            model.staggerLabels(!!self.config.staggerLabels);
        if (model.tooltips)
            model.tooltips(!!self.config.tooltips);
        if (model.showValues)
            model.showValues(!!self.config.showValues);
        
        self.configAxis(model);
            
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
ngD3Directives
.directive('ngD3', ['$compile', function($compile) {
    var ngD3Directive = {
        scope: true,
        compile: function() {
            return {
                pre: function($scope, iElement, iAttrs) {
                    var scope = $scope.$parent
                    var $element = $(iElement);
                    var options = scope.$eval(iAttrs.ngD3);
                    var chart = new ngChart($scope, options, $element);

                    // probably not right to do this
                    if (typeof iAttrs.ngD3 === 'string') {
                        var chartTypeWatcher = function (e) {
                            chart.updateConfig($scope.$eval(iAttrs.ngD3))
                            chart.render();
                        };
                        scope.$watch(iAttrs.ngD3, chartTypeWatcher, true);
                    }

                    if (options && typeof options.data === 'string') {
                        var dataWatcher = function (e) {
                        // make a temporary copy of the data
                        chart.data = $.extend([], e);
                        chart.render();
                            //iElement.empty().append(chart.render());
                        };
                        scope.$watch(options.data, dataWatcher);
                        scope.$watch(options.data + '.length', function() {
                            dataWatcher($scope.$eval(options.data));
                        });
                    }


                }
            };
        }
    };
	
    return ngD3Directive;
}]);
}(window, jQuery));