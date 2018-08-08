'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

// user enters a guess, need to check if it matches the solution
// if it matches return they've guessed it, otherwise we need to tell them to guess again
// we also need to tell the user how many letters from their guess are in the correct location and/or are in the answer but wrong location
// after 10 tries, the game over and we tell the user

// function to print the board aka guesses
const printBoard=() => {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

// generates a random solution to use for each game
const generateSolution=() => {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

// called by the generateSolution function to get a random order or letters
const getRandomInt=(min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

// function that checks the guess and solution for matches
// checks if there are any letters in the guess in the correct location in the solution
// checks if there are any letters in the guess but not in the correct location
// returns both determined values
const generateHint=(solution, guess) =>{

  let solutionArray = solution.split('');
  let guessArray = guess.split('');

  let correctLetterLocations = 0;
  solutionArray.forEach((letter, i) =>{
    if(solutionArray[i] == guessArray[i]){
       correctLetterLocations++;
       solutionArray[i] = null;
    }
  })


  let correctLetters = 0;
  let targetIndex;
  solutionArray.forEach((letter, i) => {
    console.log(guessArray.indexOf(letter, i))
    if(guessArray.indexOf(letter) > -1){
      correctLetters++;
      solutionArray[i] = null;
    }
  })
  return `${correctLetterLocations}-${correctLetters}`
}

// function that takes the user's guess and plays the game
// pushes the guess and hint from generateHint to the board
// returns message if user guessed it correctly, ran out of turns, or needs to guess again
const mastermind=(guess) => {

  const hint = generateHint(solution, guess);

  board.push([guess, hint])

  if(guess === solution){
    console.log('You guessed it!')
    return 'You guessed it!'
  } else if(board.length === 10){
    console.log(`'You ran out of turns! The solution was ${solution}`)
    return `'You ran out of turns! The solution was ${solution}`
  } else {
    console.log('Guess again.')
    return 'Guess again.'
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
      assert.equal(generateHint(solution, 'abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint(solution, 'aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}
