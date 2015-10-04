 (function() {

     var execFile = require('child_process').execFile;
     app.controller('modController', ['$scope', 'modService', 'modlistService', '$mdDialog', 'nwService', 'modselectedService', '$mdToast', modController]);

     function modController($scope, modService, modlistService, $mdDialog, nwService, modselectedService, $mdToast) {
         var self = this;
         var $parent = $scope;

         $scope.usedList = 'Untitled';

         modselectedService.getSelected().then(function(selected) {
             $scope.selected = selected;
         });

         modService.getMods($scope.config.wadpath).then(function(mods) {
             $scope.mods = mods;

             if ($scope.config.initList !== false) {
                 try {
                     var startListJSON = JSON.parse($scope.config.initList);
                     var startList = nwService.readSyncJSON(startListJSON.path);

                     $scope.$broadcast('USELIST', startList, startListJSON.name);
                 } catch (e) {
                     console.log(e);
                 }
             }

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

         $scope.newSelected = function() {
             $scope.mods.filter(function(item) {
                 item.checked = false;
             });

             $scope.selected = [];
             $scope.usedList = 'Untitled';
         };

         $scope.saveSelected = function(ev) {
             $mdDialog.show({
                 controller: saveSelectedController,
                 templateUrl: 'app/templates/AddListPrompt.html',
                 parent: angular.element(document.body),
                 targetEvent: ev,
                 clickOutsideToClose: false
             });

             function saveSelectedController($scope, $mdDialog, modlistService) {
                 $scope.title = 'Save List';

                 if ($parent.usedList !== 'Untitled') {
                     $scope.listname = $parent.usedList;
                 }

                 $scope.double = [];

                 $scope.cancel = function() {
                     $mdDialog.cancel();
                 };

                 $scope.checkdoubles = function() {};

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

         $scope.moveUp = function($index) {
             if ($index > 0) {
                 _.move($scope.selected, $index, $index - 1);
             }
         };

         $scope.moveDown = function($index) {
             if ($scope.selected.length - 1 !== $index) {
                 _.move($scope.selected, $index, $index + 1);
             }
         };

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