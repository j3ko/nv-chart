# nv-chart (ng-d3) [![Build Status](https://travis-ci.org/j3ko/nv-chart.svg?branch=master)](https://travis-ci.org/j3ko/nv-chart)

AngularJS D3.js charting using NVD3.js 

## Examples

Line chart: http://plnkr.co/edit/mvBrF5?p=preview

Line plus bar with focus chart: http://plnkr.co/edit/juLYmY?p=preview


## Getting Started

**Dependencies:**

nv-chart requires the following javascript libraries:

AngularJS (http://angularjs.org/)
```html
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.min.js"></script>
```
D3.js (http://d3js.org/)
```html
<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/d3/3.4.2/d3.min.js"></script>
```
NVD3.js (http://nvd3.org/)
```html
<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/nvd3/1.1.14-beta/nv.d3.js"></script>
<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/nvd3/1.1.14-beta/nv.d3.css" />
```

**Basic Usage:**

```html
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.min.js"></script>
<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/d3/3.4.2/d3.min.js"></script>
<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/nvd3/1.1.14-beta/nv.d3.js"></script>
<script type="text/javascript" src="http://rawgit.com/j3ko/nv-chart/master/build/nv-chart.min.js"></script>
<script>
    angular.module('myApp',['nvChart']);

	function MyCtrl($scope) {
		$scope.chartData = [{
			key: 'Series 1',
			values:[{'x': 1, 'y' : 5},{'x': 2, 'y' : 10},{'x': 3, 'y' : 15}]
		}];
		$scope.chartOptions = { 
			chartType: 'lineChart',
			data: 'chartData' 
		};
	};
</script>
<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/nvd3/1.1.14-beta/nv.d3.css" />
<link rel="stylesheet" href="http://rawgit.com/j3ko/nv-chart/master/build/nv-chart.min.css" />
<body ng-app="myApp" ng-controller="MyCtrl">
    <div nv-chart="chartOptions"></div>
</body>
```

## Documentation

**General Chart Options:**

| Option | Description | Default |
| ------ | ----------- | ------- |
| chartType | required string. One of any available NVD3 models (ie. "lineChart", "discreteBarChart", "scatterChart", etc.) | none |
| data | required string. Name of a scope variable containing the data series | none | 
| color | an array of hex color codes ie. `["#fff","#000","#333"]` | none|
| margin | an object describing the margins of the form: `{ top: 10, left: 10, right: 10, bottom: 10 }` | none |
| showXAxis | displays the x-axis if true | true |
| xValue | sets the x-accessor to the specified constant or function of the form `function(d, i)` | none |
| xAxisLabel | sets the label of the x-axis | none |
| xAxisTickFormat | sets the x-axis tick format to the specified D3 format string or function | none | 
| xShowMaxMin | display the max/min values on the x-axis | true |
| x2AxisLabel | sets the label of the x2-axis | none |
| x2AxisTickFormat | sets the x2-axis tick format to the specified D3 format string or function | none | 
| showYAxis | displays the y-axis if true | true |
| yValue | sets the y-accessor to the specified constant or function of the form `function(d, i)` | none |
| yAxisLabel | sets the label of the y-axis | none |
| yShowMaxMin | display the max/min values on the y-axis | true |
| yAxisTickFormat | sets the y-axis tick format to the specified D3 format string or function | none | 
| y1AxisLabel | sets the label of the y1-axis | none |
| y1AxisTickFormat | sets the y1-axis tick format to the specified D3 format string or function | none | 
| y2AxisLabel | sets the label of the y2-axis | none |
| y2AxisTickFormat | sets the y2-axis tick format to the specified D3 format string or function | none | 
| y3AxisLabel | sets the label of the y3-axis | none |
| y3AxisTickFormat | sets the y3-axis tick format to the specified D3 format string or function | none | 
| y4AxisLabel | sets the label of the y4-axis | none |
| y4AxisTickFormat | sets the y4-axis tick format to the specified D3 format string or function | none | 
| tooltips | diplays tooltips if true | true |
| showValues | displays the value in the chart if true | false |
| staggerLabels | staggers the labels for readability if true | false |
| useInteractiveGuideline | diplays an interactive guideline on the graph if true | true |
| transitionDuration | a number indicating the speed of transitions | 0 |

**Pie Chart Specific Options:**

| Option | Description | Default |
| ------ | ----------- | ------- |
| showLabels | displays labels if true | true |
| labelThreshold | configure the minimum slice size for labels to show up | 0.5 |
| labelType | configure what type of data to show in the label.  One of: "key", "value" or "percent" | "key" |
| donut | sets the chart to donut mode | false |
| donutRatio | configure the size of the donut hole | 0 |

<!-- **Data Options:** -->

## License
nv-chart.js is freely distributable under the terms of the MIT license.
