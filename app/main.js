"use strict";

require(['libs/react-0.10.0.js', 'chessboard', 'engine-connector',
  'gamestate', 'clockview'],
  function(React, Chessboard, Engine, gamestate, ClockView) {
  var EngineLog = React.createClass({
    getInitialState: function() { return { lines: [] }; },
    push: function(line) {
      if(this.isMounted()) {
        var lines = this.state.lines;
        lines.push(line);
        var maxLines = this.props.maxLines || 5;
        while(lines.length > maxLines) {
          lines.shift();
        }
        this.setState({ lines: lines });
      }
    },
    render: function() {
      return React.DOM.pre(null, this.state.lines.join('\n'));
    }
  });

  var Board = React.createClass({
    componentDidMount: function() {
      this.chessboard = new Chessboard(this.getDOMNode());
      this.chessboard.position(this.props.position);
    },
    componentDidUpdate: function() {
      this.chessboard.position(this.props.position);
      this.chessboard.updateSize();
    },
    render: function() {
      return React.DOM.div({ style: { width: 500, height: 500 } });
    }
  });

  var App = React.createClass({
    getInitialState: function() {
      return { position: 'start', clock: new gamestate.Clock({ time: 1*60, inc: 0.5 }) };
    },
    componentDidMount: function() {
      this.engine = new Engine();
      this.engine.start();
//      this.engine.send('setoption name Skill Level value 5');
      chrome.system.cpu.getInfo(function(info) {
        this.engine.send('setoption name Threads value ' + info.numOfProcessors);
      }.bind(this));
      this.game = new gamestate.Game({ engine: this.engine, clock: this.state.clock});
      this.game.onPositionChanged = this.updatePosition;
      this.game.onClockChanged = this.updateClock;
      this.game.onreceive = this.refs.log.push;
    },
    updatePosition: function(pos) {
      this.setState({ position: pos });
    },
    updateClock: function(clock) {
      this.setState({ clock: clock });
    },
    render: function() {
      return React.DOM.div(null,
        ClockView(this.state.clock.black),
        Board({ position: this.state.position }),
        ClockView(this.state.clock.white),
        EngineLog({ ref: 'log' })
      );
    }
  });

  React.renderComponent(App(), document.body);
});