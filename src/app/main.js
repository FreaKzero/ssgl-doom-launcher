var app = angular.module('ssgl', ['ngMaterial', 'ui.router']);

(function() {

    app.config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('home');

        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'app/templates/MainMods.html'
        });
    });

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
                    zdoom: "",
                    gzdoom: "",
                    zandronum: "",
                },

                savepaths: {
                    zdoom: "",
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
                    oblige: false,
                    zdoom: false
                },

                iwadpath: "",
                wadpath: "",

                initList: false,
                freshinstall: true
            };
        }
    });
})();