'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

let playerTurn = 'X';

const printBoard=()=> {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}

// checking all values in each individual array on the board object for matching values
const horizontalWin=(row)=> {
return board[row].every(input => playerTurn.includes(input))
}

// checking the same index in each of the arrays on the board object for matching values
const verticalWin=(row, column)=> {
  if ((board[0][0].includes(playerTurn) && board[1][0].includes(playerTurn) && board[2][0].includes(playerTurn))
   || (board[0][1].includes(playerTurn) && board[1][1].includes(playerTurn) && board[2][1].includes(playerTurn))
   || (board[0][2].includes(playerTurn) && board[1][2].includes(playerTurn) && board[2][2].includes(playerTurn))){
        return true;
  }
}

// checking the first/last arrays first/last index, and middle index of the middle array, for matching values
const diagonalWin=()=> {
  if ((board[0][0].includes(playerTurn) && board[1][1].includes(playerTurn) && board[2][2].includes(playerTurn))
   || (board[0][2].includes(playerTurn) && board[1][1].includes(playerTurn) && board[2][0].includes(playerTurn))){
        return true;
  }
}

// checking if any of the above functions are true to find a winnner
const checkForWin=(row, column)=>{
  if (horizontalWin(row) || verticalWin() || diagonalWin()){
        return true;
  }
}

// switches player from 'X' to 'O'
const switchPlayer=()=>{
  if (playerTurn === 'X'){
    playerTurn = 'O';
  } else {
    playerTurn = 'X';
  }
}

// checks that the player's selected location exists in the board object and is blank
const isValidPick=(row, column)=>{
  if ((row == 0 || row == 1 || row == 2)
  && (column == 0 || column == 1 || column == 2)
  && (board[row][column] === ' ')) {
    return true;
  }
}

const ticTacToe=(row, column)=> {

// if pick is valid, set the row/column to be equal to the playerTurn value
// if not, display that choice is invalid (player can choose again)
  if (isValidPick(row, column)){
    board[row][column] = playerTurn;

// if a player wins, display message they won and the game should be reset
// if not, switch the player
    if (checkForWin(row, column)){
      console.log('Player ' + playerTurn + ' Wins! Reset game to play again.');
    } else {
      switchPlayer();
    }
  } else {
    console.log('Invalid Option! Choose again player ' + playerTurn);
  }
}

function getPrompt() {
  printBoard();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      ticTacToe(row, column);
      getPrompt();
    });
  });

}



// Tests

if (typeof describe === 'function') {

  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [ [' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [ ['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should check for vertical wins', () => {
      board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [ ['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' '] ];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [ ['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X'] ];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      assert.equal(checkForWin(), true);
    });
    it('should detect a valid input', () => {
      board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
      assert.equal(isValidPick(0,0), true);
    });
  });
} else {

  getPrompt();

}
