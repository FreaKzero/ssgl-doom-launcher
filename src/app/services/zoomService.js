(function() {
    app.factory('zoomService', ['nwService', 'hotkeys', zoomService]);

    function zoomService(nwService, hotkeys) {
        var service = {};
        var Window = nwService.getWindow();

        var C = {
            MAXZOOM : 5,
            MINZOOM: 0,
            STEP: 0.5
        };

        hotkeys.add({
            combo: 'n',
            description: 'This one goes to 11',
            callback: function() {
                service.zoomIn();
            }
        });

        hotkeys.add({
            combo: 'm',
            description: 'This one goes to 11',
            callback: function() {
                service.zoomOut();
            }
        });


        service.zoomIn = function() {
            console.log('zin');
            if (Window.zoomLevel <= C.MAXZOOM) {
                Window.zoomLevel += C.STEP;
            }
        };

        service.zoomOut = function() {
            console.log('zout');
            if (Window.zoomLevel <= C.MINZOOM) {
                Window.zoomLevel -= C.STEP;
            }
        };

        service.reset = function() {
            Window.zoomLevel = 0;
        }

        service.getLevel = function() {
            return Window.zoomLevel;
        }
        return service;
    }
})();