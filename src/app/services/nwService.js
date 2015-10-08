(function() {
    var PATH = require('path'),
        FS = require('fs'),
        GUI = require('nw.gui'),
        execFile = require('child_process').execFile,
        recursive = require('recursive-readdir'),
        os = require('os');

    app.factory('nwService', ['$q', nwService]);

    function nwService($q) {
        var service = {};
        service.execpath = PATH.dirname(process.execPath);
        service.pathsep = _getSeperator();

        function _getSeperator() {
            if ( os.platform() === 'win32') {
                return '\\';
            } else {
                return '/';
            }
        }


        function _checkRel(path, relative) {
            if (typeof relative === 'undefined') {
                relative = false;
            }

            if (relative === true) {
                path = service.execpath + service.pathsep + path;
            }
            
            return path;
        }
        
        service.getPlatform = function() {
            return os.platform();
        }
        service.getName = function(path, cut) {
            if (typeof cut === 'undefined') { 
                cut = -5;
            }

            if (os.platform() === 'win32') {
                return path.replace(/^.*[\\\/]/, '').slice(0, cut);
            } else {
                return path.replace(/^.*[/]/, '').slice(0, cut);
            }
        };

        service.buildPath = function(array, execpath) {
            if (typeof execpath === 'undefined') { 
                execpath = false; 
            }

            if (execpath === true) {
                path = service.execpath;
            } else {
                path = '';
            }

            path = path + service.pathsep + array.join(service.pathsep);

            return path;
        };
        
        service.recursiveDir = function(path, callback) {
            var def = $q.defer();
            recursive(path, function(err, files) {
                if (err) {
                    def.reject(err);
                } else {
                    def.resolve(callback(files));
                }
            });

            return def.promise;
        };

        service.splitPath = function(path) {
            return path.split(service.pathsep);
        };

        service.getManifest = function() {
            return GUI.App.manifest;
        };

        service.getAbsolute = function(string) {
            return service.execpath + string;
        };

        service.getDirname = function(file) {
            return PATH.dirname(file);
        };

        service.rename = function(oldpath, newpath) {
            var def = $q.defer();
            FS.rename(oldpath, newpath, function(err) {
                if (err) {
                    def.reject(err);
                } else {
                    def.resolve(service.getName(newpath));
                }
            });
            return def.promise;
        };

        service.remove = function(path) {
            var def = $q.defer();

            FS.unlink(path, function(err) {
                if (err) {
                    def.reject(err);
                } else {
                    def.resolve(service.getName(path));
                }
            });
            return def.promise;
        };

        service.getDir = function(path, relative) {
            var def = $q.defer();
            path = _checkRel(path, relative);

            FS.readdir(path, function(err, fileArr) {
                if (err) {
                    def.reject(err);
                } else {
                    def.resolve(fileArr);
                }
            });

            return def.promise;
        };

        service.getShell = function() {
            return GUI.Shell;
        };

        service.mkDir = function(path, relative) {
            FS.exists(path, function(exists) {
                if (!exists) {
                    FS.mkdirSync(path);
                }
            });
        };
        // todo: try catch
        service.readSyncJSON = function(path, relative) {
            path = _checkRel(path, relative);
            return JSON.parse(FS.readFileSync(path, "utf8"));
        };

        service.readJSON = function(path, enc) {
            var def = $q.defer();
            if (typeof enc === 'undefined') {
                enc = 'utf8';
            }

            FS.readFile(path, enc, function(err, data) {
                if (err) {
                    def.reject(err);
                } else {
                    def.resolve(data);
                }
            });

            return def.promise;
        };

        service.writeTxt = function(content, path, relative) {
            var def = $q.defer();
            path = _checkRel(path, relative);

            FS.writeFile(path, content, function(err) {
                if (err) {
                    def.reject(err);
                } else {
                    def.resolve();
                }
            });

            return def.promise;
        };

        service.writeJSON = function(givenObject, path, relative) {
            var def = $q.defer();
            path = _checkRel(path, relative);

            FS.writeFile(path, JSON.stringify(givenObject, null, 4), function(err) {
                if (err) {
                    def.reject(err);
                } else {
                    def.resolve(service.getName(path));
                }
            });

            return def.promise;
        };

        return service;
    }

})();