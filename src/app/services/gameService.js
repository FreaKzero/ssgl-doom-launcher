(function() {

    var execFile = require('child_process').execFile;
    app.factory('gameService', ['$q','$rootScope', '$mdDialog', 'modselectedService', 'nwService', gameService]);

    function gameService($q, $rootScope, $mdDialog, modselectedService, nwService) {
        var service = {};

        service.startDoom = function(opt) {
            if (typeof opt.map === 'undefined' || opt.map === null) {
                opt.map = false;
            }

            if (typeof opt.dialog === 'undefined' || opt.dialog === null) {
                opt.dialog = false;
            }

            var child,
                savedir = $rootScope.config.savepaths[opt.engine] + '\\' +modselectedService.getListname();
                useEngine = $rootScope.config.engines[opt.engine];

            var wads = modselectedService.getPaths();

            if (opt.map !== false) {
                wads.push(opt.map);
            }

            var params = ['-iwad', $rootScope.config.iwadpath + opt.iwad, '-savedir', savedir];

            if (wads.length > 0) {
                params = params.concat(['-file'], wads);
            }

            child = execFile(useEngine, params, function(error, stdout, stderr) {
                    //TODO better...
                    if (error) {
                        console.log(error.stack);
                        console.log('Error code: ' + error.code + ' ' + error.signal);
                    }
                });

            child.on('exit', function(code) {
                console.log('EXIT: ' + code);
            });
        };

        service.startOblige = function(opt) {

            $mdDialog.show({
                templateUrl: 'app/templates/ObligeLoading.html',
                parent: angular.element(document.body),
                targetEvent: null,
                clickOutsideToClose: false
            });

            opt.map = $rootScope.config.oblige.mappath;
            var params = ['--batch', $rootScope.config.oblige.mappath, '--load', opt.config];

            child = execFile($rootScope.config.oblige.binary, params, function(error, stdout, stderr) {
                //TODO better...
                if (error) {
                    alert(error.signal);
                    return false;
                }

            });

            child.on('exit', function(code) {
                $mdDialog.cancel();
                service.startDoom(opt);
            });

        };

        return service;
    }

})();