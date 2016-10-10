(function() {
  app.factory('configService', ['nwService', 'DEFAULTCONFIG', configService]);

  function configService(nwService, DEFAULTCONFIG) {
    var service = {};

    service.config = _.extend(DEFAULTCONFIG, nwService.readSyncJSON(nwService.buildPath(['config.json']), true));

    service.getConfig = function() {
      return DEFAULTCONFIG;
    };        
        
    return service;
  }
})();