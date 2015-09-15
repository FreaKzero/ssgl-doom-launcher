fs = require('fs'),

app.factory('iwadService', [
    function iwadService() {

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
                try {
                    var files = fs.readdirSync(path);
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

                    return iwads;

                } catch (e) {
                    console.log(e);
                    return [];
                }
            }

        };
    }
]);