"use strict";

// Path data by Colin M.L. Burnett
// CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0/)
// From the SVGs at http://en.wikipedia.org/wiki/Chess_piece

// slightly tweaked to simplify rendering on canvas by converting arcs commands to circles

define(function() {
  return function(pieces, size) {
    var gfx = {
      bk: {
        lineWidth: 1.5, lineCap: 'round', lineJoin: 'round',
        paths: [
          {
            stroke: '#000', lineJoin: 'miter',
            d: "M 22.5,11.63 L 22.5,6"
          }, {
            fill: '#000', stroke: '#000', lineJoin: 'miter', lineCap: 'butt',
            d: "M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25"
          }, {
            fill: '#000', stroke: '#000',
            d: "M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z "
          }, {
            stroke: '#000', lineJoin: 'miter',
            d: "M 20,8 L 25,8"
          }, {
            stroke: '#fff',
            d: "M 32,29.5 C 32,29.5 40.5,25.5 38.03,19.85 C 34.15,14 25,18 22.5,24.5 L 22.51,26.6 L 22.5,24.5 C 20,18 9.906,14 6.997,19.85 C 4.5,25.5 11.85,28.85 11.85,28.85"
          }, {
            stroke: '#fff',
            d: "M 11.5,30 C 17,27 27,27 32.5,30 M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5 M 11.5,37 C 17,34 27,34 32.5,37"
          }
        ]
      },
      wk: {
        lineWidth: 1.5, lineCap: 'round', lineJoin: 'round',
        paths: [
          {
            stroke: '#000', lineJoin: 'miter',
            d: "M 22.5,11.63 L 22.5,6"
          }, {
            stroke: '#000', lineJoin: 'miter',
            d: "M 20,8 L 25,8"
          }, {
            stroke: '#000', fill: '#fff', lineCap: 'butt', lineJoin: 'miter',
            d: "M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25"
          }, {
            fill: '#fff', stroke: '#000',
            d: "M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z "
          }, {
            stroke: '#000',
            d: "M 11.5,30 C 17,27 27,27 32.5,30"
          }, {
            stroke: '#000',
            d: "M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5"
          }, {
            stroke: '#000',
            d: "M 11.5,37 C 17,34 27,34 32.5,37"
          }
        ]
      },
      bq: {
        lineWidth: 1.5, lineCap: 'round', lineJoin: 'round',
        paths: [
          {
            fill: '#000',
            circles: [
              { x: 6, y: 12, r: 2.75 },
              { x: 14, y: 9, r: 2.75 },
              { x: 22.5, y: 8, r: 2.75 },
              { x: 31, y: 9, r: 2.75 },
              { x: 39, y: 12, r: 2.75 }
            ]
          }, {
            lineCap: 'butt', stroke: '#000', fill: '#000',
            d: "M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z"
          }, {
            lineCap: 'butt', stroke: '#000', fill: '#000',
            d: "M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z"
          }, {
            lineCap: 'butt', stroke: '#000',
            d: "M 11,38.5 A 35,35 1 0 0 34,38.5"
          }, {
            stroke: '#fff',
            d: "M 11,29 A 35,35 1 0 1 34,29"
          }, {
            stroke: '#fff',
            d: "M 12.5,31.5 L 32.5,31.5"
          }, {
            stroke: '#fff',
            d: "M 11.5,34.5 A 35,35 1 0 0 33.5,34.5"
          }, {
            stroke: '#fff',
            d: "M 10.5,37.5 A 35,35 1 0 0 34.5,37.5"
          }
        ]
      },
      wq: {
        lineWidth: 1.5, lineCap: 'round', lineJoin: 'round',
        paths: [
          {
            fill: '#fff', stroke: '#000',
            circles: [
              { x: 6, y: 12, r: 2 },
              { x: 14, y: 9, r: 2 },
              { x: 22.5, y: 8, r: 2 },
              { x: 31, y: 9, r: 2 },
              { x: 39, y: 12, r: 2 }
            ]
          }, {
            lineCap: 'butt', fill: '#fff', stroke: '#000',
            d: "M 9,26 C 17.5,24.5 30,24.5 36,26 L 38,14 L 31,25 L 31,11 L 25.5,24.5 L 22.5,9.5 L 19.5,24.5 L 14,10.5 L 14,25 L 7,14 L 9,26 z "
          }, {
            lineCap: 'butt', fill: '#fff', stroke: '#000',
            d: "M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z "
          }, {
            stroke: '#000',
            d: "M 11.5,30 C 15,29 30,29 33.5,30"
          }, {
            stroke: '#000',
            d: "M 12,33.5 C 18,32.5 27,32.5 33,33.5"
          }
        ]
      },
      br: {
        lineWidth: 1.5, lineCap: 'round', lineJoin: 'round',
        paths: [
          {
            lineCap: 'butt', fill: '#000', stroke: '#000',
            d: "M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z "
          }, {
            lineCap: 'butt', fill: '#000', stroke: '#000',
            d: "M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z "
          }, {
            lineCap: 'butt', fill: '#000', stroke: '#000',
            d: "M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "
          }, {
            lineCap: 'butt', lineJoin: 'miter', fill: '#000', stroke: '#000',
            d: "M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z "
          }, {
            lineCap: 'butt', fill: '#000', stroke: '#000',
            d: "M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z "
          }, {
            lineCap: 'butt', fill: '#000', stroke: '#000',
            d: "M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z "
          }, {
            stroke: '#fff', lineWidth: 1, lineJoin: 'miter',
            d: "M 12,35.5 L 33,35.5 L 33,35.5"
          }, {
            stroke: '#fff', lineWidth: 1, lineJoin: 'miter',
            d: "M 13,31.5 L 32,31.5"
          }, {
            stroke: '#fff', lineWidth: 1, lineJoin: 'miter',
            d: "M 14,29.5 L 31,29.5"
          }, {
            stroke: '#fff', lineWidth: 1, lineJoin: 'miter',
            d: "M 14,16.5 L 31,16.5"
          }, {
            stroke: '#fff', lineWidth: 1, lineJoin: 'miter',
            d: "M 11,14 L 34,14"
          }
        ]
      },
      wr: {
        lineWidth: 1.5, lineCap: 'round', lineJoin: 'round',
        paths: [
          {
            lineCap: 'butt', fill: '#fff', stroke: '#000',
            d: "M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z "
          }, {
            lineCap: 'butt', fill: '#fff', stroke: '#000',
            d: "M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "
          }, {
            lineCap: 'butt', fill: '#fff', stroke: '#000',
            d: "M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14"
          }, {
            fill: '#fff', stroke: '#000',
            d: "M 34,14 L 31,17 L 14,17 L 11,14"
          }, {
            lineCap: 'butt', lineJoin: 'miter', fill: '#fff', stroke: '#000',
            d: "M 31,17 L 31,29.5 L 14,29.5 L 14,17"
          }, {
            fill: '#fff', stroke: '#000',
            d: "M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5"
          }, {
            lineJoin: 'miter', stroke: '#000',
            d: "M 11,14 L 34,14"
          }
        ]
      },
      bb: {
        lineWidth: 1.5, lineCap: 'round', lineJoin: 'round',
        paths: [
          {
            lineCap: 'butt', fill: '#000', stroke: '#000',
            d: "M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z"
          }, {
            lineCap: 'butt', fill: '#000', stroke: '#000',
            d: "M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z"
          }, {
            lineCap: 'butt', fill: '#000', stroke: '#000',
            circles: [{ x: 22.5, y: 8, r: 2.5 }]
          }, {
            lineJoin: 'miter', stroke: '#fff',
            d: "M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18"
          }
        ]
      },
      wb: {
        lineWidth: 1.5, lineCap: 'round', lineJoin: 'round',
        paths: [
          {
            lineCap: 'butt', fill: '#fff', stroke: '#000',
            d: "M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z"
          }, {
            lineCap: 'butt', fill: '#fff', stroke: '#000',
            d: "M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z"
          }, {
            lineCap: 'butt', fill: '#fff', stroke: '#000',
            circles: [{ x: 22.5, y: 8, r: 2.5 }]
          }, {
            lineJoin: 'miter', stroke: '#000',
            d: "M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18"
          }
        ]
      },
      bn: {
        lineWidth: 1.5, lineCap: 'round', lineJoin: 'round',
        paths: [
          {
            fill: '#000', stroke: '#000',
            d: "M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"
          }, {
            fill: '#000', stroke: '#000',
            d: "M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"
          }, {
            fill: '#fff', stroke: '#fff',
            circles: [{ x: 9, y: 25.5, r: 0.5 }]
          }, {
            fill: '#fff', stroke: '#fff', lineWidth: 1.25,
            transform: [0.866,0.5,-0.5,0.866,9.693,-5.173],
            circles: [{ x: 14.5, y: 15.5, rx: 0.5, ry: 1.5 }]
          }, {
            fill: '#fff',
            d: "M 24.55,10.4 L 24.1,11.85 L 24.6,12 C 27.75,13 30.25,14.49 32.5,18.75 C 34.75,23.01 35.75,29.06 35.25,39 L 35.2,39.5 L 37.45,39.5 L 37.5,39 C 38,28.94 36.62,22.15 34.25,17.66 C 31.88,13.17 28.46,11.02 25.06,10.5 L 24.55,10.4 z "
          }
        ]
      },
      wn: {
        lineWidth: 1.5, lineCap: 'round', lineJoin: 'round',
        paths: [
          {
            fill: '#fff', stroke: '#000',
            d: "M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"
          }, {
            fill: '#fff', stroke: '#000',
            d: "M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"
          }, {
            fill: '#000', stroke: '#000',
            circles: [{ x: 9, y: 25.5, r: 0.5 }]
          }, {
            fill: '#000', stroke: '#000', lineWidth: 1.25,
            transform: [0.866,0.5,-0.5,0.866,9.693,-5.173],
            circles: [{ x: 14.5, y: 15.5, rx: 0.5, ry: 1.5 }]
          }
        ]
      },
      bp: {
        lineWidth: 1.5, lineCap: 'round', lineJoin: 'miter',
        paths: [
          {
            fill: '#000', stroke: '#000',
            d: "M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z "
          }
        ]
      },
      wp: {
        lineWidth: 1.5, lineCap: 'round', lineJoin: 'miter',
        paths: [
          {
            fill: '#fff', stroke: '#000',
            d: "M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z "
          }
        ]
      }
    };
    
    function coords(cmds) {
      var c = cmds.shift().split(',');
      return { x: parseFloat(c[0]), y: parseFloat(c[1]) };
    }
    
    for(var name in pieces) {
      var g = gfx[name];
      if(!g) {
        continue;
      }
      
      var canvas = pieces[name];
      canvas.width = size;
      canvas.height = size;
      var ctx = canvas.getContext('2d');
      ctx.scale(size / 45, size / 45);
      for(var i = 0; i < g.paths.length; ++i) {
        var path = g.paths[i];
        ctx.lineWidth = path.lineWidth || g.lineWidth || 1;
        ctx.lineJoin = path.lineJoin || g.lineJoin || 'miter';
        ctx.lineCap = path.lineCap || g.lineCap || 'butt';
        if(path.transform) {
          ctx.save();
          ctx.transform.apply(ctx, path.transform);
        }
        ctx.beginPath();
        if(path.d) {
          var cmds = path.d.split(' ');
          var c1, c2, c3;
          var current;
          while(cmds.length > 0) {
            switch(cmds.shift()) {
              case 'M':
                current = c1 = coords(cmds);
                ctx.moveTo(c1.x, c1.y);
                break;
              case 'L':
                current = c1 = coords(cmds);
                ctx.lineTo(c1.x, c1.y);
                break;
              case 'C':
                c1 = coords(cmds);
                c2 = coords(cmds);
                current = c3 = coords(cmds);
                ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, c3.x, c3.y);
                break;
              case 'A':
                // hacky aproximation, just for black queen
                c1 = coords(cmds);
                cmds.shift(); // ignore rotation
                cmds.shift(); // ignore large-arc-flag
                var sign = cmds.shift() === '0' ? 1 : -1;
                c2 = coords(cmds);
                ctx.quadraticCurveTo(
                  (c2.x + current.x) / 2,
                  (c2.y + current.y) / 2 + c1.y / 10 * sign,
                  c2.x, c2.y);
                current = c2;
                break;
              case 'z':
                ctx.closePath();
                break;
            }
          }
        }
        if(path.circles) {
          for(var j = 0; j < path.circles.length; ++j) {
            var c = path.circles[j];
            if(c.rx) {
              ctx.save();
              ctx.translate(c.x, c.y);
              var r = Math.max(c.rx, c.ry);
              ctx.scale(c.rx / r, c.ry / r);
              ctx.moveTo(r, 0);
              ctx.arc(0, 0, r, 0, 2*Math.PI);
              ctx.restore();
            } else {
              ctx.moveTo(c.x + c.r, c.y);
              ctx.arc(c.x, c.y, c.r, 0, 2*Math.PI);
            }
          }
        }
        if(path.fill) {
          ctx.fillStyle = path.fill;
          ctx.fill();
        }
        if(path.stroke) {
          ctx.strokeStyle = path.stroke;
          ctx.stroke();
        }
        if(path.transform) {
          ctx.restore();
        }
      }
    }
  };
});