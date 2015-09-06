var fs = require('fs'),
    path = require('path'),
    execFile = require('child_process').execFile,
    recursive = require('recursive-readdir');

app.factory('modService', ['$q',modService]);

function modService($q) {
    var service = {};

    service.readDir = function(wadpath) {
    	var defer = $q.defer();

        recursive(wadpath, function(err, files) {
            var wad;
            var len = files.length;
            var index = [];
            var mods = [];
            var allowed = ['PK3', 'WAD'];

            for (var i = 0; i < len; i++) {
                var struc = files[i].split('\\'),
					dirname = struc[struc.length - 2],
					ext = struc[struc.length - 1].slice(-3).toUpperCase(),
					name = struc[struc.length - 1].slice(0, -4);

					if (allowed.indexOf(ext) < 0) {
                        continue;
                    }

					mods.push({name: name, dir: dirname, checked: false, path: files[i]});
            }

            defer.resolve(mods);
        });

        return defer.promise;
    };

    service.getMods = function(config) {
        return service.readDir(config.wadpath);
    };

    return service;
}