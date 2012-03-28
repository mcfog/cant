(function(){
  module.exports = (function(superclass){
    exports.displayName = 'exports';
    var prototype = __extend(exports, superclass).prototype, constructor = exports;
    function exports(){
      superclass.apply(this, arguments);
    }
    prototype.pattern = [/(.+)$/, '$1'];
    prototype.rpattern = ['(.+)$', '$1'];
    prototype.handleData = function(data, cb){
      cb(null, data);
    };
    prototype.getContentType = function(){
      return this.rpath;
    };
    return exports;
  }(require('./module')));
  function __extend(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
}).call(this);
