(function(){
  var stylus;
  stylus = require('stylus');
  module.exports = (function(superclass){
    exports.displayName = 'exports';
    var prototype = __extend(exports, superclass).prototype, constructor = exports;
    function exports(){
      superclass.apply(this, arguments);
    }
    prototype.pattern = [/(.+)\.css$/, '$1.styl'];
    prototype.rpattern = ['(.+)\\.styl$', '$1.css'];
    prototype.getStylus = function(it){
      return stylus(it.toString()).set('filename', this._path).set('compress', true);
    };
    prototype.handleData = function(data, cb){
      var s;
      s = this.getStylus(data.toString());
      s.render(function(err, css){
        if (err) {
          return cb(err);
        }
        cb(null, css);
      });
    };
    prototype.getContentType = function(){
      return 'text/css';
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
