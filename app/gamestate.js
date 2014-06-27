"use strict";

define(['libs/chess.min.js'], function(Chess) {
  var gamestate = {
    Clock: function(params) {
      params = params || {};
      var time = params.time || 1*60;
      var inc = params.inc || 0.05;
      var self = this;
      self.white = {time: time * 1000, inc: inc * 1000};
      self.black = {time: time * 1000, inc: inc * 1000};

      self.start = function(player) {
        self[player].startTime = Date.now();
        self.running = player;
      };

      self.stop = function() {
        var c = self[self.running];
        c.time -= Date.now() - c.startTime;
        if(c.time < 0) {
          c.flag = true;
        }
        c.time += c.inc;
        delete c.startTime;
        delete self.running;
      };

      self.uci = function() {
        return 'wtime ' + Math.floor(self.white.time) + ' winc ' + Math.floor(self.white.inc) +
          ' btime ' + Math.floor(self.black.time) + ' binc ' + Math.floor(self.black.inc);
      };
    },
    Game: function(params) {
      params = params || {};
      var self = this;
      self.clock = params.clock || new gamestate.Clock();
      self.engine = params.engine;
      self.game = new Chess();

      function onreceive(line) {
        var match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbk])?/);
        if(match) {
          self.clock.stop();
          self.game.move({from: match[1], to: match[2], promotion: match[3]});
          if(self.onPositionChanged) {
            self.onPositionChanged(self.game.fen());
          }
          if(!self.game.game_over()) {
            startEngine();
          }
          if(self.onClockChanged) {
            self.onClockChanged(self.clock);
          }
        }
        if(self.onreceive) {
          self.onreceive(line);
        }
      }
      self.engine.onreceive = onreceive;

      function startEngine() {
        var moves = '';
        var history = self.game.history({verbose: true});
        for(var i = 0; i < history.length; ++i) {
          var move = history[i];
          moves += ' ' + move.from + move.to + (move.promotion ? move.promotion : '');
        }
        self.engine.send('position startpos moves' + moves);
        self.engine.send('go ' + self.clock.uci());
        self.clock.start(self.game.turn() == 'w' ? 'white' : 'black');
      }

      self.position = function() {
        return self.game.fen();
      };

      startEngine();
    }
  };
  return gamestate;
});