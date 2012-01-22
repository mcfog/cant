(function(){
  var coco;
  coco = require('coco');
  module.exports = (function(superclass){
    exports.displayName = 'exports';
    var prototype = __extend(exports, superclass).prototype, constructor = exports;
    function exports(){
      superclass.apply(this, arguments);
    }
    prototype.re = '(.+).js$';
    prototype.evalPath = function(_arg){
      var req, res, path;
      req = _arg.req, res = _arg.res;
      path = this.config('localpath');
      path += req.params[0];
      path += '.co';
      return path;
    };
    prototype.evalCdnPath = function(path){
      return path.replace(/.co$/, '.js');
    };
    prototype.handleData = function(data, _arg){
      var res, next;
      res = _arg.res, next = _arg.next;
      return res.end(coco.compile(data));
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
