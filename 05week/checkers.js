'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// class that assigns the player a symbol
class Checker {
  constructor(color) {
    if (color === 'Red') {
      this.symbol = 'R'
    } else {
      this.symbol = 'B'
    }
  }
}

class Board {
  constructor() {
    // adding an array to count the checker pieces 
    this.checkers = [];
    this.grid = [];

    // method that creates an 8x8 array, filled with null values
    this.createGrid = () => {
      // loop to create the 8 rows
      for (let row = 0; row < 8; row++) {
        this.grid[row] = [];
        // push in 8 columns of nulls
        for (let column = 0; column < 8; column++) {
          this.grid[row].push(null);
        }
      }
    }
    this.viewGrid = () => {
      // add our column numbers
      let string = "  0 1 2 3 4 5 6 7\n";
      for (let row = 0; row < 8; row++) {
        // we start with our row number in our array
        const rowOfCheckers = [row];
        // a loop within a loop
        for (let column = 0; column < 8; column++) {
          // if the location is "truthy" (contains a checker piece, in this case)
          if (this.grid[row][column]) {
            // push the symbol of the check in that location into the array
            rowOfCheckers.push(this.grid[row][column].symbol);
          } else {
            // just push in a blank space
            rowOfCheckers.push(' ');
          }
        }
        // join the rowOfCheckers array to a string, separated by a space
        string += rowOfCheckers.join(' ');
        // add a 'new line'
        string += "\n";
      }
      console.log(string);
    }
    // adding the placements for the red checker pieces on the board
    this.createCheckers = () => {
      const redPosition = [
        [0, 1],
        [0, 3],
        [0, 5],
        [0, 7],
        [1, 0],
        [1, 2],
        [1, 4],
        [1, 6],
        [2, 1],
        [2, 3],
        [2, 5],
        [2, 7]
      ]
      // loop to define the row & column for the red checker pieces
      for (let i = 0; i < 12; i++) {
        let redRow = redPosition[i][0];
        let redColumn = redPosition[i][1];
        // creating a new Checker class for the red pieces        
        let redChecker = new Checker('Red')
        // pushing the redChecker piece count to 'checkers' array
        this.checkers.push(redChecker)
        this.grid[redRow][redColumn] = redChecker;
      }
      // adding the placements for the black checker pieces on the board
      const blackPosition = [
        [5, 0],
        [5, 2],
        [5, 4],
        [5, 6],
        [6, 1],
        [6, 3],
        [6, 5],
        [6, 7],
        [7, 0],
        [7, 2],
        [7, 4],
        [7, 6]
      ]
      // loop to define the row & column for the black checker pieces
      for (let i = 0; i < 12; i++) {
        let blackRow = blackPosition[i][0];
        let blackColumn = blackPosition[i][1];
        // creating a new Checker class for the black pieces
        let blackChecker = new Checker('Black')
        // pushing the blackChecker piece count to 'checkers' array
        this.checkers.push(blackChecker)
        this.grid[blackRow][blackColumn] = blackChecker;
      }
    }
  }
}

class Game {
  constructor() {
    this.board = new Board;
    this.start = () => {
      this.board.createGrid();
      // calling the function to add checkers to board
      this.board.createCheckers();
    }
    // function to move piece based on selected choices
    this.moveChecker = (start, destination) => {
      // calling functions to verify if the selected moves are legal/valid
      if (isLegalInput(start, destination) && isLegalMove(start, destination)) {
        // separating values from the inputs on the game
        const startRow = parseInt(start.charAt(0));
        const startColumn = parseInt(start.charAt(1));
        const destinationRow = parseInt(destination.charAt(0));
        const destinationColumn = parseInt(destination.charAt(1));

        // quick check - tied to the status of the board so decided to include it here
        // 1. verify if the selected 'which piece' actually has a checker
        // 2. verify if the selected 'to where' doesn't already have a checker
        if (this.board.grid[startRow][startColumn] == null || this.board.grid[destinationRow][destinationColumn] != null) {
          console.log("Invalid Move")
          return
        }
        // moving checker from 'which piece' > 'to where' if it passes the above conditions
        this.board.grid[destinationRow][destinationColumn] = this.board.grid[startRow][startColumn];
        // setting the 'which piece' to null b/c the checker was moved
        this.board.grid[startRow][startColumn] = null;
        // Math! 
        // logic to check that the 'which piece' checker is exacty 2 columns away from 'to where' for a jump
        if (Math.abs(destinationRow - startRow) === 2) {
          let jumpedRow;
          let jumpedColumn;
          // logic to find the piece that was jumped
          if (destinationRow - startRow > 0) {
            jumpedRow = startRow + 1;
          } else {
            jumpedRow = destinationRow + 1;
          }
          if (destinationColumn - startColumn > 0) {
            jumpedColumn = startColumn + 1;
          } else {
            jumpedColumn = destinationColumn + 1;
          }
          // logic to set the jumped checker piece to 'null'
          this.board.grid[jumpedRow][jumpedColumn] = null;
          // removes a checker from the total checker count
          this.board.checkers.pop('')
        }
      } else {
        console.log("Invalid Move!")
      }
    }
  }
}
// function that verifies if the selected move is within the parameters of a legal move
const isLegalMove = (start, destination) => {
  // breaking down the individual row & columns
  const startRow = parseInt(start.charAt(0));
  const startColumn = parseInt(start.charAt(1));
  const destinationRow = parseInt(destination.charAt(0));
  const destinationColumn = parseInt(destination.charAt(1));

  // verifying that the move is no more than 2 rows 
  let validRowMove = (Math.abs(destinationRow - startRow) <= 2)
  let validColumnMove = (Math.abs(destinationColumn - startColumn) <= 2)

  // verifying that both the row & column selections are valid
  return (validRowMove && validColumnMove)
}

// function to verify if the selected 'which piece' & 'to where' inputs are a number between 0 - 7
const isLegalInput = (start, destination) => {
  const allInputs = start + destination;
  return allInputs.split('').every(value => value >= 0 && value < 8);
}

function getPrompt() {
  game.board.viewGrid();
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}

const game = new Game();
game.start();

// Tests
if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);
    });
  });

  describe('Game.moveChecker()', () => {
    it('should move a checker', () => {
      assert(!game.board.grid[4][1]);
      game.moveChecker('50', '41');
      assert(game.board.grid[4][1]);
      game.moveChecker('21', '30');
      assert(game.board.grid[3][0]);
      game.moveChecker('52', '43');
      assert(game.board.grid[4][3]);
    });
    it('should be able to jump over and kill another checker', () => {
      game.moveChecker('30', '52');
      assert(game.board.grid[5][2]);
      assert(!game.board.grid[4][1]);
      assert.equal(game.board.checkers.length, 23);
    });
  });
} else {
  getPrompt();
}