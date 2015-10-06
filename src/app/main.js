/**
 * SSGL Launcher
 *
 * @class ssgl
 * @requires ngMaterial, ui.router
 * @type {[type]}
 */
var app = angular.module('ssgl', ['ngMaterial', 'ui.router']);

(function() {    
    /**
     * Config Block for Router
     *
     * / => MainMods.html
     * @method app.config
     * @for  ssgl
     * @uses $stateProvider
     * @uses $urlRouterProvider
     */
    app.config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('home');

        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'app/templates/MainMods.html'
        });
    });

    /**
     * Config Block for Themeing
     *
     * @method app.config
     * @for  ssgl
     * @uses $mdThemingProvider     
     */
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

    /**
     * Run Block
     * Gets Version from package.json (sync)
     * Gets Config from config.json (sync)
     *
     * @method app.run
     * @for  ssgl
     * @uses  $rootScope
     * @requires nwService     
     */
    app.run(function($rootScope, nwService) {
        $rootScope.APPVERSION = nwService.readSyncJSON('package.json').version;
        document.title = 'Super Shotgun Launcher v'+$rootScope.APPVERSION;
        nwService.mkDir('\\lists', true);

        try {
            $rootScope.config = nwService.readSyncJSON('\\config.json', true);
        } catch (e) {

            $rootScope.config = {
                engines: {
                    zdoom: "",
                    gzdoom: "",
                    zandronum: "",
                    skulltag: ""
                },

                savepaths: {
                    zdoom: "",
                    gzdoom: "",
                    zandronum: "",
                    skulltag: ""
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
                    zdoom: false,
                    skulltag: false
                },

                online: {
                    client: ""                  
                },

                iwadpath: "",
                wadpath: "",

                initList: false,
                freshinstall: true
            };
        }
    });
})();