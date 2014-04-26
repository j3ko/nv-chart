(function() {
    'use strict';

    describe('Directive: ng-d3', function() {
        var element;
        var $scope;

        beforeEach(module('ngD3'));

        beforeEach(inject(function(_$compile_, _$rootScope_) {
            $scope = _$rootScope_;
            $scope.chartData = [
                {
                    key: 'Series 1',
                    values:[{"x": 1, "y" : 5},{"x": 2, "y" : 10},{"x": 3, "y" : 15}]
                }];
            $scope.chartOptions = {
                chartType: 'lineChart',
                data: 'chartData'
            };
            element = angular.element('<div ng-d3="chartOptions"></div>');
            _$compile_(element)($scope);
            $scope.$digest();
        }));

        it('should create an svg child', function() {
            expect(element.has('svg').length).toBeTruthy();
        });
    });

})();
