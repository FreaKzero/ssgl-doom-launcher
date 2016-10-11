(function() {
  app.controller('modController', ['$scope', '$window', 'modService', 'modlistService', '$mdDialog', 'nwService', 'modselectedService', '$mdToast', 'gameLookupService', modController]);

    /**
     * Controller for the Mod splitview
     *
     * @method modController
     * @module ssgl
     * @submodule modController
     */
  function modController($scope, $window, modService, modlistService, $mdDialog, nwService, modselectedService, $mdToast, gameLookupService) {
    var $parent = $scope;

    $scope.selected = modselectedService.reset();
    $scope.screenshots = null;
    $scope.screenshotsTitle = '';
    $scope.lookupLoad = false; 

    angular.element($window).on('keydown', function(e) {
      if (e.which === 70 && e.ctrlKey === true) {                
        document.getElementById('filterinput').focus();
        e.stopImmediatePropagation();
        e.preventDefault();
        e.stopPropagation();   
        return false;
      }
    }); 


        //#TODO: doc
    $scope.$on('modService.watcher', function() {
      $scope.mods = modService.mods;
      $scope.$apply();
    });
        
        
        //#TODO: doc
    $scope.$on('modselectedService.useList', function() {
      $scope.selected = modselectedService.get();

      $scope.mods.filter(function(item) {
        item.checked = false;
      });

      _.each($scope.selected.list, function(item) {
        var index = _.findIndex($scope.mods, {
          path: item.path
        });

        $scope.mods[index].checked = true;
      });
    });

        /**
         * Start a new List (Reset)
         *
         * @method newSelected
         * @for modController
         */
    $scope.newSelected = function() {
      $scope.mods.filter(function(item) {
        item.checked = false;
      });

      $scope.selected = modselectedService.reset();
    };

    $scope.openScreenshots = function(name) {
      var path = $scope.config.screenshotpath + name;
      nwService.mkDir(path);
            
      setTimeout(function() {
        nwService.getShell().openItem(path);
      },800);
    };

    $scope.lookupScreenshots = function($event, mod) {
      $scope.lookupLoad = true;
      $scope.screenshots = [];
      $scope.screenshotsTitle = mod.name;

      setTimeout(function() {
        gameLookupService.lookupWadArchive(mod.path).then(function(data) {
          if (data.length > 0) {
            $scope.screenshots = data;    
          } else {
            gameLookupService.lookupLocal(mod).then(function(data) {
              $scope.screenshots = data;
            });
          }
          $scope.lookupLoad = false;                    
        });
      },400);
            
      $event.preventDefault();
      event.stopImmediatePropagation(); 

    };
        /**
         * Opens a Prompt for modlist saving
         *
         * @method saveSelected
         * @for modController
         * @param  {Event} ev
         */
    $scope.saveSelected = function(ev) {
      $mdDialog.show({
        controller: saveSelectedController,
        templateUrl: 'app/templates/AddListPrompt.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false
      });

            /**
             * saveSelectedController
             *
             * @method saveSelectedController
             * @for saveSelected
             * @param  $scope
             * @param  $mdDialog
             * @param  modlistService
             */
      function saveSelectedController($scope, $mdDialog, modlistService) {
                /**
                 * Title for Dialog
                 *
                 * @property title
                 * @type {String}
                 */
        $scope.title = 'Save List';

        if ($parent.selected.name !== 'Untitled') {
          $scope.listname = $parent.selected.name;
        }

                /**
                 * @property double
                 * @type {Array}
                 */
        $scope.overwrite = [];

                /**
                 * Closes Dialog
                 *
                 * @method cancel
                 * @for saveSelectedController
                 */
        $scope.cancel = function() {
          $mdDialog.cancel();
        };

                /**
                 * check for doubles - here empty because we donnt need it
                 *
                 * @method checkdoubles
                 * @for saveSelectedController
                 */
        $scope.checkdoubles = function() {
          $scope.overwrite = modlistService.lists.filter(function(list) {
            return $scope.listname === list.name;
          });
        };

                /**
                 * Saves the List
                 * @method submitForm
                 * @for saveSelectedController
                 * @uses modlistService
                 */
            
        $scope.submitForm = function(valid) {
          if (valid) {
            $parent.selected.name = $scope.listname;
            modlistService.saveSelected($parent.selected).then(function(listname) {
              $mdToast.show(
                                $mdToast.simple()
                                .content('Saved List to ' + listname).position('bottom').hideDelay(1500)
                            );
            }, function(error) {
              $mdToast.show(
                                $mdToast.simple()
                                .content(error.message).position('bottom').hideDelay(1500)
                            );
            });

            $mdDialog.cancel();
          }
        };
      }
    };

        /**
         * Moves selected Mod up in List (Loadorder)
         *
         * @method moveUp
         * @for modController
         * @param $index Clicked item
         */
    $scope.moveUp = function($index) {
      modselectedService.moveUp($index);
    };

        /**
         * Moves selected Mod down in List (Loadorder)
         *
         * @method moveDown
         * @for modController
         * @param $index Clicked item
         */
    $scope.moveDown = function($index) {
      modselectedService.moveDown($index);
    };

        /**
         * Adds Wad into loadlist
         *
         * @method checked
         * @for modController
         * @param {Object} mod
         */
    $scope.selectWad = function(mod) {
      $scope.selected.list = modselectedService.select(mod);
    };
  }
})();
