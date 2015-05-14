var fs = require('fs'),
    path = require('path'),
    execFile = require('child_process').execFile,
    Q = require('q'),
    recursive = require('recursive-readdir');

define(function() {

    var sys = {

        loadSettings: function(callback) {
            var appPath = path.dirname(process.execPath);
            fs.readFile(appPath + '/config.json', function(err, data) {
                if (err) {
                    console.log(err);
                    return {};
                }

                callback(JSON.parse(data.toString()));
            });
        },

        saveSettings: function(input) {
            var appPath = path.dirname(process.execPath);
            input = JSON.stringify(input, null, 4);

            fs.writeFile(appPath + '/config.json', input, function(err) {

                if (err) {
                    console.log(err);
                }

            });
        },

         launchOblique: function() {
            var child;
            var params = ['--batch', 'C:/Users/FreaK/Desktop/DOOM/wads/oblique/obliquerandom.wad'];
            var endparam = params.concat(['--load'],  'C:/Users/FreaK/Desktop/DOOM/Oblige-6.20/CONFIG.txt');

            child = execFile('C:/Users/FreaK/Desktop/DOOM/Oblige-6.20/Oblige.exe', endparam,
                function(error, stdout, stderr) {
                    if (error) {
                        console.log(error.stack);
                        console.log('Error code: ' + error.code + ' ' + error.signal);
                    }
                });

            return child;
        },

        launch: function(iwad, wads, doompath) {
            var child;
            var params = ['-iwad', iwad];
                params = params.concat(['-file'], wads);                      

            child = execFile(doompath, params,
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

        getWads: function(wadpath) {
            var defer = Q.defer();

            var tree = [];


            recursive(wadpath, function(err, files) {
                var wad;
                var len = files.length;

                for (var i = 0; i < len; i++) {
                    var allowed = ['PK3', 'WAD'];

                    var struc = files[i].split('\\'),
                        dirname = struc[struc.length - 2],
                        ext = struc[struc.length - 1].slice(-3).toUpperCase(),
                        name = struc[struc.length - 1].slice(0, -4);
                        
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

                if (len > 0 && tree.length === 0) {
                    tree.push(obj);
                }
                
                defer.resolve(tree);
            });

            return defer.promise;
        },

        getFiles: function(iwadpath, allowed) {
            if (typeof allowed === 'undefined') {
                allowed = false;
            }

            var defer = Q.defer(),
                p = iwadpath,
                iwad = [];

            fs.readdir(p, function(err, files) {
                if (err) {
                    defer.reject(err);
                }

                files.map(function(file) {

                    return {
                        name: file.slice(0, -4).toUpperCase(),
                        path: path.join(p, file),
                        realpath: fs.realpathSync(path.join(p, file)),
                        ext: file.slice(-3).toLowerCase()
                    };

                }).filter(function(file) {
                    var isFile = fs.statSync(file.path).isFile();

                    if (allowed && allowed.indexOf(file.ext) > -1 && isFile === true) {
                        return true;
                    } else {
                        return isFile;
                    }

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