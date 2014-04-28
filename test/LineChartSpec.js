(function() {
    'use strict';
    describe('lineChart', function() {
        var element;
        var $scope;

        beforeEach(module('ngD3'));

        beforeEach(inject(function(_$compile_, _$rootScope_) {
            $scope = _$rootScope_;
            element = angular.element('<div ng-d3="chartOptions"></div>');
            _$compile_(element)($scope);
            $scope.$digest();
        }));

        describe('with chartOptions', function() {
            beforeEach(function() {
                $scope.chartData = [
                    {
                        key: 'Series 1',
                        values:[{"x": 1, "y" : 5},{"x": 2, "y" : 10},{"x": 3, "y" : 15}]
                    }];
                $scope.chartOptions = {
                    chartType: 'lineChart',
                    data: 'chartData'
//                    margin: null,
//                    width: null,
//                    height: null,
//                    color: null,
//                    showLegend: null,
//                    rightAlignYAxis: false,
//                    useInteractiveGuideline: true,
//                    tooltips: true,
//                    tooltipContent: null,
//                    noData: null,
//                    transitionDuration: null
                };
                $scope.$digest();
            });

            it('should contain a lineChart', function() {
                expect(element.has('.nv-lineChart').length).toBeTruthy();
            });

            it('should have margin set', function() {

                var pre = $.map(element.find('[transform]'), function (e) {
                    return $(e).attr('transform');
                });

                $scope.chartOptions.margin = { top: 1, right: 1, bottom: 1, left: 1 };
                $scope.chartOptions.$chartScope.refresh();

                var post = $.map(element.find('[transform]'), function (e) {
                    return $(e).attr('transform');
                });

                expect(pre).toNotEqual(post);
            });

            it('should have width set', function() {
                var pre = $(element.find('rect').first()).attr('width');

                $scope.chartOptions.width = 400;
                $scope.chartOptions.$chartScope.refresh();

                var post = $(element.find('rect').first()).attr('width');

                expect(pre).toNotEqual(post);
            });

            it('should have height set', function() {
                var pre = $(element.find('rect').first()).attr('height');

                $scope.chartOptions.height = 200;
                $scope.chartOptions.$chartScope.refresh();

                var post = $(element.find('rect').first()).attr('height');

                expect(pre).toNotEqual(post);
            });

            it('should have color set', function() {
                var pre = $.map(element.find('.nv-line'), function(e) {
                    return $(e).parent().attr('style');
                });

                $scope.chartOptions.color = ['#FFF'];
                $scope.chartOptions.$chartScope.refresh();

                var post = $.map(element.find('.nv-line'), function(e) {
                    return $(e).parent().attr('style');
                });

                expect(pre).toNotEqual(post);
            });

            it('should have showLegend set', function() {
                expect(element.has('.nv-legend').length).toBeTruthy();

                $scope.chartOptions.showLegend = false;
                $scope.chartOptions.$chartScope.refresh();

                expect(element.has('.nv-legend').length).toBeFalsy();
            });

            it('should have rightAlignYAxis set', function() {
                expect($(element.find('.nv-y.nv-axis').first()).attr('transform')).toBeUndefined();

                $scope.chartOptions.rightAlignYAxis = true;
                $scope.chartOptions.$chartScope.refresh();

                expect($(element.find('.nv-y.nv-axis').first()).attr('transform')).toBeDefined();
            });

            it('should have useInteractiveGuideline set', function() {
                $scope.chartOptions = {
                    chartType: 'lineChart',
                    data: 'chartData',
                    useInteractiveGuideline: null
                };
                $scope.$digest();

                // todo: write test
            });

            it('should have tooltips set', function() {
                $scope.chartOptions = {
                    chartType: 'lineChart',
                    data: 'chartData',
                    tooltips: null
                };
                $scope.$digest();

                // todo: write test
            });

            it('should have tooltipContent set', function() {
                $scope.chartOptions = {
                    chartType: 'lineChart',
                    data: 'chartData',
                    tooltipContent: null
                };
                $scope.$digest();

                // todo: write test
            });

            it('should have noData set', function() {
                $scope.chartOptions = {
                    chartType: 'lineChart',
                    data: 'chartData',
                    noData: null
                };
                $scope.$digest();

                // todo: write test
            });

            it('should have transitionDuration set', function() {
                $scope.chartOptions = {
                    chartType: 'lineChart',
                    data: 'chartData',
                    transitionDuration: null
                };
                $scope.$digest();

                // todo: write test
            });

        });

        describe('with chartData', function() {
            beforeEach(function() {
                $scope.chartOptions = {
                    chartType: 'lineChart',
                    data: 'chartData',
                    margin: null,
                    width: null,
                    height: null,
                    color: null,
                    showLegend: null,
                    rightAlignYAxis: false,
                    useInteractiveGuideline: true,
                    tooltips: true,
                    tooltipContent: null,
                    noData: null,
                    transitionDuration: null
                };
            });

            it('should have data points', function() {
                $scope.chartData = [
                    {
                        key: 'Series 1',
                        values:[{"x": 1, "y" : 5},{"x": 2, "y" : 10},{"x": 3, "y" : 15}]
                    }];
                $scope.$digest();

                // todo: write test
            });
        });
    });
})();