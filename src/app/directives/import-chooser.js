(function() {
    app.directive('importChoose', ['nwService', '$mdToast', function(nwService, $mdToast) {
        return {
            restrict: 'AE',
            replace: 'true',
            require: 'ngModel',
            scope: {
                wdir: '=?'
            },

            template: '<div><input class="fileDialog" nwworkingdir="{{wdir}}" type="file" style="display:none;"><md-button style="width: 100%" class="fileBtn md-accent" ng-click="openDialog()"><i class="mdi mdi-arrow-down-bold-hexagon-outline"></i> Import Config</md-button></div>',

            link: function($scope, elem, att, ngModel) {
                $scope.wdir = nwService.execpath;
                
                var z = elem[0].querySelector('.fileDialog');

                z.addEventListener("change", function(evt) {                    
                    if (this.value !== "") {
                        nwService.readJSON(this.value).then(function(obj) {
                            
                            //TODO check if its a real config
                            nwService.writeJSON(obj, 'config.json', true).then(function() {
                                var delay = 1500;
                                $mdToast.show(
                                    $mdToast.simple().content('Imported Config - Reloading...').position('bottom').hideDelay(delay)
                                );
                                setTimeout(function() {                        
                                    window.location.reload();
                                }, 2000);

                            }, function() {
                                $mdToast.show(
                                    $mdToast.simple().content('Cant Save config ...').position('bottom').hideDelay(delay)
                                );
                            });
                        }, function(err) {
                            $mdToast.show(
                                $mdToast.simple().content('Cant open File ...').position('bottom').hideDelay(delay)
                            );
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