(function() {
    app.factory('modselectedService', ['$q', modselectedService]);
    /**
     * Service for selected Wads/Mods
     *
     * @method modselectedService
     * @module ssgl
     * @submodule modselectedService
     */

    /**
     * Selected Mods/Wads
     *
     * @property selected
     * @type {Array}
     * @private
     */
    list = {};
    list.name = 'Untitled';
    list.list = [];
    
    function modselectedService($q) {
        var service = {};

        /**
         * Syncs Method
         * 
         * @method sync
         * @for modselectedService
         * @param  {Object} listObj {name: '', list: []}
         */
        //#WHY try to remove
        service.sync = function(listObj) {
            list = listObj;
        };

        /**
         * Returns Array with only Paths
         * 
         * @method getPaths
         * @for modselectedService
         * @return {Array} Paths
         */
        service.getPaths = function() {
            return selected.map(function(item) {
                return item.path;
            });
        };

        /**
         * Returns all selected Wads/Mods
         * @method get
         * @for modselectedService
         * @return {Array}
         */
        service.get = function() {
            return selected;
        };

        /**
         * Returns Listname
         * @method getListname
         * @for modselectedService
         * @return {String} listname
         */
        service.getListname = function() {
            return listname;
        };

        return service;
    }
})();