app.controller('fabController', ['$scope', fabController]);

function fabController($scope) {
    
    $scope.start = function(ev) {
        $scope.$broadcast('STARTGZDOOM', true);
    };

    $scope.toggleFab = function() {    
        if ($scope.isOpen === false) {
            $scope.isOpen = true;
        } else {
            $scope.isOpen = false;
        }
    };
}