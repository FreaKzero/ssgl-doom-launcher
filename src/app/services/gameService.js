(function() {

    var execFile = require('child_process').execFile;
    app.factory('gameService', ['$q', '$rootScope', '$mdDialog', 'modselectedService', 'nwService', gameService]);

    /**
     * Service for Starting Engines/Oblige
     * 
     * @method gameService
     * @module ssgl
     * @submodule gameService
     */
    function gameService($q, $rootScope, $mdDialog, modselectedService, nwService) {

        /**
         * Builds Params for Engines
         *
         * @method _paramBuilder
         * @for gameService
         * @param  {Object}  iwad,config,engine,map
         * @return {String} Parameters for Engines
         * @private
         */
        function _paramBuilder(opt) {
            var os = nwService.getPlatform();
            var wads = modselectedService.getPaths();

            if (opt.map !== false) {
                wads.push(opt.map);
            }

            var params = ['-iwad', $rootScope.config.iwadpath + opt.iwad];

            if (wads.length > 0) {
                params = params.concat(['-file'], wads);
            }

            if ($rootScope.config.savepaths.active === true) {
                params = params.concat(['-savedir'], $rootScope.config.savepaths[opt.engine] + modselectedService.getListname());   
            }

            return params;
        }

        var service = {};

        /**
         * Starts given Engine as childprocess
         * 
         * @method startDoom
         * @for gameService
         * @param  {Object}  iwad,config,engine,map
         */
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

        /**
         * Starts Oblige Mapbuilder as childprocess in the background
         * When Oblige is finished - startDoom with the map parameter
         * 
         * @method startOblige
         * @for gameService
         * @param  {Object} iwad, config, engine
         */
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