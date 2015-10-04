(function() {
    app.factory('modselectedService', ['$q', modselectedService]);
        selected = [];
        listname = 'Untitled';

    function modselectedService($q) {    
        var service = {};        

        service.sync = function(data, name) {
            selected = data;
            listname = name;
        };

        service.getPaths = function() {
            return selected.map(function(item) {
                return item.path;
            });
        };

        service.get = function() {
            return selected;
        };

        service.getListname = function() {
            return listname;
        };
        
        return service;
    }
})();