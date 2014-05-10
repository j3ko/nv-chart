d3App
.directive('nvChart', ['$window', '$rootScope', function($window, $rootScope) {
    var d3Directive = {
        scope: true,
        link: function($scope, elem, attrs) {
            var scope = $scope.$parent;
            var $element = $(elem);
            var event = new d3Event($scope, $rootScope);
            var chart = new d3Chart($scope, $element, event);
            var watches = [];

            $scope.getElementDimensions = function () {
                return { 'h': $element.height(), 'w': $element.width() };
            };

            angular.element($window).bind('resize.nv-chart', chart.redraw);

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
                };
                watches.push(scope.$watch(attrs.nvChart + '.chartType', chartTypeWatcher));

                // setup data watcher
                if (typeof options.data === 'string') {
                    var dataWatcher = function (e) {
                        chart.data = e ? $.extend([], e) : [];
                        chart.render();
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
            };

            var unbindOptions = function() {
                angular.forEach(watches, function(e) { e(); });
                watches = [];
                chart.data = [];
                chart.render();
            };

        }
    };

    return d3Directive;
}]);
