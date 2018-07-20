'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function rockPaperScissors(hand1, hand2) {

  // Write code here
  // 1. Did the users enter a valid input? Need a function to check if hand1 & hand2 are valid. If not, return error. I can write a condition to check the string for 'rock', 'paper', or 'scissors'
  // 2. Will need conditions for both hand1 and hand2.
  // 3. If they are valid, I need to write conditions to compare the inputs.
  // 4. Write a condition to check: if (hand1 === 'rock' && hand2 === 'scissors') return "Hand one wins!"
  // 5. Write a condition to check: if (hand1 === 'rock' && hand2 === 'paper') return "Hand two Wins!"
  // 6. Write a condition to check: if (hand1 === 'rock' && hand2 === 'rock') return "It's a tie!"
  // 7. Write a condition to check: if (hand1 === 'paper' && hand2 === 'rock') return "Hand one wins!"
  // 8. Write a condition to check: if (hand1 === 'paper' && hand2 === 'scissors') return "Hand two wins!"
  // 9. Write a condition to check: if (hand1 === 'paper' && hand2 === 'paper') return "It's a tie!"
  // 10. Write a condition to check: if (hand1 === 'scissors' && hand2 === 'paper') return "Hand one wins!"
  // 11. Write a condition to check: if (hand1 === 'scissors' && hand2 === 'rock') return "Hand two wins!"
  // 12. Write a condition to check: if (hand1 === 'scissors' && hand2 === 'scissors') return "It's a tie!"

  // Can you think of a simpler way?
  // Still need a condition to check if the inputs are valid for hand1 and hand2. Is it a string? Does it match 'rock', 'paper', or 'scissors'? If not, return "Please choose type 'rock', 'paper', or 'scissors'." and request input again.
  // else if (hand1 === hand2) then return "It's a tie!"
  // else if (hand1 === 'paper' && hand2 === 'rock') return "Hand one wins!"
  // else if (hand1 === 'scissors' && hand2 === 'paper') return "Hand one wins!"
  // else if (hand1 === 'rock' && hand2 === 'scissors') return "Hand one wins!"
  // else return "Hand two wins!"

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
  });
} else {

  getPrompt();

}
