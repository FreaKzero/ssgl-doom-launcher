var execFile = require('child_process').execFile,
    fs = require('fs');

app.controller('modController', ['$scope', 'modService', 'modlistService', '$mdDialog', modController]);

function modController($scope, modService, modlistService, $mdDialog) {
    var self = this;
    var $parent = $scope;

    $scope.usedList = false;    
    $scope.selected = [];

    modService.getMods($scope.config).then(function(mods) {        
        $scope.mods = mods;
        if ($scope.config.initList !== false) {
            try {
                var startListJSON = JSON.parse($scope.config.initList);
                var startList = JSON.parse(fs.readFileSync(startListJSON.path, "utf8"));   
                
                $scope.$broadcast('USELIST', startList, startListJSON.name);        
            } catch(e) {
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
                modlistService.saveSelected($scope.listname, $parent.selected);
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

    $scope.$on('STARTOBLIGE', function(ev, iwad, config) {

        $mdDialog.show({
            templateUrl: 'app/templates/ObligeLoading.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false
        });

        var child;
        var params = ['--batch', $scope.config.mappath];
        var endparam = params.concat(['--load'], $scope.config.mapconfig + config);

        child = execFile($scope.config.oblige, endparam, function(error, stdout, stderr) {
            if (error) {
                $mdDialog.hide();
                alert(error.signal);
                return false;
            }
        });

        child.on('exit', function(code) {
            $mdDialog.hide();
            $scope.$broadcast('STARTGZDOOM', iwad, $scope.config.mappath);
        });

    });

    $scope.$on('STARTGZDOOM', function(ev, iwad, map) {
        if (typeof map === 'undefined') {
            map = false;
        }

        var child;
        var params = ['-iwad', $scope.config.iwadpath + iwad];

        var wads = $scope.selected.map(function(item) {
            return item.path;
        });

        if (map !== false) {
            wads.push(map);
        }

        params = params.concat(['-file'], wads);

        child = execFile($scope.config.gzDoom, params,
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