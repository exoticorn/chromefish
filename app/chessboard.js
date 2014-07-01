"use strict";

define(['libs/chess.min.js', 'pieces_8bit', 'pieces_svg'], function(Chess, pieces_8bit, pieces_svg) {
  return function(div) {
    var canvas = document.createElement('canvas');
    canvas.style.csstext = 'margin: 0; padding: 0';
    div.appendChild(canvas);

    this.updateSize = function() {
      if(this.parentWidth !== div.clientWidth || this.parentHeight !== div.clientHeight) {
        this.parentWidth = div.clientWidth;
        this.parentHeight = div.clientHeight;
        var size = Math.floor(Math.min(div.clientWidth, div.clientHeight) / 8) * 8;
        canvas.width = size;
        canvas.height = size;
        redraw();
        return true;
      }
      return false;
    };

    var tileSize = 0;
    var pieces = {};
    ['wp', 'bp', 'wr', 'br', 'wn', 'bn', 'wb', 'bb', 'wq', 'bq', 'wk', 'bk'].forEach(function(piece) {
      pieces[piece] = document.createElement('canvas');
    });

    var chess = new Chess();
    var pieceState = {};
    var removedPieces = [];
    var draggedPiece = undefined;

    this.position = function(newPos) {
      if(newPos) {
        cancelDrag();
        chess.load(newPos);

        var newPieces = [];
        var oldPieces = {};
        var array, piece;
        for(var y = 0; y < 8; ++y) {
          for(var x = 0; x < 8; ++x) {
            var square = String.fromCharCode(x + 97) + (8 - y);
            piece = chess.get(square);
            var existingPiece = pieceState[square];
            if(piece) {
              piece = piece.color + piece.type;
              if(!existingPiece || existingPiece.type !== piece) {
                if(existingPiece) {
                  array = oldPieces[existingPiece.type] || [];
                  array.push(existingPiece);
                  oldPieces[existingPiece.type] = array;
                }
                newPieces.push({ type: piece, x: x, y: y, square: square });
              }
            } else {
              if(existingPiece) {
                array = oldPieces[existingPiece.type] || [];
                array.push(existingPiece);
                oldPieces[existingPiece.type] = array;
                delete pieceState[square];
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
            oldPiece.square = piece.square;
            piece = oldPiece;
          }
          piece.t = Date.now();
          pieceState[piece.square] = piece;
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

        scheduleRedraw();
      }
      return chess.fen();
    };

    if(!this.updateSize()) {
      redraw();
    }

    function scheduleRedraw() {
      requestAnimationFrame(redraw.bind(this));
    }

    function redraw() {
      canvas.width = canvas.width;
      var size = Math.floor(Math.min(canvas.width, canvas.height) / 8);
      if(size !== tileSize) {
        pieces_svg(pieces, size);
        tileSize = size;
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
          scale = t;
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

      for(var square in pieceState) {
        var piece = pieceState[square];
        if(piece !== draggedPiece) {
          drawPiece(pieceState[square]);
        }
      }

      if(draggedPiece) {
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowOffsetX = size / 10;
        ctx.shadowOffsetY = size / 10;
        drawPiece(draggedPiece);
        ctx.restore();
      }

      if(animLeft) {
        window.requestAnimationFrame(redraw.bind(this));
      }
    }

    function toBoardPos(event) {
      return {
        x: event.layerX / tileSize,
        y: event.layerY / tileSize
      };
    }

    function posToSquare(pos) {
      return String.fromCharCode(Math.floor(pos.x) + 97) +
        (8 - Math.floor(pos.y));
    }

    function cancelDrag() {
      if(draggedPiece) {
        draggedPiece.x = draggedPiece.ox;
        draggedPiece.y = draggedPiece.oy;
        draggedPiece = undefined;
        scheduleRedraw();
      }
    }

    canvas.onmousedown = function(event) {
      if(draggedPiece || !this.interactive) {
        return;
      }
      var pos = toBoardPos(event);
      var square = posToSquare(pos);
      var piece = chess.get(square);
      if(piece && piece.color === chess.turn()) {
        piece = pieceState[square];
        if(piece) {
          draggedPiece = piece;
          piece.t = 1;
          piece.ox = piece.x;
          piece.oy = piece.y;
          scheduleRedraw();
        }
      }
    }.bind(this);

    canvas.onmouseup = function(event) {
      if(!draggedPiece) {
        return;
      }
      var pos = toBoardPos(event);
      var square = posToSquare(pos);
      var piece = draggedPiece;
      if(this.onDragEnd) {
        draggedPiece = undefined;
        var accept = this.onDragEnd({ from: piece.square, to: square, promotion: 'q' });
        if(!accept) {
          piece.x = piece.ox;
          piece.y = piece.oy;
          scheduleRedraw();
        }
      } else {
        cancelDrag();
      }
    }.bind(this);

    canvas.onmousemove = function(event) {
      var pos = toBoardPos(event);
      if(draggedPiece) {
        draggedPiece.x = pos.x - 0.5;
        draggedPiece.y = pos.y - 0.5;
        scheduleRedraw();
      } else {
        var piece = chess.get(posToSquare(pos));
        if(piece && piece.color === chess.turn() && this.interactive) {
          canvas.style.setProperty('cursor', 'pointer');
        } else {
          canvas.style.removeProperty('cursor');
        }
      }
    }.bind(this);
  };
});