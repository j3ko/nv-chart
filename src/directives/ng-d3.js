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