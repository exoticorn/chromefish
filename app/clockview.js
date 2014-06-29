"use strict";

define(['libs/react-0.10.0.js'], function(React) {
  return React.createClass({
    componentDidMount: function() { this.update(); },
    componentDidUpdate: function(prevProps) {
      if(prevProps.time !== this.props.time ||
         prevProps.startTime !== this.props.startTime) {
        this.update();
      }
    },
    update: function() {
      if(this.timeout) {
        clearTimeout(this.timeout);
      }
      if(this.props.startTime && this.isMounted()) {
        this.forceUpdate();
        var msLeft = this.props.time + this.props.startTime - Date.now();
        if(msLeft > 0) {
          var timeToNextSecond = (msLeft - 1) % 1000 + 1;
          this.timeout = setTimeout(this.update, timeToNextSecond);
        }
      }
    },
    render: function() {
      var msLeft = this.props.time;
      var cls = 'clock';
      if(this.props.startTime) {
        msLeft = Math.max(0, msLeft + this.props.startTime - Date.now());
        cls += ' running';
      }
      var seconds = Math.ceil(msLeft / 1000);
      var minutes = Math.floor(seconds / 60);
      seconds -= minutes * 60;
      var timeString = ('0' + minutes).slice(-2) + ':' +
        ('0' + seconds).slice(-2);
      if(this.props.flag) {
        timeString += ' F';
      }
      return React.DOM.div({ className: cls }, timeString);
    }
  });
});