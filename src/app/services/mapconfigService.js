fs = require('fs'),

app.factory('mapconfigService', [
    function mapconfigService() {
        
        return {
            MAPCONFIGS: [],

            getMapConfigs: function(path) {
                if (this.MAPCONFIGS.length === 0) {
                    this.MAPCONFIGS = this.read(path);
                }
                
                return this.MAPCONFIGS;
            },

            read: function(path) {
                try {
                    var files = fs.readdirSync(path);
                    this.MAPCONFIGS = files.map(function(cfg) {
                    
                    return {
                        name: cfg,
                        path: path + cfg
                    };                    
                });

                return this.MAPCONFIGS;

                } catch (e) {
                    return [];
                }
            }

        };
    }
]);