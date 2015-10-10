(function() {
    app.directive('dirChoose', ['nwService', function(nwService) {
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

                if (typeof $scope.ngModel !== 'undefined' && $scope.ngModel !== '') {
                    $scope.wdir = $scope.ngModel;                    
                } else {
                    $scope.wdir = nwService.execpath;
                }
                
                $scope.label = att.label;

                var z = elem[0].querySelector('.fileDialog');
                var x = elem[0].querySelector('.fileInput');

                z.addEventListener("change", function(evt) {

                    if (this.value !== "") {
                        var newPath = this.value + nwService.pathsep;

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
