var d3Event = function($scope) {
    var self = this;

    self.bindModel = function(model) {
        if (model.legend) {
            model.legend.dispatch.on('legendClick.nv-chart', function (d, i) {
                $scope.$emit('legendClick.nv-chart', d, i);
            });
        }
    };

    self.unbindModel = function(model) {
        if (model.legend) {
            model.legend.dispatch.on('legendClick.nv-chart', null);
        }
    };
};
