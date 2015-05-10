var fs = require('fs'),
    path = require('path'),
    execFile = require('child_process').execFile,
    Q = require('q'),
    recursive = require('recursive-readdir');

define(function() {

    var sys = {

        saveSettings: function(input) {
            fs.writeFile("/config.cfg", input, function(err) {
            
            if(err) {
                console.log(err);
            }
            }); 

        }
        launch: function(iwad, wads, doompath) {
            var child;
            var params = ['-iwad', iwad];
            var endparam = params.concat(['-file'], wads);

            child = execFile(doompath, endparam,
                function(error, stdout, stderr) {
                    if (error) {
                        console.log(error.stack);
                        console.log('Error code: ' + error.code + ' ' + error.signal);
                    }
                });

            child.on('exit', function(code) {
                console.log('EXIT: ' + code);
            });
        },

        getWads: function() {
            var defer = Q.defer();

            var tree = [];


            recursive('gzdoom/wad', function(err, files) {
                var wad;

                for (var i = 0; i < files.length; i++) {
                    var allowed = ['PK3','WAD'];

                        var struc = files[i].split('\\'),
                        dirname = struc[struc.length - 2],
                        ext = struc[struc.length - 1].slice(-3).toUpperCase(),
                        name = struc[struc.length - 1].slice(0,-4);
                        
                        if (allowed.indexOf(ext) < 0) {
                            continue;
                        } 

                    if (typeof obj === 'undefined' || obj.name !== dirname) {

                        if (typeof obj !== 'undefined') {
                            tree.push(obj);
                        }

                        var obj = {};
                        obj.wads = [];
                        obj.name = dirname;                        
                    }
                    
                    wad = {};
                    wad.name = name;
                    wad.ext = ext;
                    wad.path = fs.realpathSync(files[i]);

                    obj.wads.push(wad);
                }

                defer.resolve(tree);
            });

            return defer.promise;
        },

        getiwads: function() {
            var defer = Q.defer(),
                p = 'gzdoom/iwad',
                iwad = [];

            fs.readdir(p, function(err, files) {
                if (err) {
                    defer.reject(err);
                }

                files.map(function(file) {
                    return {
                        name: file.split('.')[0].toUpperCase(),
                        path: path.join(p, file),
                        realpath: fs.realpathSync(path.join(p, file))
                    };

                }).filter(function(file) {

                    return fs.statSync(file.path).isFile();

                }).forEach(function(file) {
                    iwad.push(file);
                });

                defer.resolve(iwad);
            });

            return defer.promise;
        }
    };
    return sys;
});