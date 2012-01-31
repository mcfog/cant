(function(){
  var coco;
  coco = require('coco');
  module.exports = (function(superclass){
    exports.displayName = 'exports';
    var prototype = __extend(exports, superclass).prototype, constructor = exports;
    function exports(){
      superclass.apply(this, arguments);
    }
    prototype.pattern = [/(.+)\.js$/, '$1.co'];
    prototype.rpattern = ['(.+)\\.co$', '$1.js'];
    prototype.handleData = function(data, cb){
      cb(null, coco.compile(data));
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
