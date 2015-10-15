(function() {
    var PATH = require('path'),
        FS = require('fs'),
        GUI = require('nw.gui'),
        recursive = require('recursive-readdir'),
        os = require('os');        

    app.factory('nwService', ['$q', '$rootScope', '$mdDialog', nwService]);
    /**
     * NodeWebkit related Service (Path, Fs, GUI, recursive, os)
     *
     * @method nwService
     * @module ssgl
     * @submodule nwService
     * @param  {Object}  $q Async
     */
    function nwService($q, $rootScope, $mdDialog) {
        var service = {};
        /**
         * BASEDIR
         * @property execpath
         * @type {String}
         */
        service.execpath = PATH.dirname(process.execPath);

        /**
         * Operating System Directory seperator (/ or \\)
         * @property {pathsep}
         * @type {String}
         */
        service.pathsep = _getSeperator();
        
        /**
         * Gives back the directory seperator for active OS
         *
         * @method _getSeperator
         * @for nwService
         * @return {String} Os specific directory seperator
         * @private
         */
        function _getSeperator() {
            if (os.platform() === 'win32') {
                return '\\';
            } else {
                return '/';
            }
        }

        //TODO better methodname
        /**
         * Gives back Fullpath of BASEDIR
         *
         * @method _checkRel
         * @for nwService
         * @param  {String} path given path
         * @param  {Boolean} relative When true give absolute path from BASEDIR back
         * @return {String} gives back absolute path when path is relative
         * @private
         */
        function _checkRel(path, relative) {
            if (typeof relative === 'undefined') {
                relative = false;
            }

            if (relative === true) {
                path = service.execpath + service.pathsep + path;
            }

            return path;
        }

        /**
         * Panic Dialog - for critical errors
         * 
         * @method panic
         * @for nwService
         * @param  {String} title
         * @param  {String} message
         * @param  {String} log
         */
        service.panic = function(title, message, log) {
            $mdDialog.show({
                templateUrl: 'app/templates/PanicDialog.html',
                parent: angular.element(document.body),
                targetEvent: null,

                controller: function($scope) {
                    $scope.title = title;
                    $scope.message = message;
                    $scope.log = log;

                    $scope.cancel = function() {
                        $mdDialog.cancel();
                    };

                    $scope.savelog = function() {
                        service.writeTxt($scope.message + '\n\n' + $scope.log, 'paniclog.txt', true).then(function() {
                            service.getShell().openItem(service.execpath + service.pathsep +'paniclog.txt');
                        });
                    };
                }
            });
        };

        /**
         * Gives back the Platform
         *
         * @method getPlatform
         * @for nwService
         * @return {String} Plattform (win32, linux etc)
         */
        service.getPlatform = function() {
            return os.platform();
        };
        
        /**
         * Gives back only Filename back of an file, can also trim extensions
         * @method getName
         * @for nwService
         * @param  {String} path given Path
         * @param  {cut} cut  default 5 (.json)
         * @return {String} filename
         */
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

        /**
         * Builds Path for active OS
         *
         * @method buildPath
         * @for nwService
         * @param  {Array}  array Array with paths to join
         * @param  {Boolean}  execpath When true - merge all given Paths into execpath
         * @return {String} Merged Path
         */
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

        /**
         * Goes through a Directory recursively via callback method
         *
         * @method recursiveDir
         * @for nwService
         * @param  {String}     path
         * @param  {Function}   callback Callback what todo when walk through the directory
         * @async
         * @return {Promise} Promise
         */
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

        /**
         * gives back path as array
         * @method splitPath
         * @for nwService
         * @param  {String}  path
         * @return {Array} Array with Pathsegments
         */
        service.splitPath = function(path) {
            return path.split(service.pathsep);
        };

        /**
         * Gives back JSON Package Manifest
         *
         * @method getManifest
         * @for nwService
         * @return {Object} Package Manifest as Object
         */
        service.getManifest = function() {
            return GUI.App.manifest;
        };

        /**
         * Gives back Absolute BASEPATH
         * @method getAbsolute
         * @for nwService
         * @param  {String} to append on execpath
         * @return {String} path with BASEDIR
         */
        service.getAbsolute = function(string) {
            return service.execpath + string;
        };

        /**
         * Gives back Directoryname
         *
         * @method getDirname
         * @for nwService
         * @param  {String} filepath
         * @return {String} Directorypath of Filepath
         */
        service.getDirname = function(file) {
            return PATH.dirname(file);
        };

        /**
         * Async Rename
         *
         * @method rename
         * @for nwService
         * @param  {String} oldpath
         * @param  {String} newpath
         * @async
         * @return {Promise}
         */
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

        /**
         * Async Delete
         * @method remove
         * @for nwService
         * @param  {String} path
         * @async
         * @return {Promise}
         */
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
        /**
         * Read a "flat" Directory async
         *
         * @method getDir
         * @for nwService
         * @param  {String} path
         * @param  {Boolean} When true use BASEDIR
         * @async
         * @return {Promise}
         */
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

        /**
         * Get NWJS Shell Object
         *
         * @method getShell
         * @for nwService
         * @return {Object}
         */
        service.getShell = function() {
            return GUI.Shell;
        };

        //TODO docs
        service.getArgs = function() {
            return GUI.App.argv;
        };

        //TODO docs
        service.devTools = function() {
            GUI.Window.get().showDevTools();
        };

        /**
         * Make Directory
         * @method mkDir
         * @for nwService
         * @param  {String} path
         * @param  {Boolean} relative When true use BASEDIR
         */
        service.mkDir = function(path, relative) {
            FS.exists(path, function(exists) {
                if (!exists) {
                    FS.mkdirSync(path);
                }
            });
        };

        // todo: try catch
        /**
         * Read JSON Sync
         * @method readSyncJSON
         * @for nwService
         * @param  {String}     path
         * @param  {[type]}     relative When true use BASEDIR
         * @return {Object} Object parsed from JSON
         */
        service.readSyncJSON = function(path, relative) {
            path = _checkRel(path, relative);
            try {
                return JSON.parse(FS.readFileSync(path, "utf8"));
            } catch (e) {
                return {};
            }
        };

        /**
         * Read JSON Async
         * @method readJSON
         * @for nwService
         * @async
         * @param  {String} path
         * @param  {String} enc  encoding, default utf8
         * @return {Promise}
         */
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

        /**
         * Write Text into file async
         * @method writeTxt
         * @for nwService
         * @async
         * @param  {String} content
         * @param  {String} path
         * @param  {Boolean} relative When true use BASEDIR
         * @return {Promise}
         */
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

        /**
         * Writes Object to JSON File async
         *
         * @method writeJSON
         * @async
         * @for nwService
         * @param  {Object} givenObject
         * @param  {String} path
         * @param  {Boolean} relative When true use BASEDIR
         * @return {Promise}
         */
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