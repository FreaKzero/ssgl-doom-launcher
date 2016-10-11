(function() {
  app.factory('configService', ['nwService', 'DEFAULTCONFIG', '$mdToast', configService]);

  function configService(nwService, DEFAULTCONFIG, $mdToast) {
    var service = {};

    service.config = _.extend(DEFAULTCONFIG, nwService.readSyncJSON(nwService.buildPath(['config.json']), true));

    service.importConfig = function(obj) {
      service.saveConfig(
        _.extend(DEFAULTCONFIG, obj)
      );
    };

    service.saveConfig = function(obj) {
      var toastDelay = 1500;

      nwService.writeJSON(obj, 'config.json', true).then(function() {
        $mdToast.show(
            $mdToast.simple().content('Saved configuration - SSGL restarts ...').position('bottom').hideDelay(toastDelay)
        );

        setTimeout(function() {                        
          window.location.reload();
        }, toastDelay + 500);

      }, function() {
        $mdToast.show(
            $mdToast.simple().content('An Error Occured').position('bottom').hideDelay(toastDelay)
        );
      });
    };

    service.getConfig = function() {
      return DEFAULTCONFIG;
    };        
        
    return service;
  }
})();
