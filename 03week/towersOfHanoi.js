'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// moves the piece from the first stack to the second stack
const movePiece = (input1, input2) => {
  return stacks[input2].push(stacks[input1].pop(input1));
}

// return true if both inputs (combined into an array) contain only expected values ['a', 'b', 'c']
// Note: values have already been converted to lowercase and trimmed of spaces
const isValid = (input1, input2) => {
  if (input1 && input2) {
    const combinedInputs = input1 += input2;
    const combinedInputsToArray = (input1 += input2).split('');
    return combinedInputsToArray.every(input => ['a', 'b', 'c'].includes(input));
  }
}

// return true if the selected move is allowed (i.e. follows the rules of the game)
const isLegal = (input1, input2) => {
  return stacks[input1].length > 0 &&
    stacks[input1].slice(-1) < stacks[input2].slice(-1) ||
    stacks[input2].length === 0 &&
    input1 !== input2
}

// return true if stack 'b' or 'c' have an array length of 4
const checkForWin = () => {
  return stacks.b.length === 4 || stacks.c.length === 4;
}

// return true if either input contains 'reset'
const checkForReset = (input1, input2) => {
  const combinedInputsToCheckForReset = input1 += input2;
  return combinedInputsToCheckForReset.includes('reset');
}

// resets all gameplay by putting 'stacks' object into original order
const resetGame = () => {
  stacks = {
    a: [4, 3, 2, 1],
    b: [],
    c: []
  };
}

const towersOfHanoi = (startStack, endStack) => {

  // formatting the inputs to lowercase and trimming spaces
  const startStackFormatted = startStack.trim().toLowerCase();
  const endStackFormatted = endStack.trim().toLowerCase();

  // checking if isValid() and/or isLegal() are true
  if (isValid(startStackFormatted, endStackFormatted)) {
    if (isLegal(startStackFormatted, endStackFormatted)) {

      // if isValid() and isLegal() are true, move the piece
      movePiece(startStackFormatted, endStackFormatted);

      // tells player they've won and how to reset
      if (checkForWin()) {
        console.log('Winner! Enter "reset" to play again.');
        return
      }
      // display's "Invalid move. Try again." if isLegal() is false
    } else {
      console.log('Invalid move. Try again.');
    }

    // resets the game and tells the player if checkForReset() is true
  } else if (checkForReset(startStackFormatted, endStackFormatted)) {
    console.log('Game has been reset!');
    resetGame();
    return

    // display's "Invalid input. Try again." if isValid() is false
  } else {
    console.log('Invalid input. Try again.');
  }
}

function getPrompt() {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, {
        a: [4, 3, 2],
        b: [1],
        c: []
      });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });

  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = {
        a: [],
        b: [4, 3, 2, 1],
        c: []
      };
      assert.equal(checkForWin(), true);
      stacks = {
        a: [1],
        b: [4, 3, 2],
        c: []
      };
      assert.equal(checkForWin(), false);
    });
  });

  describe('#isValid()', () => {
    it('should not allow an invlaid move', () => {
      assert.equal(isValid(1, 'b'), false);
    });
    it('should allow a valid move', () => {
      assert.equal(isValid('a', 'b'), true);
    });
  });

  describe('#checkForReset()', () => {
    it('should detect a reset request', () => {
      assert.equal(checkForReset('a', 'reset'), true);
      assert.equal(checkForReset('a', 'c'), false);
    });
  });

  describe('#reset()', () => {
    it('should reset game', () => {
      towersOfHanoi('reset', 'a');
      assert.deepEqual(stacks, {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      });
    });
  });

} else {

  getPrompt();

}
