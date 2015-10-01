 (function() {

    var execFile = require('child_process').execFile;       
    app.controller('modController', ['$scope', 'modService', 'modlistService', '$mdDialog', 'nwService','modselectedService', '$mdToast', modController]);

    function modController($scope, modService, modlistService, $mdDialog, nwService, modselectedService, $mdToast) {
        var self = this;
        var $parent = $scope;

        $scope.usedList = false;
    
        modselectedService.getSelected().then(function(selected) {
            $scope.selected = selected;
        });

        modService.getMods($scope.config.wadpath).then(function(mods) {
            $scope.mods = mods;
            
            if ($scope.config.initList !== false) {
                try {
                    var startListJSON = JSON.parse($scope.config.initList);
                    var startList = nwService.readSyncJSON(startListJSON.path);

                   $scope.$broadcast('USELIST', startList, startListJSON.name);
                } catch (e) {
                    console.log(e);
                }
            }
            
        });
        
        $scope.$on('USELIST', function(ev, wads, name) {
            $scope.selected = wads;
            $scope.usedList = name;

            $scope.mods.filter(function(item) {
                item.checked = false;
            });

            _.each(wads, function(item) {
                var index = _.findIndex($scope.mods, {
                    path: item.path
                });
                $scope.mods[index].checked = true;
            });
        });

        $scope.newSelected = function() {
            $scope.mods.filter(function(item) {
                item.checked = false;
            });

            $scope.selected = [];
            $scope.usedList = false;
        };

        $scope.saveSelected = function(ev) {
            $mdDialog.show({
                controller: saveSelectedController,
                templateUrl: 'app/templates/AddListPrompt.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false
            });

            function saveSelectedController($scope, $mdDialog, modlistService) {
                $scope.title = 'Save List';

                if ($parent.usedList !== false) {
                    $scope.listname = $parent.usedList;
                }

                $scope.double = [];

                $scope.cancel = function() {
                    $mdDialog.cancel();
                };

                $scope.checkdoubles = function() {};

                $scope.submitForm = function() {
                    modlistService.saveSelected($scope.listname, $parent.selected).then(function(listname) {
                        $mdToast.show(
                            $mdToast.simple()
                            .content('Saved List to '+listname).position('bottom').hideDelay(1500)
                        );
                    }, function(error) {
                        $mdToast.show(
                            $mdToast.simple()
                            .content(error.message).position('bottom').hideDelay(1500)
                        );
                    });

                    

                    $parent.usedList = $scope.listname;
                    $mdDialog.cancel();
                };
            }
        };

        $scope.moveUp = function($index) {
            if ($index > 0) {
                _.move($scope.selected, $index, $index - 1);
            }
        };

        $scope.moveDown = function($index) {
            if ($scope.selected.length - 1 !== $index) {
                _.move($scope.selected, $index, $index + 1);
            }
        };

        $scope.checked = function(mod) {
            if (mod.checked === false) {
                mod.checked = true;
                $scope.selected.push(mod);

            } else {
                mod.checked = false;
                $scope.selected = _($scope.selected).filter(function(item) {
                    return item.path !== mod.path;
                });
            }
        };
     
        $scope.$on('STARTOBLIGE', function(ev, iwad, config, engine, log) {
            $mdDialog.show({
                templateUrl: 'app/templates/ObligeLoading.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false
            });

            var child;
            var params = ['--batch', $scope.config.oblige.mappath];
            var endparam = params.concat(['--load'], config);
            
            child = execFile($scope.config.oblige.binary, endparam, function(error, stdout, stderr) {
                if (log === true) {
                    nwService.writeTxt(stdout, 'obligelog.txt').then(function() {
                        nwService.getShell().openItem('obligelog.txt');                        
                    });
                }

                if (error) {
                    $mdDialog.hide();
                    alert(error.signal);
                    return false;
                }
            });

            child.on('exit', function(code) {
                $mdDialog.hide();
                setTimeout(function() {
                     $scope.$broadcast('STARTGZDOOM', iwad, $scope.config.oblige.mappath, engine);
                 }, 1500);               
            });
        });

        $scope.$on('STARTGZDOOM', function(ev, iwad, map, engine, dialog) {
            if (typeof map === 'undefined') {
                map = false;
            }

            if (typeof dialog === 'undefined') {
                dialog = false;
            }

            var child;
            var SAVEDIR;
            var useEngine = "";

            switch (engine.toLowerCase()) {
                case "gzdoom":
                    useEngine = $scope.config.engines.gzdoom;

                    if ($scope.usedList !== false) {
                        SAVEDIR = $scope.config.savepaths.gzdoom + $scope.usedList;
                    } else {
                        SAVEDIR = $scope.config.savepaths.gzdoom + 'default';
                    }

                    break;

                case "zandronum":
                    useEngine = $scope.config.engines.zandronum;

                    if ($scope.usedList !== false) {
                        SAVEDIR = $scope.config.savepaths.zandronum + $scope.usedList;
                    } else {
                        SAVEDIR = $scope.config.savepaths.zandronum + 'default';
                    }
                    break;

                case "zdoom":
                    useEngine = $scope.config.engines.zdoom;

                    if ($scope.usedList !== false) {
                        SAVEDIR = $scope.config.savepaths.zdoom + $scope.usedList;
                    } else {
                        SAVEDIR = $scope.config.savepaths.zdoom + 'default';
                    }

                    break;
            }
           
            var params = ['-iwad', $scope.config.iwadpath + iwad, '-savedir', SAVEDIR];
            var wads = $scope.selected.map(function(item) {
                return item.path;
            });

            if (map !== false) {
                wads.push(map);
            }

            if (dialog !== false) {
                dialog.hide();
            }

            params = params.concat(['-file'], wads);
            child = execFile(useEngine, params,

                function(error, stdout, stderr) {
                    if (error) {
                        console.log(error.stack);
                        console.log('Error code: ' + error.code + ' ' + error.signal);
                    }
                });

            child.on('exit', function(code) {
                console.log('EXIT: ' + code);
            });
        });
    }
})();