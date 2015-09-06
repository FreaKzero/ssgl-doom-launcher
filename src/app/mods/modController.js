var execFile = require('child_process').execFile;

app.controller('modController', ['$scope', 'modService', modController]);

function modController($scope, modService) {
    var self = this;

    modService.getMods($scope.config).then(function(mods) {
        $scope.mods = mods;
    });

    $scope.selected = [];

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
            $scope.selected = _($scope.selected).filter(function(item) {
                return item.path !== mod.path;
            });

        } else {
            $scope.selected.push(mod);
        }
    };

    $scope.$on('STARTOBLIGE', function(ev, iwad) {
        var child;
        var params = ['--batch', $scope.config.mappath];
        var endparam = params.concat(['--load'], $scope.config.mapconfig);

        child = execFile($scope.config.oblige, endparam, function(error, stdout, stderr) {
            if (error) {
                return error.signal;
            }
        });

        child.on('exit', function(code) {
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