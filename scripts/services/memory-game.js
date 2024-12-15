"use strict";

(function () {
  /* @ngInject */
  function memoryGameFactory() {
    function Tile(title) {
      this.title = title;
      this.flipped = false;
    }

    Tile.prototype.flip = function () {
      this.flipped = !this.flipped;
    };

    function makeGrid(tileNames) {
      var tileDeck = [];
      tileNames.forEach(function (name) {
        tileDeck.push(new Tile(name));
        tileDeck.push(new Tile(name));
      });

      var gridDimension = Math.sqrt(tileDeck.length),
        grid = [];

      for (var row = 0; row < gridDimension; row++) {
        grid[row] = [];
        for (var col = 0; col < gridDimension; col++) {
          var i = Math.floor(Math.random() * tileDeck.length);
          grid[row][col] = tileDeck.splice(i, 1)[0];
        }
      }

      return grid;
    }

    function MemoryGame(tileNames) {
      var currentPair = [];
      this.grid = makeGrid(tileNames);
      this.message = "Click on a tile.";
      this.unmatchedPairs = tileNames.length;

      function hideUnmatchedPairIfNeeded() {
        if (currentPair.length === 2) {
          currentPair[0].flip();
          currentPair[1].flip();
          currentPair = [];
        }
      }

      this.flipTile = function (tile) {
        if (tile.flipped) {
          return;
        }

        hideUnmatchedPairIfNeeded();
        tile.flip();
        currentPair.push(tile);

        if (currentPair.length === 1) {
          this.message = "Pick one more card.";
        } else if (currentPair[0].title !== currentPair[1].title) {
          this.message = "Try again.";
        } else {
          this.unmatchedPairs--;
          this.message =
            this.unmatchedPairs > 0 ? "Good job! Keep going." : "You win!";
          currentPair = [];
        }
      };
    }

    return MemoryGame;
  }

  angular
    .module("angularMemoryGameApp")
    .factory("MemoryGame", memoryGameFactory);
})();
