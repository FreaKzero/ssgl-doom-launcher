(function() {
    app.controller('appController', ['$scope', '$mdDialog', '$mdToast', '$mdBottomSheet', '$mdSidenav', 'modlistService', '$http', 'iwadService', 'nwService','gameService', appController]);

    function appController($scope, $mdDialog, $mdToast, $mdBottomSheet, $mdSidenav, modlistService, $http, iwadService, nwService, gameService) {
        var $PARENT = $scope;
        var TOASTDELAY = 1500;

        $mdToast.show(
            $mdToast.simple()
            .content('Checking for Updates...').position('bottom').hideDelay(TOASTDELAY)
        );

        $http.get('https://raw.githubusercontent.com/FreaKzero/ssgl-doom-launcher/master/package.json').
        then(function(response) {
            if ($scope.APPVERSION !== '0.0.0' && response.data.version !== $scope.APPVERSION) {

                $mdDialog.show({
                    controller: function($scope) {
                        $scope.downloadversion = response.data.version;

                        $scope.download = function(url) {
                            var release = 'https://github.com/FreaKzero/ssgl-doom-launcher/releases/tag/v' + response.data.version;
                            nwService.getShell().openExternal(release);
                        };

                        $scope.close = function() {
                            $mdDialog.cancel();
                        };
                    },

                    templateUrl: 'app/templates/Update.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true
                });
            }

        }, function(response) {
            console.log('ERROR: ' + response);
        });

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
            nwService.getShell().openItem($scope.config.oblige.binary);
        };

        $scope.openMultiplayer = function() {
            nwService.getShell().openItem($scope.config.online.client);
        };

        $scope.openMenu = function($mdOpenMenu, ev) {
            var originatorEv = ev;
            $mdOpenMenu();
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
                $scope.version = $PARENT.APPVERSION;
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
                $scope.useoblige = false;

                iwadService.getIWADS($PARENT.config.iwadpath).then(function(iwads) {
                    $scope.iwads = iwads;
                });

                $scope.config = $PARENT.config;
                
                $scope.startGame = function($index, engine, $event) {

                    if ($scope.useoblige === false) {
                        //TODO: usedlist
                        gameService.startDoom({
                            iwad: $scope.iwads[$index].file,
                            map: false, 
                            engine: engine, 
                            dialog: null
                        });

                        $mdBottomSheet.hide();

                    } else {

                        $scope.startGameOblige($event, $index, engine);

                    }
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
                            gameService.startOblige({
                                iwad: iwad,
                                config: $scope.selectedconfig,
                                engine: engine
                            });
                        };

                        $scope.continue = function() {
                            gameService.startDoom({
                                iwad: iwad,
                                config: $scope.selectedconfig,
                                engine: engine,
                                map: $PARENT.config.oblige.mappath
                            });

                            $mdDialog.cancel();
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