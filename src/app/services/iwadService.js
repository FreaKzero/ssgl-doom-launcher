(function() {

  app.factory('iwadService', ['$q', 'nwService', iwadService]);

     /**
     * Service to Fetch iWads from the Filesystem
     * 
     * @method iwadService
     * @module ssgl
     * @submodule iwadService
     * @uses nwService
     */
  function iwadService($q, nwService) {

        /**
         * Filenames needed for Covers
         * 
         * @propery covers
         * @private
         * @type {Array}
         */
    var covers = ['chex', 'chex2', 'doom', 'doom2', 'doom64', 'freedm', 'freedoom1', 'freedoom2', 'hacx', 'heretic', 'heretic1', 'hexdd', 'hexen', 'plutonia', 'strife0', 'strife1', 'tnt'];
        /**
         * When no cover is found use this Image
         * 
         * @property nocover
         * @private
         * @type {String}
         */
    var nocover = 'app/assets/ssgl.png';     

    return {
            /**
             * The iWads
             * 
             * @property IWADS             
             * @type {Array}
             */
      IWADS: [],

            /**
             * Wrapper for getting Iwads from Filesystem
             * 
             * @method getIWADS
             * @for iwadService
             * @param  {String} path
             * @return {Array}  iwads
             */
      getIWADS: function(path) {
        if (this.IWADS.length === 0) {
          this.IWADS = this.read(path);
        }

        return this.IWADS;
      },

            /**
             * Reads iwads from the Filesystem and mutate Data, async
             * 
             * @method read
             * @for iwadService
             * @param  {String} path
             * @return {Promise}
             */
      read: function(path) {
        var def = $q.defer();
                
        nwService.getDir(path).then(function(files) {
          var cover = nocover;

          var iwads = files.map(function(item) {
            var n = item.split('.')[0].toLowerCase();

            if (covers.indexOf(n) > -1) {
              cover = 'app/assets/covers/' + n + '.jpg';
            }

            return {
              file: item,
              name: n.toUpperCase(),
              cover: cover
            };
          });

          def.resolve(iwads);
                    
        });

        return def.promise;
      }

    };
  }
})();
