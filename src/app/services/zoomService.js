(function() {
    app.factory('zoomService', ['nwService', zoomService]);

    function zoomService(nwService) {
        var service = {};
        var Window = nwService.getWindow();

        var C = {
            MAXZOOM : 5,
            MINZOOM: 0,
            STEP: 0.5
        };

        service.zoomIn = function() {
            if (Window.zoomLevel <= C.MAXZOOM {
                Window.zoomLevel += C.STEP;
            }
        };

        service.zoomOut = function() {
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