"use strict";

require(['libs/react-0.10.0.js', 'app/chessboard.js', 'app/engine-connector.js',
  'app/gamestate.js'], function(React, Chessboard, Engine, gamestate) {
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
      return { position: 'start' };
    },
    componentDidMount: function() {
      this.engine = new Engine();
      this.engine.start();
      this.engine.send('setoption name Skill Level value 10');
      chrome.system.cpu.getInfo(function(info) {
        this.engine.send('setoption name Threads value ' + info.numOfProcessors);
      }.bind(this));
      this.game = new gamestate.Game({ engine: this.engine, clock: new gamestate.Clock({ time: 1*60, inc: 0.5 }) });
      this.game.onPositionChanged = this.updatePosition;
      this.game.onreceive = this.refs.log.push;
    },
    updatePosition: function(pos) {
      this.setState({ position: pos });
    },
    render: function() {
      return React.DOM.div(null,
        Board({ position: this.state.position }),
        EngineLog({ ref: 'log' })
      );
    }
  });

  React.renderComponent(App(), document.body);
});