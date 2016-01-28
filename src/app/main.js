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

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('/', {
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

        /**
         * @property {String} APPVERSION Versionnumber
         * @type {String}
         */
        $rootScope.APPVERSION = nwService.readSyncJSON('package.json').version;
        document.title = 'Super Shotgun Launcher v' + $rootScope.APPVERSION;
        nwService.mkDir(nwService.buildPath(['lists'], true), true);

        if (nwService.hasArg('-r') || nwService.hasArg('--livereload')) {
            try {
                var Gaze = require('gaze').Gaze;
                var gaze = new Gaze('../src/**/*');

                gaze.on('all', function(event, filepath) {
                    if (filepath && filepath.split('.').pop() === 'css') {
                        var styles = document.querySelectorAll('link[rel=stylesheet]');
                        for (var i = 0; i < styles.length; i++) {
                            var restyled = styles[i].getAttribute('href') + '?v=' + Math.random(0, 10000);
                            styles[i].setAttribute('href', restyled);
                        };
                    } else {
                        window.location.reload();
                    }
                });
            } catch (e) {
                console.log('Livereload cant be used on an built App');
            }
        }

        if (nwService.hasArg('-d') || nwService.hasArg('--devtools')) {
            $rootScope.DEVELOPER = true;

            // Bind F11 for configfile and F12 for opening DevTools
            $(document).on('keydown', function(e) {
                var tag = e.target.tagName.toLowerCase();

                if (tag !== 'input' && tag !== 'textarea') {
                    switch (e.which) {

                        case 122:
                            nwService.getShell().openItem(nwService.buildPath(['config.json'], true));
                            break;

                        case 123:
                            nwService.openDevTools();
                            break;

                        case 116:
                            location.reload();
                            break;
                    }
                }
            });

        } else {
            $rootScope.DEVELOPER = false;
        }

        $rootScope.config = nwService.readSyncJSON(nwService.buildPath(['config.json']), true);

        if (_.isEmpty($rootScope.config)) {
            $rootScope.config = {
                engines: {
                    zdoom: '',
                    gzdoom: '',
                    zandronum: '',
                    skulltag: '',
                    doom64ex: ''
                },

                savepaths: {
                    zdoom: '',
                    gzdoom: '',
                    zandronum: '',
                    skulltag: '',
                    doom64ex: ''
                },

                oblige: {
                    binary: '',
                    configs: '',
                    mappath: ''
                },

                active: {
                    gzdoom: false,
                    zandronum: false,
                    oblige: false,
                    zdoom: false,
                    skulltag: false,
                    doom64ex: false
                },

                online: {
                    client: ''
                },

                misc: {
                    doom64exsound: ''
                },

                iwadpath: '',
                wadpath: '',

                initList: false,
                freshinstall: true
            };
        }
    });
})();