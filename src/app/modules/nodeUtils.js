var fs = require('fs'),
    path = require('path'),
    execFile = require('child_process').execFile,
    Q = require('q'),
    recursive = require('recursive-readdir');

define(function() {

    var CONFIGFILE = '/gzDoomLauncher.json';

    var sys = {

        loadSettings: function(callback) {
            var cfgFile = path.dirname(process.execPath) + CONFIGFILE;

            if (fs.existsSync(cfgFile)) {

                fs.readFile(cfgFile, function(err, data) {
                    if (err) {
                        return {};
                    }

                    callback(JSON.parse(data.toString()));
                });
            } else {
                callback({
                    error: true
                });

            }
        },

        settingsHasErrors: function(input) {
            var toCheck;
            var error = [];
            
            if (input.activateoblige === true) {
                toCheck = ['gzDoom', 'obligepath', 'obligeconfigpath'];
            } else {
                toCheck = ['gzDoom'];
            }

            for (var prop in input) {
                if (toCheck.indexOf(prop) > -1) {
                    if (!fs.existsSync(input[prop])) {
                        error.push(prop);
                    }
                }
            }

            if (error.length > 0) {
                return error;
            } else {
                return false;
            }

        },

        saveSettings: function(input) {
            var appPath = path.dirname(process.execPath);
            input = JSON.stringify(input, null, 4);

            fs.writeFile(appPath + CONFIGFILE, input, function(err) {

                if (err) {
                    throw err;
                }

            });
        },

        launchOblige: function(bin, config, map) {
            var child;
            var params = ['--batch', map];
            var endparam = params.concat(['--load'], config);

            child = execFile(bin, endparam,
                function(error, stdout, stderr) {
                    if (error) {
                        return error.signal;
                    }
                });

            return child;
        },

        launchObligeGUI: function(path) {
            var child;            

            child = execFile(path, [],
                function(error, stdout, stderr) {
                    if (error) {
                        return error.signal;
                    }
                });

            return child;
        },

        launch: function(iwad, wads, doompath, randmap) {
            if (typeof randmap !== 'undefined') {
                wads.push(randmap);
            }

            console.log(wads);
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
            var index = [];

            recursive(wadpath, function(err, files) {
                var wad;
                var len = files.length;

                for (var i = 0; i < len; i++) {
                    var allowed = ['PK3', 'WAD'];

                    var struc = files[i].split('\\'),
                        dirname = struc[struc.length - 2],
                        ext = struc[struc.length - 1].slice(-3).toUpperCase(),
                        name = struc[struc.length - 1].slice(0, -4),
                        cursor = index.indexOf(dirname);

                    if (allowed.indexOf(ext) < 0) {
                        continue;
                    }

                    if (cursor === -1) {
                        index.push(dirname);
                        cursor = index.length - 1;

                        var obj = {};
                        obj.wads = [];
                        obj.name = dirname;
                        tree.push(obj);                   
                    }

                        
                    wad = {}; 
                    wad.name = name;
                    wad.ext = ext;
                    wad.path = fs.realpathSync(files[i]);                    

                    tree[cursor].wads.push(wad);
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
                        name: file.slice(0, -4),
                        path: path.join(p, file),
                        realpath: fs.realpathSync(path.join(p, file)),
                        ext: file.slice(-3).toLowerCase()
                    };

                }).filter(function(file) {
                    var isFile = fs.statSync(file.path).isFile();
                    
                    if (allowed && isFile) {
                        return allowed.indexOf(file.ext) > -1;
                    } else if (!allowed && isFile) {
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