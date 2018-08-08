'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = 'abcd';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function printBoard() {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

// generates a random string and sets that to solution
function generateSolution() {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

// returns a random number to generate solution
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


function generateHint(solution, guess) {
  // your code here
  let solutionArray = solution.split('');
  let guessArray = guess.split('');

  let correctLetterLocations = 0;
  solutionsArray.forEach(letter, i +>{
    solutionsArray[i] == guessArray[i]
    correctLetterLocations++;
    solutionArray[]
  })
}


function mastermind(guess) {
  // solution = 'abcd'; // Comment this out to generate a random solution

  if(guess === solution){
    console.log('You guessed it!')
    return
  }

}


function getPrompt() {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}
