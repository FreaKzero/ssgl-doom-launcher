(function() {
    app.factory('modService', ['$q', '$rootScope', 'nwService', modService]);

    /**
     * Service to Fetch Mod WADS from FileSystem
     *
     * @method modService
     * @module ssgl
     * @submodule modService
     * @uses nwService
     */

    function modService($q, $rootScope, nwService) {
        var service = {};
        /**
         * The Wads/Mods
         *
         * @property mods
         * @type {Array}
         */
        service.mods = [];

        nwService.startWatcher($rootScope.config.wadpath, function(file, event) {
            if (event === 'add') {
                var wad,
                    index = [],
                    allowed = ['PK3', 'WAD'];
                                
                    var struc = nwService.splitPath(file),
                        dirname = struc[struc.length - 2],
                        ext = struc[struc.length - 1].slice(-3).toUpperCase(),
                        name = struc[struc.length - 1].slice(0, -4);

                    if (allowed.indexOf(ext) > -1) {
                        service.mods.push({
                            name: name,
                            dir: dirname,
                            checked: false,
                            path: file,
                            type: ext
                        });
                    }

                $rootScope.$broadcast('modService.watcher');
            }

            if (event === 'unlink') {
                var z = _.findIndex(service.mods, function(item) { return item.path == file });
                if (z > -1) {
                    service.mods.splice(index,1);
                }

                $rootScope.$broadcast('modService.watcher');
            }
        });
        /**
         * Fetch PK3 and WADs from Directory async
         *
         * @async
         * @method getMods
         * @for modService
         * @param  {String} wadpath
         * @return {Promise}
         */
        service.getMods2 = function(wadpath) {
            var defer = $q.defer();

            nwService.recursiveDir(wadpath, function(files) {
                if (typeof files === 'undefined') {
                    return [];
                }

                var wad,
                    len = files.length,
                    index = [],
                    allowed = ['PK3', 'WAD'];

                for (var i = 0; i < len; i++) {
                    var struc = nwService.splitPath(files[i]),
                        dirname = struc[struc.length - 2],
                        ext = struc[struc.length - 1].slice(-3).toUpperCase(),
                        name = struc[struc.length - 1].slice(0, -4);

                    if (allowed.indexOf(ext) < 0) {
                        continue;
                    }

                    service.mods.push({
                        name: name,
                        dir: dirname,
                        checked: false,
                        path: files[i],
                        type: ext
                    });
                }

                defer.resolve(service.mods);
            });

            return defer.promise;
        };

        return service;
    }
})();