var d3Event = function($scope, $rootScope) {
    var self = this;
    var elems = ['lines', 'bars', 'pie', 'discretebar', 'multibar', 'scatter'];

    self.bindModel = function(model) {
        if (model.legend) {
            model.legend.dispatch.on('legendClick.nv-chart', function (d, i) {
                $rootScope.$broadcast('legendClick.nv-chart', d, i);
            });
        }

        angular.forEach(elems, function(e) {
            self.bindElementClick(model, e);
        });
    };

    self.bindElementClick = function(model, elem) {
        if (model[elem] && model[elem].dispatch.elementClick) {
            model[elem].dispatch.on('elementClick.nv-chart', function(d, i) {
                $rootScope.$broadcast('elementClick.nv-chart', d, i);
            });
        }
    };

    self.unbindModel = function(model) {
        if (model.legend) {
            model.legend.dispatch.on('legendClick.nv-chart', null);
        }

        angular.forEach(elems, function(e) {
            self.unbindElementClick(model, e);
        });
    };

    self.unbindElementClick = function(model, elem) {
        if (model[elem] && model[elem].dispatch.elementClick) {
            model[elem].dispatch.on('elementClick.nv-chart', null);
        }
    };
};
