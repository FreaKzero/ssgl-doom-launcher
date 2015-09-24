(function() {

    app.factory('iwadService', ['$q', 'nwService', iwadService]);

    function iwadService($q, nwService) {

        var covers = ['doom', 'doom2', 'freedm', 'freedoom1', 'freedoom2', 'hacx', 'heretic', 'heretic1', 'hexdd', 'hexen', 'plutonia', 'strife0', 'strife1', 'tnt'];
        var nocover = 'app/assets/ssgl.png';        
        return {
            IWADS: [],

            getIWADS: function(path) {
                if (this.IWADS.length === 0) {
                    this.IWADS = this.read(path);
                }

                return this.IWADS;
            },

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