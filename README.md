# ng-d3

AngularJS D3.js Charting using NVD3.js

## Examples

Line chart: http://plnkr.co/edit/otddjvR00Pn5d3j2szpP?p=preview

Line plus bar with focus chart: http://plnkr.co/edit/KHjItVXPhkBDbPqXPBVr?p=preview


## Getting Started

**Dependencies:**

ng-d3 requires the following javascript libraries:

jQuery (http://jquery.com/)
```html
<script type="text/javascript" src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
```
D3.js (http://d3js.org/)
```html
<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/d3/3.4.5/d3.min.js"></script>
```
NVD3.js (http://nvd3.org/)
```html
<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/nvd3/1.1.15-beta/nv.d3.min.js"></script>
<link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/nvd3/1.1.15-beta/nv.d3.min.css" />
```

**Basic Usage:**

```html
<script type="text/javascript" src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.min.js"></script>
<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/d3/3.4.5/d3.min.js"></script>
<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/nvd3/1.1.15-beta/nv.d3.min.js"></script>
<script type="text/javascript" src="http://rawgit.com/j3ko/ng-d3/master/build/ng-d3.min.js"></script>
<script>
    angular.module('myApp',['ngD3']);

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
<link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/nvd3/1.1.15-beta/nv.d3.min.css" /> 
<body ng-app="myApp" ng-controller="MyCtrl">
    <div ng-d3="chartOptions"></div>
</body>
```

## Documentation

**Chart Options:**

| Option | Description | Default |
| ------ | ----------- |
| chartType | required string. One of any available NVD3 models (ie. "lineChart", "discreteBarChart", "scatterChart", etc.) | none |
| data | required string. Name of a scope variable containing the data series | none | 
| color | an array of hex color codes ie. `["#fff","#000","#333"]` | none|
| margin | an object describing the margins of the form: `{ top: 10, left: 10, right: 10, bottom: 10 }` | none |
| showXAxis | displays the x-axis if true | true |
| xValue | sets the x-accessor to the specified constant or function of the form `function(d, i)` | none |
| xAxisLabel | sets the label of the x-axis | none |
| xAxisTickFormat | sets the x-axis tick format to the specified D3 format string or function | none | 
| x2AxisLabel | sets the label of the x2-axis | none |
| x2AxisTickFormat | sets the x2-axis tick format to the specified D3 format string or function | none | 
| showYAxis | displays the y-axis if true | true |
| yAxisLabel | sets the label of the y-axis | none |
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

<!-- **Data Options:** -->

## License
ng-d3.js is freely distributable under the terms of the MIT license.
