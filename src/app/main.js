            var fs = require('fs');
            var path = require('path');
            var EXECPATH = path.dirname(process.execPath);
                    
            fs.exists(EXECPATH+'\\lists', function(exists) {
                if (!exists) {
                    fs.mkdirSync(EXECPATH+'\\lists');
                }
            });

            var app = angular.module('gzdoom-launcher', ['ngMaterial']);
            
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

            app.run(function ($rootScope) {
                $rootScope.APPVERSION = '0.0.1';
            try {
                $rootScope.config = JSON.parse(fs.readFileSync(EXECPATH+'\\config.json', "utf8"));
            } catch (e) {                
                $rootScope.config = {                    
                    gzDoom: "",
                    zandronum: "",
                    iwadpath: "",
                    wadpath: "",
                    oblige: "",
                    mapconfig: "",
                    mappath: "",
                    savegamepath: "",
                    initList: false,
                    gzdoomactive: false,
                    zandronumactive: false,
                    obligeactive: false,
                    freshinstall: true
                };
            }
    });