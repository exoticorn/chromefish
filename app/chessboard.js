define(['libs/chess.min.js'], function(Chess) {
  return function(div) {
    var canvas = document.createElement('canvas');
    canvas.style.csstext = 'margin: 0; padding: 0';
    div.appendChild(canvas);

    this.updateSize = function() {
      if(canvas.width !== div.clientWidth || canvas.height !== div.clientHeight) {
        canvas.width = div.clientWidth;
        canvas.height = div.clientHeight;
        redraw();
        return true;
      }
      return false;
    };

    var pieceSize = 0;
    var pieces = {};

    var chess = new Chess();

    this.position = function(newPos) {
      if(newPos) {
        chess.load(newPos);
        window.requestAnimationFrame(redraw.bind(this));
      }
      return chess.fen();
    };

    if(!this.updateSize()) {
      redraw();
    }

    function redraw() {
      canvas.width = canvas.width;
      var size = Math.floor(Math.min(canvas.width, canvas.height) / 8);
      if(size !== pieceSize) {
        createPieces(size);
        pieceSize = size;
      }
      var ctx = canvas.getContext('2d');

      var x, y;

      for(y = 0; y < 8; ++y) {
        for(x = 0; x < 8; ++x) {
          ctx.fillStyle = (y ^ x) & 1 ? '#ccc' : '#888';
          ctx.fillRect(x * size, y * size, size, size);
        }
      }

      for(y = 0; y < 8; ++y) {
        for(x = 0; x < 8; ++x) {
          var piece = chess.get(String.fromCharCode(x + 97) + (8 - y));
          if(piece) {
            var img = pieces[piece.color + piece.type];
            if(img) {
              ctx.drawImage(img,
                x * size + (size - img.width) / 2,
                y * size + (size - img.height) / 2);
            }
          }
        }
      }
    }

    function createPieces(size) {
      var data = {
        p: [
          "   #",
          "  ###",
          "   #",
          "  ###",
          "  ###",
        ],
        k: [
          " # # #",
          "# ### #",
          "#  #  #",
          " #####",
          "  ###",
          " #####",
          " #####"
        ],
        q: [
          "# ### #",
          "#  #  #",
          "#  #  #",
          "#######",
          " # # # ",
          " ##### ",
          " #####"
        ],
        r: [
          " # # #",
          " # # #",
          " #####",
          " #####",
          " #####",
          " #####",
        ],
        b: [
          "   #",
          "  ###",
          "  ###",
          "   #",
          "  ###",
          " #####",
          " #####"
        ],
        n: [
          "   #",
          "  ###",
          " ## ##",
          "    ##",
          "    ##",
          "  ###",
          " #####"
        ]
      };

      size = Math.floor(size * 0.9);
      var psize = size / 7 * 0.85;
      var offset = (size - psize * 7) / 2;
      for(var color = 0; color < 2; ++color) {
        for(var piece in data) {
          var d = data[piece];
          var name = (color ? 'w' : 'b') + piece;
          var canvas = pieces[name] || document.createElement('canvas');
          canvas.width = size;
          canvas.height = size;
          pieces[name] = canvas;
          var ctx = canvas.getContext('2d');

          for(var pass = 0; pass < 2; ++pass) {
            ctx.fillStyle = (color ^ pass) ? '#fff' : '#000';
            var e = pass ? psize * 0 : psize * 0.3;
            for(var y = 7 - d.length; y < 7; ++y) {
              var line = d[y - 7 + d.length];
              for(var x = 0; x < line.length; ++x) {
                if(line.charCodeAt(x) != 32) {
                  ctx.fillRect(offset + x * psize - e, offset + y * psize - e,
                    psize + e * 2, psize + e * 2);
                }
              }
            }
          }
        }
      }
    }
  };
});