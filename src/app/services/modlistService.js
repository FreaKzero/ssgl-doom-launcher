var path = require('path'),
    fs = require('fs'),
    recursive = require('recursive-readdir');

app.factory('modlistService', ['$q', '$rootScope', modlistService]);

function modlistService($q, $rootScope) {
    var service = {};
    var listDir = path.dirname(process.execPath)+'\\lists\\';
    
    service.rename = function(item) {
        var newPath = path.dirname(item.path) +'\\'+item.name+'.json';
        fs.rename(item.path, newPath, function(err) {
            if ( err ) console.log('ERROR: ' + err);
        });        
    };

    service.remove = function(path) {
        fs.unlinkSync(path);
    };

    service.saveSelected = function(name, list) {
        fs.writeFile(listDir+name+".json", JSON.stringify(list), function(err) {        
            if(err) {
                return alert(err);
            }    
        });

        setTimeout(function() {
            $rootScope.$broadcast('MODIFIEDLISTS');
        },1500);
    };

    service.readDir = function(wadpath) {
    	var defer = $q.defer();

        recursive(wadpath, function(err, files) {
            if (typeof files === 'undefined') {
                return [];
            }
            
            var wad;
            var len = files.length;
            var index = [];
            var lists = [];
            var allowed = ['JSON'];

            for (var i = 0; i < len; i++) {
                var struc = files[i].split('\\'),
					ext = struc[struc.length - 1].slice(-4).toUpperCase(),
					name = struc[struc.length - 1].slice(0, -5);
                    
					if (allowed.indexOf(ext) < 0) {
                        continue;
                    }

					lists.push({
                        name: name,
                        path: files[i],
                        wads: JSON.parse(fs.readFileSync(files[i], "utf8"))
                    });
            }

            defer.resolve(lists);
        });

        return defer.promise;
    };

    service.getLists = function() {
        return service.readDir(listDir);
    };

    return service;
}