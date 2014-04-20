# ng-d3

AngularJS D3 Charting using NVD3

## Examples

Line chart: plunker link
Line plus bar with focus chart: plunker link



## Getting Started

**Dependencies:**

ng-d3 requires the following javascript libraries:

jQuery
D3
NVD3

**Basic Usage:**

```
<script type="text/javascript" src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.min.js"></script>
<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/d3/3.4.5/d3.min.js"></script>
<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/nvd3/1.1.15-beta/nv.d3.min.js"></script>
<script type="text/javascript" src="ng-d3.js"></script>
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

| Option | Description |
| ------ | ----------- |
| chartType | required string. One of any available NVD3 models (ie. "lineChart", "discreteBarChart", "scatterChart", etc.) |
| data | required string. Name of a scope variable containing the data series | 


## License
ng-d3.js is freely distributable under the terms of the MIT license.
