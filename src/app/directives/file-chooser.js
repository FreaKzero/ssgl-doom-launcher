(function() {
  app.directive('fileChoose', ['nwService', function(nwService) {
    return {
      restrict: 'AE',
      replace: 'true',
      require: 'ngModel',
      scope: {
        dirpath: '=?',
        ngModel: '=?',
        wdir: '=?'
      },

      template: '<div layout="row"><div flex="90"><md-input-container><label>{{label}}</label><input class="fileInput" type="text" ng-model="ngModel"></md-input-container></div><div flex="10"><md-button class="fileBtn md-accent" ng-click="openDialog()"><i class="mdi mdi-open-in-app"></i> File</md-button><input class="fileDialog" nwworkingdir="{{wdir}}" type="file" style="display:none;"></div></div>',

      link: function($scope, elem, att, ngModel) {

        if (typeof $scope.ngModel !== 'undefined' && $scope.ngModel !== '') {
          $scope.wdir = $scope.ngModel.substring(0, $scope.ngModel.lastIndexOf(nwService.pathsep));
        } else {
          $scope.wdir = nwService.execpath;
        }

        $scope.label = att.label;

        var z = elem[0].querySelector('.fileDialog'); 
        z.addEventListener('change', function() {

          if (this.value !== '') {
            var newPath = this.value;

            $scope.$apply(function() {
              $scope.ngModel = newPath;
            });
          }

        }, false);

        $scope.openDialog = function() {
          z.click();
        };
      }
    };
  }]);
})();
