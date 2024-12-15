"use strict";

(function () {
  /* @ngInject */
  function GameController(MemoryGame) {
    var tileNames = [
      "8-ball",
      "kronos",
      "baked-potato",
      "dinosaur",
      "rocket",
      "skinny-unicorn",
      "that-guy",
      "zeppelin",
    ];

    this.game = new MemoryGame(tileNames);
  }

  angular
    .module("angularMemoryGameApp")
    .controller("GameController", GameController);
})();
