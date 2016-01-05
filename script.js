$(document).ready(function(){

  function GameBoard(numberOfSquares, offsetSnake){
    var self = this;
    this.numberOfSquares = numberOfSquares;
    this.initialize = function() {
      for(var i = 0; i < self.numberOfSquares; i++){
        $('#game-container').append('<div id="square-'+i+'"class="one-square"></div>');
      }

      var randomInt = Math.floor(Math.random() * (303 - offsetSnake) + 5);
      $('#square-'+randomInt).css('background-color', 'red');
    };
  }

  function Snake(length) {
    var self = this;
    this.length = length;
    this.initialize = function() {
      for(var x = 0; x < self.length; x++) {
        $('#square-'+x).css('background-color', 'black');
      }
    };
    this.moveRight = function() {

    };
    this.moveLeft = function() {

    };
    this.moveUp = function() {

    };
    this.moveDown = function() {

    };
  }

  var snake = new Snake(5);
  var board = new GameBoard(304, snake.length);
  board.initialize();
  snake.initialize();

});
