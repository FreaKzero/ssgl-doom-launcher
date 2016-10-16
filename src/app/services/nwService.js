(function() {
  var PATH = require('path'),
    FS = require('fs'),
    GUI = require('nw.gui'),
    os = require('os'),
    chokidar = require('chokidar'),
    md5File = require('md5-file'),
    Window = GUI.Window.get();

  app.factory('nwService', ['$q', '$rootScope', '$mdDialog', nwService]);
    /**
     * NodeWebkit related Service
     *
     * @method nwService
     * @module ssgl
     * @submodule nwService
     * @param  {Object}  $q Async
     */
  function nwService($q, $rootScope, $mdDialog) {
    var service = {};

    //#TODO: doc
    service.watcher = null;

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

    service.livereload = function(callback) {
      chokidar.watch('../src/**/*', {
        ignored: /[\/\\]\./
      }).on('all', function(event, path) {
        if (event === 'change') {
          callback(path);
        }
      });
    };

    service.startWatcher = function(path, callback) {
      service.watcher = chokidar.watch(path, {
        ignored: /[\/\\]\./
      }).on('all', function(event, path) {
        callback(path, event);
      });
    };

    //#TODO: doc
    service.getWatcher = function() {
      return service.watcher;
    };

    //#TODO Strange behaviour between prod and dev environment ?
    service.md5File = function(str) {
      return md5File.sync ? md5File.sync(str) : md5File(str);
    };

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
              service.getShell().openItem(service.execpath + service.pathsep + 'paniclog.txt');
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

    //TODO: doc
    //TODO: Error handling
    service.getModifiedDate = function(file) {
      var def = $q.defer();

      if (!FS.lstatSync(file).isFile()) {
        def.resolve(null);
      }

      FS.stat(file, function(err, data) {

        if (err) {
          console.log(err);
          def.resolve(null);
        }

        if (typeof data.mtime === 'undefined') {
          def.resolve(data.ctime);
        } else {
          def.resolve(data.mtime);
        }
      });

      return def.promise;
    };

    //#TODO doc
    service.registerMenu = function() {
      var mb = new GUI.Menu({type: 'menubar'});
      mb.createMacBuiltin('SSGL', {
        hideEdit: false,
      });
      GUI.Window.get().menu = mb;
    };

    //fs.stat(path, [callback])

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
      if (execpath) {
        array.unshift(service.execpath);
      }

      return PATH.join.apply(this, array);
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
      return service.execpath + service.pathsep + string;
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


        //TODO: doc
        //TODO: error handling
        //TODO: file extension filter
    service.wipeDir = function(path) {
      path = _checkRel(path, false);

      FS.readdir(path, function(err, fileArr) {
        for (var i = fileArr.length; i--;) {
          var full = service.buildPath([path, fileArr[i]], false);
          FS.unlinkSync(full);
        }
      });
    };

        //TODO: error handling
        /**
     * Returns Object with Filenames, absolute filepaths and last modified dates
     *
     * @method getDirWithDate
     * @for nwService
     * @async
     * @param  {String} path
     * @param  {Boolean} When true use BASEDIR

     * @return {Promise} obj with name, path, date
     */
    service.getDirWithDate = function(path) {
      var def = $q.defer();
      var files = [];

      FS.readdir(path, function(err, fileArr) {
        if (err) {
          def.resolve([]);
        } else {
          for (var i = fileArr.length; i--;) {
            var full = service.buildPath([path, fileArr[i]], false);
            var stat = FS.statSync(full);

            if (err) {
              console.log(err);
            }

            files.push({
              name: fileArr[i],
              path: full,
              date: stat.mtime
            });
          }

          def.resolve(files);
        }
      });

      return def.promise;
    };

  /**
   * Read a "flat" Directory async without dotfiles
   *
   * @method getDir
   * @for nwService
   * @param  {String} path
   * @param  {Boolean} When true use BASEDIR
   * @async
   * @return {Promise}
   */
    service.getDir = function(path) {
      var def = $q.defer();
      FS.readdir(path, function(err, fileArr) {
        if (err) {
          def.reject(err);
        } else {
          fileArr = fileArr.filter(function(item) {
            if (item.slice((item.lastIndexOf('.') - 1 >>> 0) + 2) !== '')
              return item;
          });

          def.resolve(fileArr);
        }
      });

      return def.promise;
    };

        //#TODO Docs
    service.getWindow = function() {
      return Window;
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

    /**
     * Is NWJS started with a particular Argument
     * @method hasArg
     * @for nwService
     * @param  {String}  arg asked Argument
     * @return {Boolean} True when started with Argument
     */
    service.hasArg = function(arg) {
      var len = GUI.App.argv.length;

      for (var i = 0; i < len; i++) {
        if (GUI.App.argv[i] === arg) {
          return true;
        }
      }

      return false;
    };

    /**
     * Opens Devtools
     *
     * @method openDevTools
     * @for nwService
     */
    service.openDevTools = function() {
      GUI.Window.get().showDevTools();
    };

    //TODO: Error Handling
    /**
     * Copies a particular sourcefile to target
     *
     * @method copyFile
     * @for nwService
     * @param  {String} source
     * @param  {String} target
     */
    service.copyFile = function(source, target) {
      FS.createReadStream(source).pipe(FS.createWriteStream(target));
    };

    /**
     * Make Directory
     * @method mkDir
     * @for nwService
     * @param  {String} path
     * @param  {Boolean} relative When true use BASEDIR
     */
    service.mkDir = function(path) {
      FS.exists(path, function(exists) {
        if (!exists) {
          FS.mkdirSync(path);
        }
      });
    };

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
        return JSON.parse(FS.readFileSync(path, 'utf8'));
      } catch (e) {
        console.log(e);
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
          try {
            def.resolve(JSON.parse(data));
          } catch(err) {
            def.reject(err);
          }
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
