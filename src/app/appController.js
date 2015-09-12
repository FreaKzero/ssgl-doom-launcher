var path = require('path'),
    fs = require('fs'),
    gui = require('nw.gui');

app.controller('appController', ['$scope', '$mdDialog', '$mdToast', '$mdBottomSheet', '$mdSidenav', 'modlistService', '$http', appController]);


function appController($scope, $mdDialog, $mdToast, $mdBottomSheet, $mdSidenav, modlistService, $http) {

    var $PARENT = $scope;
    var CONFIGFILE = '/config.json';
    var TOASTDELAY = 1500;
    var VERSION = '0.0.1';

    $scope.reload = function() {
        window.location.reload();
    };

    $scope.checkUpdates = function(ev) {    
        $http.get('https://raw.githubusercontent.com/FreaKzero/gzdoom-launcher/master/package.json').
        then(function(response) {

            if ( response.data.version !== VERSION) {
                
            $mdDialog.show(
                  $mdDialog.alert()                    
                    .clickOutsideToClose(true)
                    .title('New Version available!')
                    .content('Download it here: '+ response.data.releaseDownload)
                    .ok('Yup')
                    .targetEvent(ev)
                );
            
            } else {
                $mdDialog.show(
                  $mdDialog.alert()                    
                    .clickOutsideToClose(true)
                    .title('No new Updates')
                    .content('You have the most recent Version')
                    .ok('Yup')
                    .targetEvent(ev)
                );
            }

        }, function(response) {
            console.log('ERROR: ' + response);
        });
    };

    $scope.openMenu = function($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    };

    $scope.toggleSidebar = function() {
        $mdSidenav('left').toggle();
    };

    $scope.showAboutDialog = function(ev) {

        $mdDialog.show({
            controller: AboutDialogController,
            templateUrl: 'app/templates/AboutDialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        });

        function AboutDialogController($scope, $mdBottomSheet) {

            $scope.openURL = function(url) {
                gui.Shell.openExternal(url);
            };

            $scope.yup = function() {
                $mdDialog.cancel();
            };
        }
    };

    $scope.showGameSelection = function($event) {

        $mdBottomSheet.show({
            templateUrl: 'app/templates/GameSelection.html',
            controller: GameSelectionController,
            targetEvent: $event
        });

        function GameSelectionController($scope, $mdBottomSheet) {
            $scope.obligeactive = $PARENT.config.obligeactive;

            $scope.startGame = function($index) {
                var iwad = $scope.iwads[$index].file;
                $PARENT.$broadcast('STARTGZDOOM', iwad);
                $mdBottomSheet.hide();
            };

            $scope.startGameOblige = function(ev, $index) {
                var iwad = $scope.iwads[$index].file;

                $mdBottomSheet.hide();
                $mdDialog.show({
                    controller: ConfigDialogController,
                    templateUrl: 'app/templates/SelectConfig.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false
                });

                function ConfigDialogController($scope, $mdDialog) {
                    $scope.mapconfigs = $PARENT.mapconfigs;
                    console.log($scope.mapconfigs);
                    $scope.selected = $scope.mapconfigs[0].path;

                    $scope.start = function($index) {
                        $PARENT.$broadcast('STARTOBLIGE', iwad, $scope.selected);
                    };

                    $scope.cancel = function() {
                        $mdDialog.hide();
                    };
                }
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
            modlistService.getLists().then(function(list) {
                $scope.modlist = list;
            });

            $scope.settings = $PARENT.config;

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