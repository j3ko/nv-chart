(function() {
    'use strict';

    describe('Directive: nv-chart', function() {
        var element;
        var $scope;

        beforeEach(module('nvChart'));
        describe('pre-initialized', function () {

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
                element = angular.element('<div nv-chart="chartOptions"></div>');
                _$compile_(element)($scope);
                $scope.$digest();
            }));

            it('should create an svg child', function() {
                expect(element.has('svg').length).toBeTruthy();
            });

            it('should contain a nvd3 element', function() {
                expect(element.has('.nvd3').length).toBeTruthy();
            });

            it('should contain Series 1 in the legend', function() {
                expect(element.first('nv-legend-text').html()).toContain('Series 1');
            });

            it('should watch for chart type changes', function() {
                expect(element.has('.nv-lineChart').length).toBeTruthy();
                $scope.chartOptions.chartType = 'multiBarChart'
                $scope.$digest();
                expect(element.has('.nv-multiBarWithLegend').length).toBeTruthy();
            });

            it('should watch for data changes', function() {
                expect(element.first('.nv-y .nv-axis').first('text').html()).toContain('5');
                $scope.chartData =  [
                    {
                        key: 'Series 1',
                        values:[{"x": 1, "y" : 1},{"x": 2, "y" : 2},{"x": 3, "y" : 3}]
                    }];
                $scope.$digest();
                expect(element.first('.nv-y .nv-axis').first('text').html()).toContain('1');
            });
        });

        describe('post-initialized', function() {

            beforeEach(inject(function(_$compile_, _$rootScope_) {
                $scope = _$rootScope_;
                element = angular.element('<div nv-chart="chartOptions"></div>');
                _$compile_(element)($scope);
                $scope.$digest();
            }));

            it('should create an svg child', function() {
                $scope.chartData = [
                    {
                        key: 'Series 1',
                        values:[{"x": 1, "y" : 5},{"x": 2, "y" : 10},{"x": 3, "y" : 15}]
                    }];
                $scope.chartOptions = {
                    chartType: 'lineChart',
                    data: 'chartData'
                };
                $scope.$digest();

                expect(element.has('svg').length).toBeTruthy();
            });

        });
    });

})();
