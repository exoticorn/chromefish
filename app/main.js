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
      return React.DOM.div({ style: { width: 400, height: 400 } });
    }
  });

  var App = React.createClass({
    getInitialState: function() {
      return { position: 'start' };
    },
    componentDidMount: function() {
      this.engine = new Engine();
      this.game = new gamestate.Game({ engine: this.engine });
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