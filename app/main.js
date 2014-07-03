"use strict";

require(['libs/react-0.10.0.js', 'chessboard', 'engine-connector',
  'gamestate', 'clockview', 'movelist'],
  function(React, Chessboard, Engine, gamestate, ClockView, MoveList) {
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
      this.chessboard.onDragEnd = this.props.onDragEnd;
      this.chessboard.interactive = this.props.interactive;
    },
    componentDidUpdate: function() {
      this.chessboard.position(this.props.position);
      this.chessboard.onDragEnd = this.props.onDragEnd;
      this.chessboard.interactive = this.props.interactive;
      this.chessboard.updateSize();
    },
    render: function() {
      return React.DOM.div({ className: 'board' });
    }
  });

  var App = React.createClass({
    getInitialState: function() {
      return { position: 'start', moves: [], clock: new gamestate.Clock({ time: 3*60, inc: 2 }) };
    },
    componentDidMount: function() {
      this.engine = new Engine();
      this.engine.start();
      this.engine.send('setoption name Skill Level value 1');
      chrome.system.cpu.getInfo(function(info) {
        this.engine.send('setoption name Threads value ' + info.numOfProcessors);
      }.bind(this));
      this.game = new gamestate.Game({ engine: this.engine, clock: this.state.clock});
      this.game.onPositionChanged = this.updatePosition;
      this.game.clock.onChanged = this.updateClock;
      this.game.onreceive = this.refs.log.push;
      this.game.start();
    },
    updatePosition: function(pos, moves) {
      this.setState({ position: pos, moves: moves });
    },
    updateClock: function(clock) {
      this.setState({ clock: clock });
    },
    onDragEnd: function(move) {
      return this.game.move(move);
    },
    render: function() {
      return React.DOM.div({ id: 'main' },
        React.DOM.div({ id: 'board-group' },
          ClockView(this.state.clock.black),
          Board({ position: this.state.position, onDragEnd: this.onDragEnd,
            interactive: this.game && this.game.isHumanTurn() }),
          ClockView(this.state.clock.white)
        ),
        React.DOM.div({ id: 'side-group' },
          EngineLog({ ref: 'log' }),
          MoveList({ moves: this.state.moves })
        )
      );
    }
  });

  React.renderComponent(App(), document.body);
});