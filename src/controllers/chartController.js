d3App
.controller('chartController', ['$scope', function($scope) {
    var ctrl = this,
        menuItems = ctrl.menuItems = [];

    ctrl.addMenuItem = function(_) {
        menuItems.push(_);
    };
    ctrl.removeMenuItem = function(_) {
        var index = menuItems.indexOf(_);
        menuItems.splice(index, 1);
    };

}]);
