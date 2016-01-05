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
    this.occupiedArray = [];
    this.direction = 'right';
    this.gameOn = false;
    this.speed = 133;
    this.canChangeDirection = true;
    this.points = 0;
    this.initialize = function() {
      for(var x = self.length - 1; x >= 0; x--) {
        $('#square-'+x).css('background-color', 'black');
        self.occupiedArray.push([x, 0]);
      }
      console.log(self.occupiedArray);
    };
    this.startGame = function() {
      self.gameOn = true;
      self.repeatMove();
    };
    this.repeatMove = function() {
      if(self.gameOn) {
        switch (self.direction) {
          case 'right':
            self.moveRight();
            break;
          case 'left':
            self.moveLeft();
            break;
          case 'up':
            self.moveUp();
            break;
          case 'down':
            self.moveDown();
            break;
          default:
            self.moveRight();
        }
        setTimeout(self.repeatMove, self.speed);
      }
    };
    this.changeDirection = function(direction){
      if(self.canChangeDirection === false){
        return;
      }
      self.canChangeDirection = false;
      self.direction = direction;
    };
    this.moveRight = function() {
      console.log('moveRight');
      var cubeToUncolor = self.occupiedArray.pop();
      var cubeToColor = [(self.occupiedArray[0][0] + 1), self.occupiedArray[0][1]];
      if((self.occupiedArray[0][0] + 1) > 15) {
        self.gameOver();
        return;
      }
      self.occupiedArray.unshift(cubeToColor);
      self.colorCube(cubeToColor);
      self.uncolorCube(cubeToUncolor);
    };
    this.moveLeft = function() {
      console.log('move left');
      var cubeToUncolor = self.occupiedArray.pop();
      var cubeToColor = [(self.occupiedArray[0][0] - 1), self.occupiedArray[0][1]];
      if((self.occupiedArray[0][0] - 1) < 0) {
        self.gameOver();
        return;
      }
      self.occupiedArray.unshift(cubeToColor);
      self.colorCube(cubeToColor);
      self.uncolorCube(cubeToUncolor);
    };
    this.moveUp = function() {
      console.log('move up');
      var cubeToUncolor = self.occupiedArray.pop();
      var cubeToColor = [self.occupiedArray[0][0], (self.occupiedArray[0][1] - 1)];
      if((self.occupiedArray[0][1] + 1) < 0) {
        self.gameOver();
        return;
      }
      self.occupiedArray.unshift(cubeToColor);
      self.colorCube(cubeToColor);
      self.uncolorCube(cubeToUncolor);
    };
    this.moveDown = function() {
      console.log('move down');
      var cubeToUncolor = self.occupiedArray.pop();
      var cubeToColor = [self.occupiedArray[0][0], (self.occupiedArray[0][1] + 1)];
      if((self.occupiedArray[0][1] + 1) > 18) {
        self.gameOver();
        return;
      }
      self.occupiedArray.unshift(cubeToColor);
      self.colorCube(cubeToColor);
      self.uncolorCube(cubeToUncolor);
    };
    this.gameOver = function() {
      self.gameOn = false;
      console.log('game over');
    };
    this.colorCube = function(squareLocation) {
      var squareNumber = (squareLocation[1] * 16) + squareLocation[0];
      var currentColor = $('#square-'+squareNumber).css('background-color');
      if(currentColor === 'rgb(0, 0, 0)') {
        self.gameOver();
        return;
      }
      if(currentColor === 'rgb(255, 0, 0)') {
        self.ateWorm(squareLocation);
      }
      $('#square-'+squareNumber).css('background-color', 'black');
    };
    this.uncolorCube = function(squareLocation) {
      var squareNumber = (squareLocation[1] * 16) + squareLocation[0];
      $('#square-'+squareNumber).css('background-color', 'white');
      self.canChangeDirection = true;
    };
    this.ateWorm = function(){
      self.points++;
      $('#points').html(self.points);
      var randomInt = Math.floor(Math.random() * (304) + 1);
      var checkSquare = $('#square-'+randomInt).css('background-color');
      while(checkSquare === 'rgb(255, 0, 0)'){
        randomInt = Math.floor(Math.random() * (304) + 1);
        checkSquare = $('#square-'+randomInt).css('background-color');
      }
      $('#square-'+randomInt).css('background-color', 'red');
    };
  }

  var snake = new Snake(5);
  var board = new GameBoard(304, snake.length);
  board.initialize();
  snake.initialize();

  $("body").keydown(function(e) {
    if(e.keyCode == 37) { // left
      if(snake.direction === 'right'){
        console.log("I'm afraid I can't do that Dave");
      }
      else {
        snake.changeDirection('left');
      }
    }
    else if(e.keyCode == 38) { // up
      if(snake.direction === 'down'){
        console.log("I'm afraid I can't do that Dave");
      }
      else {
        snake.changeDirection('up');
      }
    }
    else if(e.keyCode == 39) { // right
      if(snake.direction === 'left'){
        console.log("I'm afraid I can't do that Dave");
      }
      else {
        snake.changeDirection('right');
      }
    }
    else if(e.keyCode == 40) { // down
      if(snake.direction === 'up'){
        console.log("I'm afraid I can't do that Dave");
      }
      else {
        snake.changeDirection('down');
      }
    }

  });

  $('#start-button').click(function() {
    snake.startGame();
  });

});
