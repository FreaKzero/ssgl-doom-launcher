(function() {
    app.controller('modController', ['$scope', 'modService', 'modlistService', '$mdDialog', 'nwService', 'modselectedService', '$mdToast', modController]);

    /*
    ========================================================
    *                    Refactor Notes                    *
    ========================================================
    - Refactor Property names:
      $scope.usedList
      $scope.selected

    - To Object:
      $scope.selected.list and $scope.selected.name [NOPE]
      $scope.selected.list and $scope.selected.name

    - Necessary changes:
      Templates
      modselectedService
      modlistService

    Remove Collectionwatcher and hang sync methods on moveup movedown and checked
    Rename checked

     */

    /**
     * Controller for the Mod splitview
     *
     * @method modController
     * @module ssgl
     * @submodule modController
     */
    function modController($scope, modService, modlistService, $mdDialog, nwService, modselectedService, $mdToast) {
        var $parent = $scope;

        //#TODO: Throw into modselectedService
        $scope.selected = {};
        $scope.selected.list = [];
        $scope.selected.name = 'Untitled';

        modService.getMods($scope.config.wadpath).then(function(mods) {
            /**
             * @property mods
             * @type {Array}
             * @async
             */
            $scope.mods = mods;

            // #TODO Refactor in selectedlist
            if ($scope.config.initList !== false) {
                var startListJSON = JSON.parse($scope.config.initList);
                var startList = nwService.readSyncJSON(startListJSON.path);

                if (!_.isEmpty(startList)) {
                    $scope.$broadcast('USELIST', startList, startListJSON.name);
                } else {
                    // cant parse... lets reset that
                    $scope.config.initList = false;
                    nwService.writeJSON($scope.config, 'config.json', true);

                    $mdToast.show(
                        $mdToast.simple()
                        .content('initList ' + startListJSON.name + ' not found, resetted in config')
                        .position('bottom').hideDelay(2500)
                    );
                }
            }
        });

        //#WAT why use Event ?
        $scope.$on('USELIST', function(ev, wads, name) {
            $scope.selected = wads;
            $scope.usedList = name;

            $scope.mods.filter(function(item) {
                item.checked = false;
            });

            _.each(wads, function(item) {
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

            $scope.selected.list = [];
            $scope.selected.name = 'Untitled';
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

                //#WAT: investigate...
                if ($parent.usedList !== 'Untitled') {
                    $scope.selectedname = $parent.selected.name;
                }

                /**
                 * @property double
                 * @type {Array}
                 */
                $scope.double = [];

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
                $scope.checkdoubles = function() {};

                /**
                 * Saves the List
                 * @method submitForm
                 * @for saveSelectedController
                 * @uses modlistService
                 */
                $scope.submitForm = function() {
                    modlistService.saveSelected($scope.selected).then(function(listname) {
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

                    //#WAT use listname from callback ?
                    $parent.selected.name = $scope.selectedname;
                    $mdDialog.cancel();
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