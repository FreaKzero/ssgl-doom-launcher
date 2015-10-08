(function() {

    var execFile = require('child_process').execFile;
    app.factory('gameService', ['$q','$rootScope', '$mdDialog', 'modselectedService', 'nwService', gameService]);

    function _paramBuilder(opt) {
        var os = nwService.getPlatform();

        var savedir = nwService.buildPath([
                    $rootScope.config.savepaths[opt.engine], 
                    modselectedService.getListname()
            ]);

            var wads = modselectedService.getPaths();

            if (opt.map !== false) {
                wads.push(opt.map);
            }

            if (wads.length > 0) {
                params = params.concat(['-file'], wads);
            }

        if (os === 'win32') {
                    
            var params = ['-iwad', $rootScope.config.iwadpath + opt.iwad, '-savedir', savedir];

            return params;

        } else {            
            /*
            doomsday -game jdoom -file /home/freakzero/iwads/DOOM2.wad /home/freakzero/wads/demonsteele/DemonSteele-v0.8.pk3
             */
            var params = ['-game jdoom','-file', $rootScope.config.iwadpath + opt.iwad];   
            
            if (wads.length > 0) {
                params = params.concat(wads);
            }

            return params;
        }
    };

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
                useEngine = $rootScope.config.engines[opt.engine];
            
            var params = _paramBuilder(opt);
                        
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