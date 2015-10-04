(function() {
    app.factory('modselectedService', ['$q', modselectedService]);
        selected = [];

    function modselectedService($q) {    
        var service = {};        

        service.sync = function(data) {
            selected = data;
        };

        service.getPaths = function() {
            return selected.map(function(item) {
                return item.path;
            });
        };

        service.get = function() {
            return selected;
        }
        
        return service;
    }
})();