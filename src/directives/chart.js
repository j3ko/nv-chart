d3App
.directive('nvChart', [function() {
    var d3Directive = {
        scope: true,
        require: '?^nvChartContainer',
        link: function($scope, iElement, iAttrs, d3Ctrl) {
            var scope = $scope.$parent;
            var $element = $(iElement);
            var chart = new d3Chart($scope, $element);
            var event = new d3Event($scope); // todo: hookup events
            var watches = [];

            $scope.getElementDimensions = function () {
                return { 'h': $element.height(), 'w': $element.width() };
            };

            // todo: is this necessary?
            $element.bind('resize', function () {
                $scope.$apply();
            });

            $scope.$watch(iAttrs.nvChart, function(value) {
                var options = scope.$eval(iAttrs.nvChart);
                if (options) bindOptions(options);
                else unbindOptions();
            });

            var bindOptions = function(options) {

                options.$reload = function() {
                    chart.updateConfig(scope.$eval(iAttrs.nvChart));
                    chart.updateModel();
                };

                watches.push($scope.$watch($scope.getElementDimensions, chart.redraw, true));

                // setup chart type watcher
                var chartTypeWatcher = function (newVal) {
                    if (chart.config.chartType === newVal) return;
                    chart.updateConfig(options);
                    chart.render();
                };
                watches.push(scope.$watch(iAttrs.nvChart + '.chartType', chartTypeWatcher));

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

                $scope.$on('$destroy', function (event) {
                    unbindOptions();
                    delete options.$reload;
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
