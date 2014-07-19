
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
                    $('body').animate({ scrollTop: top }, 200);
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
                data: 'chartData'
            };
            $scope.chartData = [{
                key: 'Series 1',
                values:[{'x': 1, 'y' : 5},{'x': 2, 'y' : 10},{'x': 3, 'y' : 15}]
            }];
        }]);

    prettyPrint();
}())