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
        var allowed = ['PK3', 'WAD', 'DEH', 'BEX'];

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
        var z = service.mods.filter(function(wat,index) {
          if (wat.path === file) {
            wat.index = index;
            return true;
          }
        });

        if (z.length > 0) {
          service.mods.splice(z[0].index, 1);
        }

        $rootScope.$broadcast('modService.watcher');
      }
    });
      
    return service;
  }
})();
