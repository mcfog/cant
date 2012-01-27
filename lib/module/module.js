(function(){
  var sha1, Module;
  sha1 = function(it){
    return require('crypto').createHash('sha1').update(it).digest('hex');
  };
  module.exports = Module = (function(){
    Module.displayName = 'Module';
    var name, _modules, _i, _ref, _len, prototype = Module.prototype, constructor = Module;
    function Module(){
      void 8;
    }
    prototype.re = '';
    prototype.evalPath = function(_arg){
      var req, res, next;
      req = _arg.req, res = _arg.res, next = _arg.next;
      throw Error('unimplemented');
    };
    prototype.evalCdnPath = function(path){
      throw Error('unimplemented');
    };
    prototype.handleData = function(data, _arg){
      var req, res, next;
      req = _arg.req, res = _arg.res, next = _arg.next;
      throw Error('unimplemented');
    };
    _modules = {};
    for (_i = 0, _len = (_ref = ['stylus', 'stylus_nib', 'coco', 'raw']).length; _i < _len; ++_i) {
      name = _ref[_i];
      (_fn.call(Module, name));
    }
    prototype.config = function(){
      return require('../cant').config.apply(this, arguments);
    };
    prototype.attach = function(cant){
      var _this = this;
      return cant.register(this.re, function(req, res, next){
        var fs, path;
        fs = require('fs');
        path = _this.evalPath({
          req: req,
          res: res,
          next: next
        });
        fs.stat(path, function(err, stat){
          if (err) {
            return next();
          }
          cant.cache({
            req: req,
            res: res,
            next: next
          }, stat.mtime, function(){
            var cpath;
            cpath = require('path').join(process.env.TEMP, "cant." + sha1(path) + ".dat");
            fs.stat(cpath, function(err, cstat){
              if (!err && cstat.mtime >= stat.mtime) {
                fs.readFile(cpath, function(err, data){
                  if (err || !data) {
                    return next(err || new Error);
                  }
                  return res.end(data);
                });
              }
              fs.readFile(path, function(err, data){
                if (err || !data) {
                  return next(err || new Error);
                }
                _this.handleData(data.toString(), function(err, content){
                  if (err) {
                    return next(err);
                  }
                  fs.writeFile(cpath, content, function(err){
                    if (err) {
                      return next(err);
                    }
                    res.end(content);
                  });
                });
              });
            });
          });
        });
      });
    };
    return Module;
    function _fn(name){
      this.__defineGetter__(name, function(){
        return _modules["./" + name] || (_modules["./" + name] = new (require("./" + name)));
      });
    }
  }());
}).call(this);
