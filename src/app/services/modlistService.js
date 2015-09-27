(function() {
    app.factory('modlistService', ['$q', '$rootScope', 'nwService', modlistService]);

    function modlistService($q, $rootScope, nwService) {
        var service = {};
        var listDir = '\\lists\\';

        service.rename = function(item) {
            var oldPath = item.path;
            var newPath = nwService.getDirname(item.path) + '\\' + item.name + '.json';
            
            item.path = nwService.getDirname(item.path) + '\\' + item.name + '.json';
            return nwService.rename(oldPath, newPath);
        };

        service.remove = function(item) {
            nwService.remove(item.path);
        };

        service.saveSelected = function(name, list) {

            setTimeout(function() {
                $rootScope.$broadcast('MODIFIEDLISTS');
            }, 1500);

            return nwService.writeJSON(list, listDir + name + '.json', true);
        };

        service.getLists = function() {
            var def = $q.defer();

            nwService.getDir(listDir, true).then(function(items) {
                var lists = items.map(function(item) {
                    return {
                        name: item.replace(/^.*[\\\/]/, '').slice(0, -5),
                        path: nwService.getAbsolute(listDir + item),
                        wads: nwService.readSyncJSON(listDir + item, true)
                    };
                });

                def.resolve(lists);
            });

            return def.promise;

        };
        return service;
    }

})();