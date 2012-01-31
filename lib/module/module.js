(function(){
  var path, cant, sha1, Module;
  path = require('path');
  cant = null;
  process.nextTick(function(){
    return cant = require('../cant');
  });
  sha1 = function(it){
    return require('crypto').createHash('sha1').update(it).digest('hex');
  };
  module.exports = Module = (function(){
    Module.displayName = 'Module';
    var name, _modules, _i, _ref, _len, prototype = Module.prototype, constructor = Module;
    function Module(){
      void 8;
    }
    prototype.handleData = function(data, cb){
      throw Error('unimplemented');
    };
    _modules = {};
    for (_i = 0, _len = (_ref = ['stylus', 'stylus_nib', 'coco', 'raw']).length; _i < _len; ++_i) {
      name = _ref[_i];
      (_fn.call(Module, name));
    }
    prototype.handleRequest = function(rpath, _arg, cb){
      var req, res, next, fs, _this = this;
      req = _arg[0], res = _arg[1], next = _arg[2];
      fs = require('fs');
      rpath = cant.config('localPath') + String.prototype.replace.apply(rpath, this.pattern);
      fs.stat(rpath, function(err, stat){
        if (err) {
          return cb();
        }
        cant.cache({
          req: req,
          res: res,
          next: next
        }, stat.mtime, function(){
          var cpath;
          cpath = path.join('./tmp', "cant." + sha1(rpath) + ".dat");
          require('mkdirp')(path.dirname(cpath), function(err){
            if (err) {
              return next(err);
            }
            fs.stat(cpath, function(err, cstat){
              if (!err && cstat.mtime >= stat.mtime) {
                fs.readFile(cpath, function(err, data){
                  if (err || !data) {
                    return next(err || new Error);
                  }
                  return res.end(data);
                });
              }
              fs.readFile(rpath, function(err, data){
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
