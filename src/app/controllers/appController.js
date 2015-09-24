(function() {
    app.controller('appController', ['$scope', '$mdDialog', '$mdToast', '$mdBottomSheet', '$mdSidenav', 'modlistService', '$http', 'iwadService', 'nwService', appController]);
    function appController($scope, $mdDialog, $mdToast, $mdBottomSheet, $mdSidenav, modlistService, $http, iwadService, nwService) {

        var $PARENT = $scope;        
        var TOASTDELAY = 1500;

        if ($scope.config.freshinstall === true) {
            SettingsDialog(null);
        }

        $scope.showSettings = function(ev) {
            SettingsDialog(ev);
        };

        $scope.reload = function() {
            window.location.reload();
        };

        $scope.openWADFolder = function() {
            nwService.getShell().openItem($scope.config.wadpath);
        };

        $scope.openOblige = function() {
            child = execFile($scope.config.oblige.binary, [],
                function(error, stdout, stderr) {
                    if (error) {
                        console.log(error.stack);
                        console.log('Error code: ' + error.code + ' ' + error.signal);
                    }
                });

            child.on('exit', function(code) {
                console.log('EXIT: ' + code);
            });
        };

        $scope.checkUpdates = function(ev) {
            $http.get('https://raw.githubusercontent.com/FreaKzero/ssgl-doom-launcher/master/package.json').
            then(function(response) {

                if (response.data.version !== $scope.APPVERSION) {

                    $mdDialog.show(
                        $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('New Version available!')
                        .content('Download it here: ' + response.data.releaseDownload)
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
                    nwService.getShell().openExternal(url);
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

            function GameSelectionController($scope, $mdBottomSheet, iwadService) {  
                iwadService.getIWADS($PARENT.config.iwadpath).then(function(iwads) {
                    $scope.iwads = iwads;
                });

                $scope.config = $PARENT.config;

                if ($PARENT.config.active.zandronum) {
                    $scope.engine = 'Zandronum';
                }

                if ($PARENT.config.active.gzdoom) {
                    $scope.engine = 'gzDoom';
                }

                $scope.startGame = function($index, engine) {
                    var iwad = $scope.iwads[$index].file;

                    $PARENT.$broadcast('STARTGZDOOM', iwad, false, engine);
                    $mdBottomSheet.hide();
                };

                $scope.startGameOblige = function(ev, $index, engine) {
                    var iwad = $scope.iwads[$index].file;

                    $mdBottomSheet.hide();

                    $mdDialog.show({
                        controller: ConfigDialogController,
                        templateUrl: 'app/templates/SelectConfig.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: false
                    });

                    function ConfigDialogController($scope, $mdDialog, nwService) {
                        
                        nwService.getDir($PARENT.config.oblige.configs).then(function(files) {
                            $scope.mapconfigs = files.map(function(cfg) {
                                return {
                                    name: cfg,
                                    path: $PARENT.config.oblige.configs + cfg
                                };
                            });

                            if ($scope.mapconfigs.length > 0) {
                                $scope.selected = $scope.mapconfigs[0].path;
                            }

                        });
                                                                                                        
                        $scope.start = function($index) {
                            $PARENT.$broadcast('STARTOBLIGE', iwad, $scope.selected, engine);
                        };

                        $scope.continue = function() {
                            $PARENT.$broadcast('STARTGZDOOM', iwad, $PARENT.config.oblige.mappath, engine);
                        };

                        $scope.cancel = function() {
                            $mdDialog.hide();
                        };
                    }
                };
            }
        };

        function SettingsDialog(ev) {
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

                $scope.config = $PARENT.config;

                $scope.cancel = function() {
                    $mdDialog.cancel();
                };

                $scope.save = function() {
                    $scope.config.freshinstall = false;

                    nwService.writeJSON($scope.config, 'config.json', true).then(function() {
                        $mdToast.show(
                            $mdToast.simple().content('Saved Settings - Reloading...').position('bottom').hideDelay(TOASTDELAY)
                        );
                    }, function() {
                        $mdToast.show(
                            $mdToast.simple().content('Error Occured please Restart').position('bottom').hideDelay(TOASTDELAY)
                        );
                    });
                    
                    setTimeout(function() {
                        window.location.reload();
                    }, TOASTDELAY + 500);

                    $mdDialog.cancel();
                };
            }
        }
    }
})();