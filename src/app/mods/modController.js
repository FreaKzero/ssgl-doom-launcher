var execFile = require('child_process').execFile;

app.controller('modController', ['$scope', 'modService', modController]);

function modController($scope, modService) {
    var self = this;

    modService.getMods($scope.config).then(function(mods) {
        $scope.mods = mods;
    });

    $scope.selected = [];
      
    $scope.moveUp = function($index) {
    	if ($index > 0) {
    		_.move($scope.selected, $index, $index-1);
    	}
    };

    $scope.moveDown = function($index) {
    	if ($scope.selected.length-1 !== $index) {
    		_.move($scope.selected, $index, $index+1);
    	}
    };

    $scope.checked = function(mod) {    
    	if (mod.checked === false) {
			$scope.selected = _($scope.selected).filter(function(item) {
     			return item.path !== mod.path;
			}); 

     	} else {    		
			$scope.selected.push(mod);    		
    	}    	
    };
    
    $scope.$on('STARTGZDOOM', function(ev, iwad) {
    	var child;
        var params = ['-iwad', $scope.config.iwadpath+iwad];

        var wads = $scope.selected.map(function(item) {
        	if (item.checked === true) {
            	return item.path;
        	}
        });
        
        params = params.concat(['-file'], wads);
        
        
        child = execFile($scope.config.gzDoom, params,
            function(error, stdout, stderr) {
                if (error) {
                    console.log(error.stack);
                    console.log('Error code: ' + error.code + ' ' + error.signal);
                }
            });

        child.on('exit', function(code) {
            console.log('EXIT: ' + code);
        });		
    });

}