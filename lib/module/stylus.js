(function(){
  var stylus;
  stylus = require('stylus');
  module.exports = (function(superclass){
    exports.displayName = 'exports';
    var prototype = __extend(exports, superclass).prototype, constructor = exports;
    function exports(){
      superclass.apply(this, arguments);
    }
    prototype.re = '(.+).css$';
    prototype.evalPath = function(_arg){
      var req, res;
      req = _arg.req, res = _arg.res;
      this._path = this.config('localpath');
      this._path += req.params[0] + '.styl';
      return this._path;
    };
    prototype.getStylus = function(it){
      return stylus(it.toString()).set('filename', this._path).set('compress', true);
    };
    prototype.handleData = function(data, _arg){
      var res, next, s;
      res = _arg.res, next = _arg.next;
      s = this.getStylus(data);
      return s.render(function(err, css){
        if (err) {
          return next(err);
        }
        res.end(css);
      });
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
