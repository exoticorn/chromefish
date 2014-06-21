define(function() {
  return function() {
    var self = this;

    var stockfish = new Worker('libs/stockfish.js');
    var onready = null;

    stockfish.onmessage = function(event) {
      var line = event.data;
//      console.log(line);
      if(line == 'uciok' && onready) {
        onready();
      }
      if(typeof(self.onreceive) == 'function') {
        self.onreceive(line);
      }
    };

    self.start = function(params) {
      params = params || {};
      if(typeof(params.onready) == 'function') {
        onready = params.onready;
      }
      self.send('uci');
    };

    self.send = function(line) {
      stockfish.postMessage(line);
    };
  };
});