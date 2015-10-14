(function() {
    app.factory('modService', ['$q', 'nwService', modService]);

    /**
     * Service to Fetch Mod WADS from FileSystem
     * 
     * @method modService
     * @module ssgl
     * @submodule modService
     * @uses nwService
     */

    function modService($q, nwService) {
        var service = {};
        /**
         * The Wads/Mods
         * 
         * @property mods
         * @type {Array}
         */
        service.mods = [];

        /**
         * Fetch PK3 and WADs from Directory async
         *
         * @async
         * @method getMods
         * @for modService
         * @param  {String} wadpath
         * @return {Promise}
         */
        service.getMods = function(wadpath) {
            var defer = $q.defer();
            
            nwService.recursiveDir(wadpath, function(files) {
                if (typeof files === 'undefined') {
                    return [];
                }

                var wad;
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
                        path: files[i]
                    });
                }

                defer.resolve(service.mods);
            });

            return defer.promise;
        };
        
        return service;
    }
})();