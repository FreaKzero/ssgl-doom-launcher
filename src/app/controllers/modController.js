(function() {
    app.controller('modController', ['$scope', 'modService', 'modlistService', '$mdDialog', 'nwService', 'modselectedService', '$mdToast', modController]);

    /**
     * Controller for the Mod splitview
     *
     * @method modController
     * @module ssgl
     * @submodule modController
     */
    function modController($scope, modService, modlistService, $mdDialog, nwService, modselectedService, $mdToast) {
        var $parent = $scope;

        $scope.selected = modselectedService.reset();

        modService.getMods($scope.config.wadpath).then(function(mods) {
            /**
             * @property mods
             * @type {Array}
             * @async
             */
            $scope.mods = mods;
            
            if ($scope.config.initList !== false) {

                try {
                    var startListJSON = JSON.parse($scope.config.initList);
                    if (!_.isEmpty(startListJSON)) {
                        modselectedService.selectList(startListJSON);
                    }
                } catch(e) {
                    $scope.config.initList = false;
                    nwService.writeJSON($scope.config, 'config.json', true);
                }                
            }
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