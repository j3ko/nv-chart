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