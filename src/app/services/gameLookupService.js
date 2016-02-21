(function() {
    var md5File = require('md5-file');
    var http = require('http');

    app.factory('gameLookupService', ['$q', 'nwService', '$rootScope', gameLookupService]);

    function gameLookupService($q, nwService, $rootScope) {
        var service = {};

        //#TODO doc
        service.lookupLocal = function(path) {
            var file = path.replace(/^.*[\\\/]/, ''),
                name = file.split('.')[0],
                screens = [],
                def = $q.defer();

            nwService.getDir($rootScope.config.screenshotpath).then(function(dirs) {
                if (dirs.indexOf(name) > -1) {
                    nwService.getDir($rootScope.config.screenshotpath + name).then(function(filenames) {

                        screens = filenames.map(function(item) {
                            return {
                                pic: $rootScope.config.screenshotpath + name + '\\' + item,
                                name: item.split('.')[0]
                            };
                        });

                        def.resolve(screens);
                    });

                } else {
                    def.resolve([]);
                }
            });

            return def.promise;
        };

        //#TODO doc
        service.lookupWadArchive = function(path) {
            var md5 = md5File(path);
            var def = $q.defer();
            var screens = [];

            http.get({
                host: 'www.wad-archive.com',
                path: '/api/latest/' + md5,
            }, function(response) {
                var body = '';

                response.on('data', function(d) {
                    body += d;
                });

                response.on('end', function() {
                    var data = JSON.parse(body);
                    for (var index in data.screenshots) {
                        screens.push({
                            pic: data.screenshots[index],
                            name: index
                        });
                    }

                    def.resolve(screens);
                });
            });

            return def.promise;
        };

        return service;
    };

})();