d3App
.directive('nvChart', [function() {
    var d3Directive = {
        scope: true,
        link: function($scope, iElement, iAttrs, controller) {
            var scope = $scope.$parent;
            var $element = $(iElement);
            var chart = new d3Chart($scope, $element);
            var watches = [];

            $scope.$watch(iAttrs.nvChart, function(value) {
                var options = scope.$eval(iAttrs.nvChart);
                if (options) bindOptions(options);
                else unbindOptions();
            });

            var bindOptions = function(options) {
                options.$chartScope = $scope;
                options.$chartScope.refresh = function () {
                    chart.updateConfig(options);
                    chart.render();
                };

                var chartTypeWatcher = function (newVal) {
                    if (chart.config.chartType === newVal) return;
                    options.$chartScope.refresh();
                };
                watches.push(scope.$watch(iAttrs.nvChart + '.chartType', chartTypeWatcher));

                // setup data watcher
                if (typeof options.data === 'string') {
                    var dataWatcher = function (e) {
                        chart.data = e ? $.extend([], e) : [];
                        chart.render();
                        //iElement.empty().append(chart.render());
                    };
                    watches.push(scope.$watch(options.data, dataWatcher));
                    watches.push(scope.$watch(options.data + '.length', function() {
                        dataWatcher(scope.$eval(options.data));
                    }));
                }

                options.$chartScope.$on('$destroy', function (event) {
                    unbindOptions();
                    options.$chartScope = null;
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