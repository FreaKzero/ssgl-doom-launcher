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
    selected = [];

    /**
     * Name of List
     * @type {String}
     * @private
     * @property listname
     * @default  Untitled
     */
    listname = 'Untitled';

    function modselectedService($q) {
        var service = {};

        /**
         * Syncs Method
         * 
         * @method sync
         * @for modselectedService
         * @param  {Array} data
         * @param  {String} name
         */
        service.sync = function(data, name) {
            selected = data;
            listname = name;
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