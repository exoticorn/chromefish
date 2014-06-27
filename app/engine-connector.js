"use strict";

define(function() {
  return function() {
    var self = this;
    
    var loaded = false;
    var onready = null;
    var pendingCommands = [];
    
    var stockfish = document.createElement('embed');
    
    stockfish.addEventListener('load', function() {
      console.log('module did load');
      loaded = true;
      pendingCommands.forEach(function(cmd) {
        stockfish.postMessage(cmd);
      });
      pendingCommands = [];
    }, true);
    
    stockfish.addEventListener('message', function() {
      var line = event.data;
//      console.log(line);
      if(line == 'uciok' && onready) {
        onready();
      }
      if(typeof(self.onreceive) == 'function') {
        self.onreceive(line);
      }
    }, true);

    stockfish.setAttribute('width', '0');
    stockfish.setAttribute('height', '0');
    stockfish.setAttribute('src', 'stockfish.nmf');
    stockfish.setAttribute('type', 'application/x-pnacl');
    document.body.appendChild(stockfish);

    self.start = function(params) {
      params = params || {};
      if(typeof(params.onready) == 'function') {
        onready = params.onready;
      }
      self.send('uci');
    };

    self.send = function(line) {
      if(loaded) {
        stockfish.postMessage(line);
      } else {
        pendingCommands.push(line);
      }
    };
  };
});