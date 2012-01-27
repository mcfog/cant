(function(){
  var coco;
  coco = require('coco');
  module.exports = (function(superclass){
    exports.displayName = 'exports';
    var prototype = __extend(exports, superclass).prototype, constructor = exports;
    function exports(){
      superclass.apply(this, arguments);
    }
    prototype.re = '(.+)$';
    prototype.evalPath = function(_arg){
      var req, res, path;
      req = _arg.req, res = _arg.res;
      path = this.config('localpath');
      path += req.params[0];
      return path;
    };
    prototype.evalCdnPath = function(path){
      return path;
    };
    prototype.handleData = function(data, cb){
      return cb(null, data);
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
