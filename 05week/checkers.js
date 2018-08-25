'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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
      for (let i = 0; i < 12; i++) {
        let redRow = redPosition[i][0];
        let redColumn = redPosition[i][1];
        let redChecker = new Checker('Red')
        this.checkers.push(redChecker)
        this.grid[redRow][redColumn] = redChecker;
      }
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
      for (let i = 0; i < 12; i++) {
        let blackRow = blackPosition[i][0];
        let blackColumn = blackPosition[i][1];
        let blackChecker = new Checker('Black')
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
      this.board.createCheckers();
    }
    this.moveChecker = (start, destination) => {
      if (isLegalInput(start, destination) && isLegalMove(start, destination)) {
        const startRow = parseInt(start.charAt(0));
        const startColumn = parseInt(start.charAt(1));
        const destinationRow = parseInt(destination.charAt(0));
        const destinationColumn = parseInt(destination.charAt(1));

        if (this.board.grid[startRow][startColumn] == null || this.board.grid[destinationRow][destinationColumn] != null) {
          console.log("Invalid Move")
          return
        }

        this.board.grid[destinationRow][destinationColumn] = this.board.grid[startRow][startColumn];
        this.board.grid[startRow][startColumn] = null;
        if (Math.abs(destinationRow - startRow) === 2) {
          let jumpedRow;
          let jumpedColumn;

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
          this.board.grid[jumpedRow][jumpedColumn] = null;
          this.board.checkers.pop('')
        }
      } else {
        console.log("Invalid Move!")
      }
    }
  }
}

const isLegalMove = (start, destination) => {
  const startRow = parseInt(start.charAt(0));
  const startColumn = parseInt(start.charAt(1));
  const destinationRow = parseInt(destination.charAt(0));
  const destinationColumn = parseInt(destination.charAt(1));

  let validRowMove = (Math.abs(destinationRow - startRow) <= 2)
  let validColumnMove = (Math.abs(destinationColumn - startColumn) <= 2)

  return (validRowMove && validColumnMove)
}

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