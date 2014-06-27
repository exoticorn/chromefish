"use strict";

define(['libs/chess.min.js', 'pieces_8bit', 'pieces_svg'], function(Chess, pieces_8bit, pieces_svg) {
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
    ['wp', 'bp', 'wr', 'br', 'wn', 'bn', 'wb', 'bb', 'wq', 'bq', 'wk', 'bk'].forEach(function(piece) {
      pieces[piece] = document.createElement('canvas');
    });

    var chess = new Chess();
    var pieceState = {};
    var removedPieces = [];

    this.position = function(newPos) {
      if(newPos) {
        chess.load(newPos);
        
        var newPieces = [];
        var oldPieces = {};
        var array, piece;
        for(var y = 0; y < 8; ++y) {
          for(var x = 0; x < 8; ++x) {
            var fieldName = String.fromCharCode(x + 97) + (8 - y);
            piece = chess.get(fieldName);
            var existingPiece = pieceState[fieldName];
            if(piece) {
              piece = piece.color + piece.type;
              if(!existingPiece || existingPiece.type !== piece) {
                if(existingPiece) {
                  array = oldPieces[existingPiece.type] || [];
                  array.push(existingPiece);
                  oldPieces[existingPiece.type] = array;
                }
                newPieces.push({ type: piece, x: x, y: y, fieldName: fieldName });
              }
            } else {
              if(existingPiece) {
                array = oldPieces[existingPiece.type] || [];
                array.push(existingPiece);
                oldPieces[existingPiece.type] = array;
                delete pieceState[fieldName];
              }
            }
          }
        }
        
        var i, j;
        for(i = 0; i < newPieces.length; ++i) {
          piece = newPieces[i];
          var candidates = oldPieces[piece.type];
          if(candidates && candidates.length > 0) {
            var oldPiece = candidates.shift();
            oldPiece.ox = oldPiece.x;
            oldPiece.oy = oldPiece.y;
            oldPiece.x = piece.x;
            oldPiece.y = piece.y;
            oldPiece.fieldName = piece.fieldName;
            piece = oldPiece;
          }
          piece.t = Date.now();
          pieceState[piece.fieldName] = piece;
        }
        
        for(piece in oldPieces) {
          for(i = 0; i < oldPieces[piece].length; ++i) {
            var p = oldPieces[piece][i];
            p.ox = p.x;
            p.oy = p.y;
            delete p.x;
            delete p.y;
            p.t = Date.now();
            removedPieces.push(p);
          }
        }
        
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
        pieces_svg(pieces, size);
        pieceSize = size;
      }
      var ctx = canvas.getContext('2d');

      var x, y;

      for(y = 0; y < 8; ++y) {
        for(x = 0; x < 8; ++x) {
          ctx.fillStyle = (y ^ x) & 1 ? '#d18b47' : '#f8d0a0';
          ctx.fillRect(x * size, y * size, size, size);
        }
      }
      
      var animLeft = false;
      function drawPiece(piece) {
        var t = Math.min(1, (Date.now() - piece.t) * 0.005);
        if(t < 1) {
          animLeft = true;
        }
        var scale = 1;
        if (piece.x === undefined) {
          x = piece.ox;
          y = piece.oy;
          scale = 1 - t*t;
        } else if (piece.ox !== undefined) {
          x = piece.ox * (1-t) + piece.x * t;
          y = piece.oy * (1-t) + piece.y * t;
        } else {
          x = piece.x;
          y = piece.y;
        }
        var img = pieces[piece.type];
        if(img) {
          ctx.drawImage(img,
            x * size + (size - img.width * scale) / 2,
            y * size + (size - img.height * scale) / 2,
            img.width * scale,
            img.height * scale);
        }
        
        return t < 1;
      }

      removedPieces = removedPieces.filter(drawPiece);
      
      for(var field in pieceState) {
        drawPiece(pieceState[field]);
      }
      
      if(animLeft) {
        window.requestAnimationFrame(redraw.bind(this));
      }
    }
  };
});