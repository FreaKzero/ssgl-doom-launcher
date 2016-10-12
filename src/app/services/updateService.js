(function() {
  app.factory('updateService', ['$rootScope', '$http', '$mdDialog', 'nwService', updateService]);

  function updateService($rootScope, $http, $mdDialog, nwService) {
    var service = {};   
    var GITHUB = 'https://api.github.com/repos/FreaKzero/ssgl-doom-launcher/releases';

    service.openDialog = function(data) {
      $mdDialog.show({
        controller: function($scope) {
          data.body = data.body;
          $scope.round = Math.round;
          $scope.data = data;

          $scope.showDeny = true;

          $scope.dontShow = function() {
            /*
            $PARENT.config.dontShowUpdate = data.version;
            nwService.writeJSON($PARENT.config, 'config.json', true);
            */
            $mdDialog.cancel();
          };

          $scope.download = function(url) {
            nwService.getShell().openExternal(url);
          };

          $scope.close = function() {
            $mdDialog.cancel();
          };
        },

        templateUrl: 'app/templates/Update.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true
      });
    };

    service.updateAvailable = function(string) {
      return string.substr(1) !== 'test';
    };

    service.checkUpdate = function() {
      $http.get(GITHUB).then(function(res) {
        var data = res.data[0];
        if (service.updateAvailable(data.tag_name)) {
          service.openDialog(data);
        }
        console.log(res.data[0]);
        // body
        // name
        // assets => array
        // tag_name === checkUpdate
          // browser_download_url
          // download_count
      });
    };

    return service;
  }
})();
