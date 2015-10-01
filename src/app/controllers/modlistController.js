(function() {
    app.controller('modlistController', ['$scope', 'modlistService', '$rootScope', '$mdDialog', '$mdToast', modlistController]);

    function modlistController($scope, modlistService, $rootScope, $mdDialog, $mdToast) {

        modlistService.getLists().then(function(list) {
            $scope.modlist = list;
        });

        $parent = $scope;
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
                $scope.double = [];
                $scope.title = 'Rename List';

                $scope.checkdoubles = function() {
                    $scope.double = $parent.modlist.filter(function(list) {
                        return $scope.listname === list.name;
                    });
                };

                $scope.submitForm = function(valid) {
                    if (valid && $scope.double.length === 0) {
                        item.name = $scope.listname;

                        modlistService.rename(item).then(function(renamed) {
                            $mdToast.show(
                                $mdToast.simple()
                                .content('List renamed to ' + renamed).position('bottom').hideDelay(1500)
                            );
                        }, function(error) {
                            $mdToast.show(
                                $mdToast.simple()
                                .content(error.message).position('bottom').hideDelay(1500)
                            );
                        });

                        $mdDialog.cancel();
                    }
                };

                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
            }
        };

        $scope.delete = function(ev, $index) {
            var confirm = $mdDialog.confirm()
                .title('Really Delete ?')
                .content('List ' + $scope.modlist[$index].name + ' will be deleted, are you sure ?')
                .ok('Delete')
                .cancel('Cancel')
                .targetEvent(ev);

            $mdDialog.show(confirm).then(function() {
                
                modlistService.remove($scope.modlist[$index]).then(function(listname) {
                    $mdToast.show(
                        $mdToast.simple()
                        .content('List ' + listname + ' removed').position('bottom').hideDelay(1500)
                    );
                }, function(error) {
                    $mdToast.show(
                        $mdToast.simple()
                        .content(error.message).position('bottom').hideDelay(1500)
                    );
                });

                $scope.modlist.splice($index, 1);
            }, function() {
                $mdDialog.cancel();
            });

        };

        $scope.selectList = function($index) {
            $rootScope.$broadcast('USELIST', $scope.modlist[$index].wads, $scope.modlist[$index].name);
        };
    }
})();