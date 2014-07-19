/***********************************************
* nv-chart JavaScript Library
* Author: Jeffrey Ko
* License: MIT (http://www.opensource.org/licenses/mit-license.php)
* Compiled At: 07/15/2014 21:23
***********************************************/
(function(window) {
'use strict';
var d3App = angular.module('nvChart', []);

if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {},
            fBound = function () {
                return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}

function extend(){
    for(var i=1; i<arguments.length; i++)
        for(var key in arguments[i])
            if(arguments[i].hasOwnProperty(key))
                arguments[0][key] = arguments[i][key];
    return arguments[0];
}

function isArray(_) {
    return _ instanceof Array;
}

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

var d3Event = function($scope, $rootScope) {
    var self = this;
    var elems = ['lines', 'bars', 'pie', 'discretebar', 'multibar', 'scatter'];

    self.bindModel = function(model) {
        if (model.legend) {
            model.legend.dispatch.on('legendClick.nv-chart', function (d, i) {
                $rootScope.$broadcast('legendClick.nv-chart', d, i);
            });
        }

        angular.forEach(elems, function(e) {
            self.bindElementClick(model, e);
        });
    };

    self.bindElementClick = function(model, elem) {
        if (model[elem] && model[elem].dispatch.elementClick) {
            model[elem].dispatch.on('elementClick.nv-chart', function(d, i) {
                $rootScope.$broadcast('elementClick.nv-chart', d, i);
            });
        }
    };

    self.unbindModel = function(model) {
        if (model.legend) {
            model.legend.dispatch.on('legendClick.nv-chart', null);
        }

        angular.forEach(elems, function(e) {
            self.unbindElementClick(model, e);
        });
    };

    self.unbindElementClick = function(model, elem) {
        if (model[elem] && model[elem].dispatch.elementClick) {
            model[elem].dispatch.on('elementClick.nv-chart', null);
        }
    };
};

d3App
.controller('chartController', ['$scope', function($scope) {
    var ctrl = this,
        menuItems = ctrl.menuItems = [];

    ctrl.addMenuItem = function(_) {
        menuItems.push(_);
    };
    ctrl.removeMenuItem = function(_) {
        var index = menuItems.indexOf(_);
        menuItems.splice(index, 1);
    };

}]);

d3App
.directive('nvChart', ['$window', '$rootScope', '$timeout', function($window, $rootScope, $timeout) {
    var d3Directive = {
        scope: true,
        controller: 'chartController',
        template: '<ul style="display:none;" nv-chart-menu></ul>',
        link: function($scope, elem, attrs, chartCtrl) {
            var scope = $scope.$parent;
            var $element = angular.element(elem);
            var event = new d3Event($scope, $rootScope);
            var chart = new d3Chart($scope, $element, event);
            var watches = [];

            $scope.getElementDimensions = function () {
                return { 'h': $element[0].offsetHeight, 'w': $element[0].offsetWidth };
            };

            angular.element($window).bind('resize', chart.redraw);

            $scope.$watch(attrs.nvChart, function() {
                var options = scope.$eval(attrs.nvChart);
                if (options) bindOptions(options);
                else unbindOptions();
            });

            var bindOptions = function(options) {

                options.$reload = function() {
                    chart.updateConfig(options);
                    chart.updateModel();
                };

                watches.push($scope.$watch($scope.getElementDimensions, chart.redraw, true));

                // setup chart type watcher
                var chartTypeWatcher = function (newVal) {
                    if (chart.config.chartType === newVal) return;
                    chart.updateConfig(options);
                    chart.render();
                    $timeout(function () {
                        chart.redraw();
                    });
                };
                watches.push(scope.$watch(attrs.nvChart + '.chartType', chartTypeWatcher));

                // setup data watcher
                if (typeof options.data === 'string') {
                    var dataWatcher = function (e) {
                        chart.data = e ? extend([], e) : [];
                        chart.render();
                        $timeout(function () {
                            chart.redraw();
                        });
                    };
                    watches.push(scope.$watch(options.data, dataWatcher));
                    watches.push(scope.$watch(options.data + '.length', function() {
                        dataWatcher(scope.$eval(options.data));
                    }));
                }

                $scope.$on('$destroy', function () {
                    unbindOptions();
                    delete options.$reload;
                    angular.element($window).off('resize.nv-chart', chart.redraw);
                    event.unbindModel(chart.model);
                });

                //initialize plugins.
                angular.forEach(options.plugins, function (p) {
                    if (typeof p === "function") {
                        p = new p();
                    }
                    p.init($scope.$new(), elem, chart, chartCtrl);
                    // only allow one plugin of a given type
                    //options.plugins[$utils.getInstanceType(p)] = p;
                });
            };

            var unbindOptions = function() {
                angular.forEach(watches, function(e) { e(); });
                watches = [];
                chart.data = [];
                chart.render();
                $timeout(function () {
                    chart.redraw();
                });
            };
        }
    };

    return d3Directive;
}]);

d3App
.directive('nvChartMenu', ['$window', function($window) {

    return {
        require: '^nvChart',
        scope: {},
        replace: true,
        template:   '<ul class="nv-chart-menu" >' +
                        '<li ng-repeat="item in menuItems" ng-click="item.onClick(item)">' +
                            '<a>{{item.name}}</a>' +
                        '</li>' +
                    '</ul>',
        link: function($scope, elem, attrs, chartCtrl) {
            var $element = angular.element(elem),
                menuOpened = false,
                w = angular.element($window),
                openTarget;

            $scope.menuItems = chartCtrl.menuItems;

            function closeMenu(element) {
                element.css('display', 'none');
                menuOpened = false;
            }

            function openMenu(event, element) {
                element.css('display', 'block');
                var parentOffset = angular.element(element).offsetParent().offset();
                element.css('position', 'absolute');
                element.css('top', Math.max(event.pageY - parentOffset.top, 0) + 'px');
                element.css('left', Math.max(event.pageX - parentOffset.left, 0) + 'px');
                menuOpened = true;
            }

            function onWindowClick(event) {
                if (menuOpened && (event.button !== 2 || event.target !== openTarget)){
                   closeMenu($element);
                }
            }

            $element.parent().bind('contextmenu', function(event) {
                event.preventDefault();
                openTarget = event.target;

                if ($scope.menuItems && $scope.menuItems.length > 0)
                    openMenu(event, $element);
            });

            w.bind('keyup', function(event) {
                if (menuOpened && event.keyCode === 27) {
                    closeMenu($element);
                }
            });

            w.bind('click', onWindowClick);
            w.bind('contextmenu', onWindowClick);

        }
    };

}]);

}(window));