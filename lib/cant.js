(function(){
  var connect, fs, config, cant, handlers;
  connect = require('connect');
  fs = require('fs');
  config = {
    baseuri: '/static',
    routepath: '/static',
    expire: 30,
    localpath: 'static'
  };
  module.exports = cant = {
    get baseuri(){
      return this.config('baseuri');
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
    register: function(re, fn){
      handlers.push([re, fn]);
      return cant;
    },
    use: function(){
      var arg, _i, _len;
      for (_i = 0, _len = arguments.length; _i < _len; ++_i) {
        arg = arguments[_i];
        switch (false) {
        case typeof arg !== 'string':
          this.Module[arg].attach(cant);
          break;
        default:
          arg.attach(cant);
        }
      }
      return cant;
    },
    middleware: function(){
      var routepath;
      routepath = this.config('routepath');
      if (!routepath) {
        return;
      }
      return connect(connect.router(function(app){
        var re, fn, _i, _ref, _len, _ref2;
        for (_i = 0, _len = (_ref = handlers).length; _i < _len; ++_i) {
          _ref2 = _ref[_i], re = _ref2[0], fn = _ref2[1];
          re = typeof re === 'string' ? RegExp(routepath + '' + re) : re;
          app.get(re, fn);
        }
      }));
    },
    cache: function(_arg, mtime, cb){
      var req, res, expire, ifs, cc, name, val, _i, _ref, _len, _ref2;
      req = _arg.req, res = _arg.res;
      expire = cant.config('expire');
      if (expire > 0) {
        ifs = req.header('If-Modified-Since');
        cc = {};
        for (_i = 0, _len = (_ref = req.header('Cache-Control').split(/\s*,\s*/).map(_fn)).length; _i < _len; ++_i) {
          _ref2 = _ref[_i], name = _ref2[0], val = _ref2[1];
          cc[name] = val;
        }
        if (cc['max-age'] > 0 && ifs && new Date(ifs >= mtime)) {
          return res.send(304);
        }
        res.header('Cache-Control', "max-age=" + expire);
        res.header('Last-Modified', mtime.toGMTString());
        cb();
      }
      function _fn(it){
        return it.split(/\s*=\s*/);
      }
    },
    compile: function(){
      throw Error('unimplemented');
    },
    Module: require('./module')
  };
  handlers = [];
  function __import(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
