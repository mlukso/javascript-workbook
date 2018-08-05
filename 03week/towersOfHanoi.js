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

const movePiece = (input1, input2) => {
  return stacks[input2].push(stacks[input1].pop(input1))
}

const isValid = (input1, input2) => {
  if (input1 && input2) {
    const combinedInputs = input1 += input2
    const combinedInputsToArray = (input1 += input2).split('')
    return combinedInputsToArray.every(input => ['a', 'b', 'c'].includes(input))
  }
}

const isLegal = (input1, input2) => {
  return stacks[input1].length > 0 &&
    stacks[input1].slice(-1) < stacks[input2].slice(-1) ||
    stacks[input2].length === 0 &&
    input1 !== input2
}

const checkForWin = () => {
  return stacks.b.length === 4 || stacks.c.length === 4
}

const checkForReset = (input1, input2) => {
  const combinedInputsToCheckForReset = input1 += input2
  return combinedInputsToCheckForReset.includes('reset')
}

const resetGame = () => {
  stacks = {
    a: [4, 3, 2, 1],
    b: [],
    c: []
  };
}

const towersOfHanoi = (startStack, endStack) => {

  const startStackFormatted = startStack.trim().toLowerCase();
  const endStackFormatted = endStack.trim().toLowerCase();

  if (isValid(startStackFormatted, endStackFormatted)) {
    if (isLegal(startStackFormatted, endStackFormatted)) {

      movePiece(startStackFormatted, endStackFormatted);

      if (checkForWin()) {
        console.log('Winner! Enter "reset" to play again.')
        return
      }
    } else {
      console.log('Invalid move. Try again.')
    }
  } else if (checkForReset(startStackFormatted, endStackFormatted)) {
    console.log('Game has been reset!')
    resetGame();
    return
  } else {
    console.log('Invalid input. Try again.')
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
