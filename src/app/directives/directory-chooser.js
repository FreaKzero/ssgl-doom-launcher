app.directive('dirChoose', function() {
    return {
        restrict: 'AE',
        replace: 'true',
        require: 'ngModel',
        scope: {
          dirpath: '=',
          ngModel: '=',
          wdir: '='
        },

        template: '<div><md-input-container><label>{{label}}</label><input class="fileInput" type="text" ng-click="openDialog()" ng-model="ngModel"></md-input-container><input type="file" nwworkingdir="{{wdir}}" class="fileDialog" style="display:none" nwdirectory /></div>',
        link: function($scope, elem, att, ngModel) {

            $scope.wdir = $scope.ngModel;
            $scope.label= att.label;

            var z = elem[0].querySelector('.fileDialog');
            var x = elem[0].querySelector('.fileInput');

                z.addEventListener("change", function(evt) {
                  
                  if (this.value !== "") {
                    var newPath = this.value + '\\';
                    
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
});

app.directive('fileChoose', function() {
    return {
        restrict: 'AE',
        replace: 'true',
        require: 'ngModel',
        scope: {
          dirpath: '=',
          ngModel: '=',
          wdir: '='
        },

        template: '<div><md-input-container><label>{{label}}</label><input class="fileInput" type="text" ng-click="openDialog()" ng-model="ngModel"></md-input-container><input class="fileDialog" nwworkingdir="{{wdir}}" type="file" style="display:none;"></div>',        

        link: function($scope, elem, att, ngModel) {
            $scope.wdir = $scope.ngModel.substring(0, $scope.ngModel.lastIndexOf('\\'));
            $scope.label= att.label;

            var z = elem[0].querySelector('.fileDialog');
            var x = elem[0].querySelector('.fileInput');

                z.addEventListener("change", function(evt) {
                  
                  if (this.value !== "") {
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
});



/*
return {
     restrict: 'A',
     require: 'ngModel',
     scope: {
         ngModel: '='
     },
     link: function ($scope, $element, $attrs, ngModelCtrl) {

        function updateView(value) {
            ngModelCtrl.$viewValue = value;
            ngModelCtrl.$render(); 
        }

        function updateModel(value) {
            ngModelCtrl.$modelValue = value;
            $scope.ngModel = value; // overwrites ngModel value
        }
*/