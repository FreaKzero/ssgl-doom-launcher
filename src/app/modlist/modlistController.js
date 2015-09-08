app.controller('modlistController', ['$scope', 'modlistService', '$rootScope', '$mdDialog', modlistController]);

function modlistController($scope, modlistService, $rootScope, $mdDialog) {

    modlistService.getLists().then(function(list) {
        $scope.modlist = list;
    });

    $scope.$on('MODIFIEDLISTS', function() {
        modlistService.getLists().then(function(list) {
            $scope.modlist = list;
        });
    });

    $scope.rename = function(ev, $index) {
        var item = $scope.modlist[$index];

        $mdDialog.show({
            controller: renameListController,
            templateUrl: 'app/templates/AddListPrompt.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false
        });

        function renameListController($scope, $mdDialog, modlistService) {
            $scope.listname = item.name;

            $scope.saveList = function() {
                item.name = $scope.listname;
                modlistService.rename(item);
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };
        }    
    };

    $scope.delete = function(ev, $index) {
        var confirm = $mdDialog.confirm()
          .title('Really Delete ?')
          .content('List '+$scope.modlist[$index].name+' will be deleted, are you sure ?')
          .ok('Delete')
          .cancel('Cancel')
          .targetEvent(ev);

    $mdDialog.show(confirm).then(function() {
        modlistService.remove($scope.modlist[$index].path);
        $scope.modlist.splice($index, 1);         
    }, function() {
      $mdDialog.cancel();
    });

    };

    $scope.select = function($index) {
        $rootScope.$broadcast('USELIST', $scope.modlist[$index].wads);
    };
}