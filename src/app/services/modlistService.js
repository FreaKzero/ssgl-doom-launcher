(function() {
    app.factory('modlistService', ['$q', '$rootScope', 'nwService', modlistService]);

     /**
     * CRUD for Modlists (sidebar)
     *
     * @method modlistService
     * @module ssgl
     * @submodule modlistService
     */
    function modlistService($q, $rootScope, nwService) {
        var service = {};
        /**
         * Directory where the Lists are
         *
         * @property listDir
         * @private
         * @type {String}
         */
        var listDir = $rootScope.config.modlistpath; 

        service.lists = [];
        /**
         * Reame a List async
         *
         * @method rename
         * @async
         * @for modlistService
         * @param  {Object} item
         * @return {Promise}
         */
        service.rename = function(item) {
            var oldPath = item.path;
            var newPath = nwService.buildPath([listDir, item.name + '.json']);

            item.path = newPath;

            return nwService.rename(oldPath, newPath);
        };

        /**
         * Removes Item async
         *
         * @method remove
         * @async
         * @for modlistService
         * @param  {Object} item
         * @return {Promise}
         */
        service.remove = function(item) {
            return nwService.remove(item.path);
        };

        /**
         * Saves selected lists into JSON File async
         *
         * @method saveSelected
         * @for modlistService
         * @param  {Object} listObj {name: '', list: ''}
         * @async
         * @return {Promise}
         */
        service.saveSelected = function(listObj) {
            var existingIndex = _.findIndex(service.lists, function(item) {
             return listObj.name === item.name
            });

            var file = nwService.buildPath([listDir, listObj.name + '.json']);

            if (existingIndex > -1) {
                service.lists[existingIndex].name = listObj.name;
                service.lists[existingIndex].path = file;
                service.lists[existingIndex].wads = listObj.list;
            } else {
                service.lists.push({
                    name: listObj.name,
                    path: file,
                    wads: listObj.list
                });
            }

            return nwService.writeJSON(
                listObj.list,
                file
            );
        };

        /**
         * Fetching Lists from Directory async
         *
         * @method getLists
         * @for modlistService
         * @async
         * @return {Promise}
         */
        service.getLists = function() {
            var def = $q.defer();
            
            nwService.getDir(listDir).then(function(items) {
                service.lists = items.map(function(item) {
                    var file = nwService.buildPath([listDir, item]);

                    return {
                        name: nwService.getName(item),
                        path: file,
                        wads: nwService.readSyncJSON(file)
                    };
                });

                def.resolve(service.lists);

            });

            return def.promise;

        };

        return service;
    }

})();