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

const horizontalWin=()=> {
  // Your code here
  if ((board[0][0].includes(playerTurn) && board[0][1].includes(playerTurn) && board[0][2].includes(playerTurn))
   || (board[1][0].includes(playerTurn) && board[1][1].includes(playerTurn) && board[1][2].includes(playerTurn))
   || (board[2][0].includes(playerTurn) && board[2][1].includes(playerTurn) && board[2][2].includes(playerTurn))){
        return true
  }
}

const verticalWin=()=> {
  // Your code here
  if ((board[0][0].includes(playerTurn) && board[1][0].includes(playerTurn) && board[2][0].includes(playerTurn))
   || (board[0][1].includes(playerTurn) && board[1][1].includes(playerTurn) && board[2][1].includes(playerTurn))
   || (board[0][2].includes(playerTurn) && board[1][2].includes(playerTurn) && board[2][2].includes(playerTurn))){
        return true
  }
}

const diagonalWin=()=> {
  // Your code here
  if ((board[0][0].includes(playerTurn) && board[1][1].includes(playerTurn) && board[2][2].includes(playerTurn))
   || (board[0][2].includes(playerTurn) && board[1][1].includes(playerTurn) && board[2][0].includes(playerTurn))){
        return true
  }
}

const checkForWin=()=>{
  // Your code here
  if (horizontalWin() || verticalWin() || diagonalWin()){
        return true
  }
}

// note: I can't get this validation to work :/

// const isValidPick=(row, column)=>{
//   if ((row === 0 || row === 1 || row === 2)
//    && (column === 0 || column === 1 || column === 2)
//    && (board[row][column] === ' ')) {
//     return true
//   }
// }

const ticTacToe=(row, column)=> {
// Your code here

  // note: input validation from isValidPick function still doesn't work when extracted from the function
  // note: I'm just going to skip validation for now

  // if ((row === 0 || row === 1 || row === 2)
  //  && (column === 0 || column === 1 || column === 2)
  //  && (board[row][column] === ' ')) {
  //    board[row][column] = playerTurn
  // }

  board[row][column] = playerTurn

  if (playerTurn === 'X'){
    playerTurn = 'O'
  } else {
    playerTurn = 'X'
  }

  // note: the code below works in repl.it but not in here
  // https://repl.it/@mlukso/ticTacToe-2

  //   if (isValidPick(row, column)){
  //     board[row][column] = playerTurn
  //   } else {
  //     return 'Please pick a valid location player ' + playerTurn
  //   }
  //
  //   if (checkForWin()){
  //       return 'Player ' + playerTurn + ' Wins!'
  //   } else if (playerTurn === 'X'){
  //       playerTurn = 'O'
  //   } else {
  //       playerTurn = 'X'
  //   }
  // }
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
  });
} else {

  getPrompt();

}
