(function(){
  var connect, fs, config, cant, mods;
  connect = require('connect');
  fs = require('fs');
  config = {
    baseUri: '/static',
    attachPoint: '/static',
    cdnPrefix: 'cdn',
    localPath: 'static',
    expire: 30
  };
  module.exports = cant = {
    get baseuri(){
      return this.config('baseUri');
    },
    config: function(name, val){
      switch (false) {
      case typeof name !== 'object':
        __import(config, name);
        break;
      case val !== undefined:
        return config[name];
      default:
        config[name] = val;
      }
      return cant;
    },
    register: function(mod){
      mods.push(mod);
      return cant;
    },
    use: function(){
      var arg, _i, _len;
      for (_i = 0, _len = arguments.length; _i < _len; ++_i) {
        arg = arguments[_i];
        if (typeof arg === 'string') {
          cant.register(this.Module[arg]);
        } else {
          cant.register(arg);
        }
      }
      return cant;
    },
    middleware: function(){
      return connect(connect.router(function(app){
        app.get(RegExp(cant.config('attachPoint') + '(/.+)$'), function(req, res, next){
          var path;
          if (!req.params || !req.params[0]) {
            return next();
          }
          path = req.params[0];
          return (function(mods){
            return function(err){
              var me, mod, re, match;
              me = arguments.callee;
              mod = mods.shift();
              if (!mod || !mod.pattern) {
                return next();
              }
              re = mod.pattern[0];
              re = typeof re === 'string' ? RegExp(re + '') : re;
              match = re.exec(path);
              if (!match) {
                return me();
              }
              return mod.handleRequest(path, [req, res, next], me);
            }();
          }.call(this, __clone(mods)));
        });
      }));
    },
    cache: function(_arg, mtime, cb){
      var req, res, expire, ifs, cc, name, val, _i, _ref, _ref2, _len;
      req = _arg.req, res = _arg.res;
      expire = cant.config('expire');
      if (expire > 0) {
        ifs = req.header('If-Modified-Since');
        cc = {};
        for (_i = 0, _len = (_ref = ((_ref2 = req.header('Cache-Control')) != null ? _ref2.split(/\s*,\s*/).map(_fn) : void 8) || []).length; _i < _len; ++_i) {
          _ref2 = _ref[_i], name = _ref2[0], val = _ref2[1];
          if (name && val) {
            cc[name] = val;
          }
        }
        if (cc['max-age'] > 0 && ifs && new Date(ifs >= mtime)) {
          return res.writeHead(304);
        }
        try {
          res.header('Cache-Control', "max-age=" + expire);
          res.header('Last-Modified', mtime.toGMTString());
        } catch (_e) {}
      }
      cb();
      function _fn(it){
        return it.split(/\s*=\s*/);
      }
    },
    compile: function(){
      var fs, path, walk;
      fs = require('fs');
      path = require('path');
      walk = function(d, cb){
        var files, _qwop;
        arguments.callee.counter += 1;
        files = fs.readdirSync(d);
        _qwop = function(){
          var file, lpath, stat, _qwop_mod;
          if (files.length == 0) {
            walk.counter -= 1;
            if (walk.counter == 0) {
              return typeof cb == 'function' ? cb() : void 8;
            } else {
              return;
            }
          }
          file = files.shift();
          lpath = path.join(d, file).replace(/\\/g, '/');
          stat = fs.statSync(lpath);
          if (stat.isDirectory()) {
            walk(lpath, cb);
            return _qwop();
          }
          if (!stat.isFile()) {
            return _qwop();
          }
          _qwop_mod = function(mod, next){
            var re, _this = this;
            re = mod.rpattern[0];
            re = typeof re === 'string' ? RegExp(re + '') : re;
            if (!re.exec(lpath)) {
              return next(true);
            }
            fs.readFile(lpath, function(err, data){
              var cpath;
              if (err) {
                return next(err);
              }
              cpath = path.join(cant.config('cdnPrefix'), lpath.replace(re, mod.rpattern[1]));
              require('mkdirp')(path.dirname(cpath), function(err){
                if (err) {
                  return next(err);
                }
                mod.handleData(data.toString(), function(err, content){
                  if (err) {
                    return next(err);
                  }
                  fs.writeFile(cpath, content, function(err){
                    if (err) {
                      return next(err);
                    }
                    next(null, true);
                  });
                });
              });
            });
          };
          (function(mods){
            (function(err, end){
              if (end) {
                return;
              }
              arguments.callee.mod = mods.shift();
              if (!arguments.callee.mod) {
                return;
              }
              return _qwop_mod(arguments.callee.mod, arguments.callee);
            })(null);
          }.call(this, __clone(mods)));
          return _qwop();
        };
        return _qwop();
      };
      walk.counter = 0;
      walk(cant.config('localPath'), function(){});
    },
    Module: require('./module')
  };
  cant.notfound = (function(){
    notfound.displayName = 'notfound';
    var prototype = notfound.prototype, constructor = notfound;
    notfound.prototype = Error.prototype;
    function notfound(){}
    return notfound;
  }());
  mods = [];
  function __import(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
  function __clone(it){
    function fun(){} fun.prototype = it;
    return new fun;
  }
}).call(this);
