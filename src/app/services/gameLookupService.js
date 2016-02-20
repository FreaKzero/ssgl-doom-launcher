(function() {
    var md5File = require('md5-file');
    var http = require('http');

    app.factory('gameLookupService', ['$q', gameLookupService]);

    function gameLookupService($q) {
        var service = {};

        service.lookup = function(path, callback) {
            var md5 = md5File(path);
            var def = $q.defer();

            http.get({
                host: 'www.wad-archive.com',
                path: '/api/latest/' + md5,
            }, function(response) {
                // Continuously update stream with data
                var body = '';
                
                response.on('data', function(d) {
                    body += d;
                });

                response.on('end', function() {                                      
                    def.resolve(JSON.parse(body)); 
                });
            });

            return def.promise;
        };

        return service;
    };

})();