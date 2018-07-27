'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

  // Need a condition to check if hand1 && hand2 have inputs "truthy"
  // Need a conditions to trim spaces, convert all letters to lowercase, and convert to string
  // Need a condition to check if the inputs are valid for hand1 && hand2. Does it match 'rock', 'paper', or 'scissors'? If not, return "Please choose type 'rock', 'paper', or 'scissors'."
  // else if (hand1 === hand2) then return "It's a tie!"
  // else if (hand1 === 'paper' && hand2 === 'rock') return "Hand one wins!"
  // else if (hand1 === 'scissors' && hand2 === 'paper') return "Hand one wins!"
  // else if (hand1 === 'rock' && hand2 === 'scissors') return "Hand one wins!"
  // else return "Hand two wins!"


const rockPaperScissors=(hand1, hand2)=>{

  // Check if inputs are "Truthy"
  if (hand1 && hand2){
  } else {return "Please enter 'rock', 'paper', or 'scissors'"}

  // Trim spaces, convert to lowercase, and ensure a String for each of the inputs
  hand1 = hand1.trim();
  hand1 = hand1.toLowerCase();
  hand1 = String(hand1)

  hand2 = hand2.trim();
  hand2 = hand2.toLowerCase();
  hand2 = String(hand2)

  // game logic to compare inputs
  if (hand1 !== 'rock' && hand1 !== 'paper' && hand1 !== 'scissors'){return "Please enter 'rock', 'paper', or 'scissors'"}
  else if (hand2 !== 'rock' && hand2 !== 'paper' && hand2 !== 'scissors'){return "Please enter 'rock', 'paper', or 'scissors'"}

    else if (hand1 === hand2){return "It's a tie!"}
    else if (hand1 === 'paper' && hand2 === 'rock') {return "Hand one wins!"}
    else if (hand1 === 'scissors' && hand2 === 'paper'){return "Hand one wins!"}
    else if (hand1 === 'rock' && hand2 === 'scissors') {return "Hand one wins!"}
    else {return "Hand two wins!"}
}

function getPrompt() {
  rl.question('hand1: ', (answer1) => {
    rl.question('hand2: ', (answer2) => {
      console.log(rockPaperScissors(answer1, answer2));
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#rockPaperScissors()', () => {
    it('should detect a tie', () => {
      assert.equal(rockPaperScissors('rock', 'rock'), "It's a tie!");
      assert.equal(rockPaperScissors('paper', 'paper'), "It's a tie!");
      assert.equal(rockPaperScissors('scissors', 'scissors'), "It's a tie!");
    });
    it('should detect which hand won', () => {
      assert.equal(rockPaperScissors('rock', 'paper'), "Hand two wins!");
      assert.equal(rockPaperScissors('paper', 'scissors'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock', 'scissors'), "Hand one wins!");
    });
    it('should scrub input to ensure lowercase with "trim"ed whitepace', () => {
      assert.equal(rockPaperScissors('rOcK', ' paper '), "Hand two wins!");
      assert.equal(rockPaperScissors('Paper', 'SCISSORS'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock ', 'sCiSsOrs'), "Hand one wins!");
    });
    it('should return an error if the inputs are not valid', () => {
      assert.equal(rockPaperScissors('paper', null), "Please enter 'rock', 'paper', or 'scissors'");
      assert.equal(rockPaperScissors(0, 'Rock'), "Please enter 'rock', 'paper', or 'scissors'");
      assert.equal(rockPaperScissors('testing', 'paper'), "Please enter 'rock', 'paper', or 'scissors'");
    });
  });
} else {

  getPrompt();

}
