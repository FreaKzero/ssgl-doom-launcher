(function() {        
    app.controller('appController', ['$scope', '$mdDialog', '$mdToast', '$mdBottomSheet', '$mdSidenav', 'modlistService', '$http', 'iwadService', 'nwService','gameService', appController]);

    /**
     * appController     
     * General App Controller (Menus, Fab)
     
     * @module ssgl
     * @submodule appController
     * @param  Service $scope         
     * @param  Service $mdDialog      
     * @param  Service $mdToast       
     * @param  Service $mdBottomSheet 
     * @param  Service $mdSidenav
     * @param  Service modlistService modlist Holder Service
     * @param  Service $http
     * @param  Service iwadService iwad Holder Service
     * @param  Service nwService Node Webkit Service
     * @param  Service gameService Service to Start Doom Engines or Oblige    
     */
    function appController($scope, $mdDialog, $mdToast, $mdBottomSheet, $mdSidenav, modlistService, $http, iwadService, nwService, gameService) {
        var $PARENT = $scope;
        var TOASTDELAY = 1500;

        /**
         * Update Toast gets fired when appController gets loaded (App init)
         * And fetches package.json from github
         *
         * @for appController
         * @uses  $http Ajax Service to github Repository
         * @event update
         */

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


        /**
         * Fires up Settings Dialog
         *
         * @for appController
         * @method showSettings
         * @param  Object ev Clickevent
         */
        $scope.showSettings = function(ev) {
            SettingsDialog(ev);
        };

        /**
         * [reload description]
         *
         * @for appController
         * @method reload
         * @return {[type]} [description]
         */
        $scope.reload = function() {
            window.location.reload();
        };

        /**
         * Opens Wadfolder in Native Explorer/Finder
         *
         * @for appController
         * @uses  nwService
         * @method openWADFolder         
         */
        $scope.openWADFolder = function() {
            nwService.getShell().openItem($scope.config.wadpath);
        };

        /**
         * Opens Oblige
         * 
         * @for appController
         * @uses nwService
         * @method openOblige         
         */
        $scope.openOblige = function() {
            nwService.getShell().openItem($scope.config.oblige.binary);
        };

        /**
         * opens WadSeeker
         * 
         * @for appController
         * @uses  nwService
         * @method openMultiplayer         
         */
        $scope.openMultiplayer = function() {
            nwService.getShell().openItem($scope.config.online.client);
        };

        //TODO Wrong
        /**
         * Opens AngularMaterial Contextmenu (About, Settings etc.)
         *
         * @for appController
         * @uses $mdOpenMenu
         * @method openMenu
         * @param  Service $mdOpenMenu SidemenuService
         * @param  Event ev Clickevent
         */
        $scope.openMenu = function($mdOpenMenu, ev) {
            var originatorEv = ev;
            $mdOpenMenu();
        };

        /**
         * Toggles Sidebar
         *
         * @for appController
         * @uses  $mdSidenav AngularMaterial Sidenav Service
         * @method toggleSideba
         */
        $scope.toggleSidebar = function() {
            $mdSidenav('left').toggle();
        };

        /**
         * [showAboutDialog description]
         * @method showAboutDialog
         * @param  {[type]}        ev [description]
         * @return {[type]}           [description]
         */
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