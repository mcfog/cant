(function(){
  var path, sha1, Module;
  path = require('path');
  sha1 = function(it){
    return require('crypto').createHash('sha1').update(it).digest('hex');
  };
  module.exports = Module = (function(){
    Module.displayName = 'Module';
    var cant, name, _modules, _i, _ref, _len, prototype = Module.prototype, constructor = Module;
    cant = require('../cant');
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
    prototype.config = function(){
      return cant.config.apply(this, arguments);
    };
    prototype.handleRequest = function(path, _arg){
      var req, res, next, fs;
      req = _arg[0], res = _arg[1], next = _arg[2];
      fs = require('fs');
      path = Module.config('localPath') + String.prototype.replace.apply(path, Module.pattern);
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
          cpath = path.join('./tmp', "cant." + sha1(path) + ".dat");
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
              fs.readFile(path, function(err, data){
                if (err || !data) {
                  return next(err || new Error);
                }
                Module.handleData(data.toString(), function(err, content){
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
