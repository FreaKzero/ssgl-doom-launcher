(function() {
    app.factory('modService', ['$q', 'nwService', modService]);

    function modService($q, nwService) {
        var service = {};

        service.mods = [];
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
                    var struc = files[i].split('\\'),
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