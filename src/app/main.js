var app = angular.module('ssgl', ['ngMaterial']);

(function() {
    app.config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue-grey', {
                'default': '400',
                'hue-1': '100',
                'hue-2': '600',
                'hue-3': 'A100'
            })
            .accentPalette('deep-orange').dark();
    });

    app.run(function($rootScope, nwService) {      
        $rootScope.APPVERSION = nwService.readSyncJSON('package.json').version;
        nwService.mkDir('\\lists', true);

        try {
            $rootScope.config = nwService.readSyncJSON('\\config.json', true);
        } catch (e) {

            $rootScope.config = {
                engines: {
                    gzdoom: "",
                    zandronum: "",
                },

                savepaths: {
                    gzdoom: "",
                    zandronum: ""
                },

                oblige: {
                    binary: "",
                    configs: "",
                    mappath: ""

                },

                active: {
                    gzdoom: false,
                    zandronum: false,
                    oblige: false
                },

                iwadpath: "",
                wadpath: "",

                initList: false,
                freshinstall: true
            };
        }
    });
})();