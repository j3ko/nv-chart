(function() {
    'use strict';
    describe('lineChart', function() {
        var element;
        var $scope;

        beforeEach(module('nvChart'));

        beforeEach(inject(function(_$compile_, _$rootScope_) {
            $scope = _$rootScope_;
            element = angular.element('<div nv-chart="chartOptions"></div>');
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
                $scope.chartOptions.$reload();

                var post = $.map(element.find('[transform]'), function (e) {
                    return $(e).attr('transform');
                });

                expect(pre).toNotEqual(post);
            });

            it('should have width set', function() {
                var pre = $(element.find('rect').first()).attr('width');

                $scope.chartOptions.width = 400;
                $scope.chartOptions.$reload();

                var post = $(element.find('rect').first()).attr('width');

                expect(pre).toNotEqual(post);
            });

            it('should have height set', function() {
                var pre = $(element.find('rect').first()).attr('height');

                $scope.chartOptions.height = 200;
                $scope.chartOptions.$reload();

                var post = $(element.find('rect').first()).attr('height');

                expect(pre).toNotEqual(post);
            });

            it('should have color set', function() {
                var pre = $.map(element.find('.nv-line'), function(e) {
                    return $(e).parent().attr('style');
                });

                $scope.chartOptions.color = ['#FFF'];
                $scope.chartOptions.$reload();

                var post = $.map(element.find('.nv-line'), function(e) {
                    return $(e).parent().attr('style');
                });

                expect(pre).toNotEqual(post);
            });

            it('should have showLegend set', function() {
                expect(element.has('.nv-legend').length).toBeTruthy();

                $scope.chartOptions.showLegend = false;
                $scope.chartOptions.$reload();

                expect(element.has('.nv-legend').length).toBeFalsy();
            });

            it('should have rightAlignYAxis set', function() {
                expect($(element.find('.nv-y.nv-axis').first()).attr('transform')).toBeUndefined();

                $scope.chartOptions.rightAlignYAxis = true;
                $scope.chartOptions.$reload();

                expect($(element.find('.nv-y.nv-axis').first()).attr('transform')).toBeDefined();
            });

            it('should have useInteractiveGuideline set', function() {
                expect(element.has('.nv-interactiveLineLayer').length).toBeFalsy();

                $scope.chartOptions.useInteractiveGuideline = true;
                $scope.chartOptions.$reload();

                expect(element.has('.nv-interactiveLineLayer').length).toBeTruthy();
            });

            it('should have forceX set', function() {
                var minMax = $.map(element.find('.nv-x.nv-axis .nv-axisMaxMin').find('text'), function(e) { return $(e).text(); });
                expect(minMax).toContain('1', '3');

                $scope.chartOptions.forceX = [0, 6];
                $scope.chartOptions.$reload();

                minMax = $.map(element.find('.nv-x.nv-axis .nv-axisMaxMin').find('text'), function(e) { return $(e).text(); });
                expect(minMax).toContain('0', '6');
            });

            it('should have forceY set', function() {
                var minMax = $.map(element.find('.nv-y.nv-axis .nv-axisMaxMin').find('text'), function(e) { return $(e).text(); });
                expect(minMax).toContain('5', '15');

                $scope.chartOptions.forceY = [0, 20];
                $scope.chartOptions.$reload();

                minMax = $.map(element.find('.nv-y.nv-axis .nv-axisMaxMin').find('text'), function(e) { return $(e).text(); });
                expect(minMax).toContain('0', '20');
            });

            it('should have tooltips set', function() {
                // todo: tooltips write test
            });

            it('should have tooltipContent set', function() {
                // todo: tooltipContent write test
            });

            it('should have noData set', function() {
                $scope.chartData = null;
                $scope.$digest();

                expect(element.find('.nv-noData').text()).toEqual('No Data Available.');

                $scope.chartOptions.noData = 'Test No Data';
                $scope.chartOptions.$reload();

                expect(element.find('.nv-noData').text()).toEqual('Test No Data');
            });

            it('should have transitionDuration set', function() {
                // todo: write test
            });

            it('should have showXAxis set', function() {
                expect(element.find('.nv-x.nv-axis').children().length).toBeTruthy();

                $scope.chartOptions.showXAxis = false;
                $scope.chartOptions.$reload();

                expect(element.find('.nv-x.nv-axis').children().length).toBeFalsy();
            });

            it('should have showYAxis set', function() {
                expect(element.find('.nv-y.nv-axis').children().length).toBeTruthy();

                $scope.chartOptions.showYAxis = false;
                $scope.chartOptions.$reload();

                expect(element.find('.nv-y.nv-axis').children().length).toBeFalsy();
            });
        });

        describe('with chartData', function() {
            beforeEach(function() {
                $scope.chartOptions = {
                    chartType: 'lineChart',
                    data: 'chartData'
                };
            });

            it('should have data points', function() {
                $scope.chartData = [
                    {
                        key: 'Series 1',
                        values:[{"x": 1, "y" : 5},{"x": 2, "y" : 10},{"x": 3, "y" : 15}]
                    }];
                $scope.$digest();

                expect(element.find('.nv-line').length).toBeTruthy();
            });

        });
    });
})();