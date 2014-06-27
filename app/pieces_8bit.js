"use strict";

define(function() {
  return function(pieces, size) {
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
        "# # # #",
        "# # # #",
        " # # #",
        " #####",
        "  ###",
        " #####",
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
        "  # #",
        " #   #",
        " ## ##",
        "  ###",
        "   #",
        " #####"
      ],
      n: [
        "   #",
        "  ###",
        " ## ##",
        "    ##",
        "   ###",
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
        var canvas = pieces[name];
        canvas.width = size;
        canvas.height = size;
        var ctx = canvas.getContext('2d');

        for(var pass = 0; pass < 2; ++pass) {
          ctx.fillStyle = (color ^ pass) ? '#000' : '#fff';
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
});
