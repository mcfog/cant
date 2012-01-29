(function(){
  var nib, stylus;
  nib = require('nib');
  stylus = require('stylus');
  module.exports = (function(superclass){
    exports.displayName = 'exports';
    var prototype = __extend(exports, superclass).prototype, constructor = exports;
    function exports(){
      superclass.apply(this, arguments);
    }
    prototype.re = '(.+)\\.css$';
    prototype.getStylus = function(it){
      return stylus(it.toString()).set('filename', this._path).set('compress', true).use(nib());
    };
    return exports;
  }(require('./stylus')));
  function __extend(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
}).call(this);
