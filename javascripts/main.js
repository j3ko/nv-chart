
(function() {
    angular.module('nvApp',['nvChart', 'ui.bootstrap'])
        .config(['$locationProvider', function($locationProvider) {
            $locationProvider.html5Mode(true);
        }])
        .directive('scrollto', [function(){
            return function(scope, elm, attrs) {
                elm.bind('click', function(e){
                    e.preventDefault();
                    if (attrs.href) {
                        attrs.scrollto = attrs.href;
                    }
                    var top = $(attrs.scrollto).offset().top - 55;
                    $(jQuery.browser.webkit ? 'body': 'html').animate({ scrollTop: top }, 400);
                });
            };
        }])
        .controller('nvCtrl', ['$scope', function($scope) {
            $scope.scrollTo = function(id) {
                $location.hash(id);
                $anchorScroll();
            }

            /*Basic Example*/
            $scope.chartOptions = {
                chartType: 'lineChart',
                data: 'chartData',

                // optional options
                margin: { top: 0, bottom: 20, left: 15, right: 10 },
                tooltips: false
            };
            $scope.chartData = [{
                key: 'Series 1',
                values:[{'x': 1, 'y' : 5},{'x': 2, 'y' : 10},{'x': 3, 'y' : 15}]
            }];

            $scope.chartOptionsOne = {
                chartType: 'multiBarChart',
                data: 'chartDataOne',
                margin: { top: 0, bottom: 20, left: 40, right: 10 },
                showTooltips: false,
                transitionDuration: 0
            };
            $scope.chartDataOne = function() {
                var sin = [], cos = [];

                for (var i = 0; i < 100; i++) {
                    sin.push({ x: i, y: Math.sin(i / 10) });
                    cos.push({ x: i, y: .5 * Math.cos(i / 10) });
                }

                return [
                    { values: sin, key: 'Sine Wave' },
                    { values: cos, key: 'Cosine Wave' }
                ];
            }();

        }]);

    prettyPrint();
}())