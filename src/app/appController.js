var path = require('path'),
    fs = require('fs');

app.controller('appController', ['$scope', '$mdDialog', '$mdToast', '$mdBottomSheet', appController]);


function appController($scope, $mdDialog, $mdToast, $mdBottomSheet) {

    var CONFIG = $scope.config;
    var CONFIGFILE = '/config.json';
    var TOASTDELAY = 1500;
    
    $scope.showGameSelection = function($event) {
        var $PARENT = $scope;

        $mdBottomSheet.show({
            templateUrl: 'app/templates/GameSelection.html',
            controller: GameSelectionController,
            targetEvent: $event
        }).then(function(clickedItem) {
            alert(clickedItem.name + ' clicked!');
        });

        function GameSelectionController($scope, $mdBottomSheet) {

            $scope.startGame = function($index) {
                var iwad = $scope.iwads[$index].file;
                $PARENT.$broadcast('STARTGZDOOM', iwad);
                $mdBottomSheet.hide();
            };
        }
    };


    $scope.showSettings = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'app/templates/Settings.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        });

        function DialogController($scope, $mdDialog) {

            $scope.settings = CONFIG;

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.save = function() {
                var appPath = path.dirname(process.execPath);
                fs.writeFile(appPath + CONFIGFILE, JSON.stringify($scope.settings, null, 4), function(err) {

                    if (err) {
                        $mdToast.show(
                            $mdToast.simple().content('Error Occured please Restart').position('bottom').hideDelay(TOASTDELAY)
                        );

                        throw err;
                    } else {
                        $mdToast.show(
                            $mdToast.simple().content('Saved Settings').position('bottom').hideDelay(TOASTDELAY)
                        );
                    }

                });

                $mdDialog.cancel();
            };
        }
    };
}