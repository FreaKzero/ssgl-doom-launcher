define(function(require, exports, module) {

var INSTANCE = null;

function Events(target){
  var events = {};
  target = target || this;

    target.on = function(type, func, ctx){
      (events[type] = events[type] || []).push({f:func, c:ctx});
    };
    
    target.off = function(type, func){
      type || (events = {});
      var list = events[type] || [],
      i = list.length = func ? list.length : 0;
      while(i-->0) func == list[i].f && list.splice(i,1);
    };
    
    target.emit = function(){
      var args = Array.apply([], arguments),
      list = events[args.shift()] || [], i=0, j;
      for(;j=list[i++];) j.f.apply(j.c, args);
    };
}

  exports.createFor = function(target) {
    return new Events(target);
  };

  exports.getInstance = function() {
    INSTANCE = INSTANCE || new Events();
        return INSTANCE; 
  };
});