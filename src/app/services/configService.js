(function() {
  app.factory('configService', ['nwService', 'DEFAULTCONFIG', configService]);

  function configService(nwService, DEFAULTCONFIG) {
    var service = {};

    // service.config = nwService.readSyncJSON(nwService.buildPath(['configs.json']), true);
    console.log(DEFAULTCONFIG);

    service.getConfig = function() {
      return DEFAULTCONFIG;
    };        
        
    return service;
  }
})();