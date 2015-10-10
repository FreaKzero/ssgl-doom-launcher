(function() {
    app.controller('modlistController', ['$scope', 'modlistService', '$rootScope', '$mdDialog', '$mdToast', modlistController]);

    /**
     * Controller for the Sidebar Modlist
     * 
     * @method modlistController     
     * @module ssgl
     * @submodule modlistController
     * @param  {Service} $scope        
     * @param  {Service} modlistService
     * @param  {Service} $rootScope    
     * @param  {Service} $mdDialog     
     * @param  {Service} $mdToast
     */
    function modlistController($scope, modlistService, $rootScope, $mdDialog, $mdToast) {

        modlistService.getLists().then(function(list) {
            /**
             * @property modlist
             * @type {Array}
             * @async
             */
            $scope.modlist = list;
        });

        $parent = $scope;

        //TODO Refactor with $apply ...
        $scope.$on('MODIFIEDLISTS', function() {
            modlistService.getLists().then(function(list) {
                $scope.modlist = list;
            });
        });

        /**
         * Fires up rename Dialog
         * @method rename
         * @for modlistController
         * @param ev    
         * @param $index
         */
        $scope.rename = function(ev, $index) {
            var item = $scope.modlist[$index];

            $mdDialog.show({
                controller: renameListController,
                templateUrl: 'app/templates/AddListPrompt.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false
            });

            /**
             * renameListController
             * 
             * @method renameListController
             * @for modlistController
             * @param $scope        
             * @param $mdDialog     
             * @param modlistService
             */
            function renameListController($scope, $mdDialog, modlistService) {
                /**
                 * @property listname
                 * @type {String}
                 */
                $scope.listname = item.name;
                /**
                 * @property double
                 * @type {Array}
                 */
                $scope.double = [];

                /**
                 * Title of Dialog
                 * 
                 * @property title
                 * @type {String}
                 */
                $scope.title = 'Rename List';

                /**
                 * Checks for existing list names
                 * 
                 * @method checkdoubles
                 * @for renameListController                 
                 */
                $scope.checkdoubles = function() {
                    $scope.double = $parent.modlist.filter(function(list) {
                        return $scope.listname === list.name;
                    });
                };

                /**
                 * Renames the List
                 * @method submitForm
                 * @for renameListController
                 * @param valid                 
                 */
                $scope.submitForm = function(valid) {
                    if (valid && $scope.double.length === 0) {
                        item.name = $scope.listname;

                        modlistService.rename(item).then(function(renamed) {
                            $mdToast.show(
                                $mdToast.simple()
                                .content('List renamed to ' + renamed).position('bottom').hideDelay(1500)
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

                /**
                 * Closes Dialog
                 * 
                 * @method cancel
                 * @for renameListController
                 */
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
            }
        };

        /**
         * Fire up Delete confirm Dialog
         * 
         * @method delete
         * @for modlistController
         * @param ev    
         * @param $index
         */
        $scope.delete = function(ev, $index) {
            var confirm = $mdDialog.confirm()
                .title('Really Delete ?')
                .content('List ' + $scope.modlist[$index].name + ' will be deleted, are you sure ?')
                .ok('Delete')
                .cancel('Cancel')
                .targetEvent(ev);

            $mdDialog.show(confirm).then(function() {
                
                modlistService.remove($scope.modlist[$index]).then(function(listname) {
                    $mdToast.show(
                        $mdToast.simple()
                        .content('List ' + listname + ' removed').position('bottom').hideDelay(1500)
                    );
                }, function(error) {
                    $mdToast.show(
                        $mdToast.simple()
                        .content(error.message).position('bottom').hideDelay(1500)
                    );
                });

                $scope.modlist.splice($index, 1);
            }, function() {
                $mdDialog.cancel();
            });

        };

        /**
         * select a List 
         * 
         * @method selectList
         * @for modlistController
         * @param  $index
         */
        $scope.selectList = function($index) {
            $rootScope.$broadcast('USELIST', $scope.modlist[$index].wads, $scope.modlist[$index].name);
        };
    }
})();