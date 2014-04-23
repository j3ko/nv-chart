ngD3Directives
.directive('ngD3', ['$compile', function($compile) {
    var ngD3Directive = {
        scope: true,
        compile: function() {
            return {
                post: function($scope, iElement, iAttrs) {
                    var scope = $scope.$parent;
                    var $element = $(iElement);
                    var chart = new ngChart($scope, $element);
                    var watches = [];

                    $scope.$watch(iAttrs.ngD3, function(value) {
                        var options = scope.$eval(iAttrs.ngD3);
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
                        watches.push(scope.$watch(iAttrs.ngD3 + '.chartType', chartTypeWatcher));

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
                    };

                    var unbindOptions = function() {
                        angular.forEach(watches, function(e) { e(); });
                        watches = [];
                        chart.data = [];
                        chart.render();
                    };


                }
            };

        }
    };

    return ngD3Directive;
}]);