(function() {
    app.factory('modselectedService', ['$q', modselectedService]);

    function modselectedService($q) {
        var service = {};
        service.selected = [];

        service.getSelected = function() {
            var def = $q.defer();

            def.resolve(service.selected);

            return def.promise;
        };


        return service;
    }
})();