(function() {
    app.factory('modlistService', ['$q', '$rootScope', 'nwService', modlistService]);

    function modlistService($q, $rootScope, nwService) {
        var service = {};
        var listDir = nwService.buildPath(['lists']);

        service.rename = function(item) {
            var oldPath = item.path;
            var newPath = nwService.buildPath([listDir, item.name + '.json'], true);

            item.path = newPath;

            return nwService.rename(oldPath, newPath);
        };

        service.remove = function(item) {
            return nwService.remove(item.path);
        };

        service.saveSelected = function(name, list) {

            setTimeout(function() {
                $rootScope.$broadcast('MODIFIEDLISTS');
            }, 1500);
            
            return nwService.writeJSON(list, nwService.buildPath(['lists', name + '.json'], true));
        };

        service.getLists = function() {
            var def = $q.defer();

            nwService.getDir(listDir, true).then(function(items) {
                
                var lists = items.map(function(item) {

                    return {
                        name: nwService.getName(item),
                        path: nwService.getAbsolute(nwService.buildPath(['lists', item])),
                        wads: nwService.readSyncJSON(nwService.buildPath(['lists', item], true))
                    };
                });

                def.resolve(lists);

            });

            return def.promise;

        };

        return service;
    }

})();