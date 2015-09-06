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
        });

        function GameSelectionController($scope, $mdBottomSheet) {
            $scope.obligeactive = CONFIG.obligeactive;

            $scope.startGame = function($index) {
                var iwad = $scope.iwads[$index].file;
                $PARENT.$broadcast('STARTGZDOOM', iwad);
                $mdBottomSheet.hide();
            };

            $scope.startGameOblige = function($index) {
                 var iwad = $scope.iwads[$index].file;
                 $PARENT.$broadcast('STARTOBLIGE', iwad);
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
                window.location.reload(); 
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
                            $mdToast.simple().content('Saved Settings - Reloading...').position('bottom').hideDelay(TOASTDELAY)
                        );
                        setTimeout(function() {
                            window.location.reload(); 

                        }, TOASTDELAY + 500);                        
                    }

                });

                $mdDialog.cancel();
            };
        }
    };
}