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
         var self = this;
         var $parent = $scope;
         /**
          * Name of used List
          * @property usedList
          * @type {String}
          */
         $scope.usedList = 'Untitled';
         /**
          * selected mods
          * @property selected
          * @type {Array}
          */
         $scope.selected = [];

         modService.getMods($scope.config.wadpath).then(function(mods) {
             /**
              * @property mods
              * @type {Array}
              * @async
              */
             $scope.mods = mods;

             if ($scope.config.initList !== 'false') {
                 try {
                     var startListJSON = JSON.parse($scope.config.initList);
                     var startList = nwService.readSyncJSON(startListJSON.path);

                     if (!_.isEmpty(startList)) {
                         $scope.$broadcast('USELIST', startList, startListJSON.name);
                     }

                 } catch (e) {
                     nwService.log.error("error parsing initList: " + $scope.config.initList);
                 }
             }

         });

         //TODO: docs...
         //TODO: make 1 Object
         $scope.$watch('usedList', function(nv, ov) {
             modselectedService.sync(nv, $scope.usedList);
         });

         $scope.$watchCollection('selected', function(nv, ov) {
             modselectedService.sync(nv, $scope.usedList);
         });

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

             $scope.selected = [];
             $scope.usedList = 'Untitled';
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

                 if ($parent.usedList !== 'Untitled') {
                     $scope.listname = $parent.usedList;
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
                     modlistService.saveSelected($scope.listname, $parent.selected).then(function(listname) {
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

                     $parent.usedList = $scope.listname;
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
             if ($index > 0) {
                 _.move($scope.selected, $index, $index - 1);
             }
         };

         /**
          * Moves selected Mod down in List (Loadorder)
          *
          * @method moveDown
          * @for modController
          * @param $index Clicked item
          */
         $scope.moveDown = function($index) {
             if ($scope.selected.length - 1 !== $index) {
                 _.move($scope.selected, $index, $index + 1);
             }
         };

         //TODO: Refactor Name
         /**
          * Selects the Mod
          *
          * @method checked
          * @for modController
          * @param {Object} mod
          */
         $scope.checked = function(mod) {
             if (mod.checked === false) {
                 mod.checked = true;
                 $scope.selected.push(mod);

             } else {
                 mod.checked = false;
                 $scope.selected = _($scope.selected).filter(function(item) {
                     return item.path !== mod.path;
                 });
             }
         };
     }
 })();