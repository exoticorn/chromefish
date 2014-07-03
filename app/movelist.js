"use strict";

define(['libs/react-0.10.0.js'], function(React) {
  return React.createClass({
    componentDidUpdate: function(prevProps) {
      if(prevProps.moves.length < this.props.moves.length) {
        this.refs.last.getDOMNode().scrollIntoView(false);
      }
    },
    render: function() {
      var moves = this.props.moves;
      var rows = [];
      function last(i) {
        return i === moves.length - 1 ? { ref: 'last' } : null;
      }
      for(var i = 0; i < moves.length; i += 2) {
        var children = [
          React.DOM.td(null, (i / 2) + 1 + '.'),
          React.DOM.td(last(i), moves[i])];
        if(moves[i+1]) {
          children.push(React.DOM.td(last(i+1), moves[i + 1]));
        }
        rows.push(React.DOM.tr(null, children));
      }
      return React.DOM.div({ className: 'move-list' },
        React.DOM.table(null, rows)
      );
    }
  });
});