/**
 * SSGL Launcher
 *
 * @class ssgl
 * @requires ngMaterial, ui.router
 * @type {[type]}
 */
var app = angular.module('ssgl', ['ngMaterial', 'ui.router', 'cfp.hotkeys']);

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
  app.run(function($rootScope, nwService, configService) {
        /**
         * @property {String} APPVERSION Versionnumber
         * @type {String}
         */
    $rootScope.APPVERSION = nwService.readSyncJSON('package.json').version;
    document.title = 'Super Shotgun Launcher v' + $rootScope.APPVERSION;
    
    nwService.openDevTools();
            
    if (process.platform === 'darwin') {
      nwService.registerMenu();
    }

    if (nwService.hasArg('-r') || nwService.hasArg('--livereload')) {
      try {

        nwService.livereload(function(file) {
          if (file && file.split('.').pop() === 'css') {
            var styles = document.querySelectorAll('link[rel=stylesheet]');
            for (var i = 0; i < styles.length; i++) {
              var restyled = styles[i].getAttribute('href') + '?v=' + Math.random(0, 10000);
              styles[i].setAttribute('href', restyled);
            }
          } else {
            window.location.reload();
          }
        });
                                    
      } catch (e) {
        console.log('Something went wrong');
      }
    }

    if (nwService.hasArg('-d') || nwService.hasArg('--devtools')) {
      $rootScope.DEVELOPER = true;
    } else {
      $rootScope.DEVELOPER = false;
    }

    $rootScope.config = configService.getConfig();
  });
})();
