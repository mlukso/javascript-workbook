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

function movePiece(input1, input2) {
  // Your code here
  return stacks[input2].push(stacks[input1].pop(input1))
}

function isValid(input1, input2){

  if ((input1 == 'a' || input1 == 'b' || input1 == 'c')
   && (input2 == 'a' || input2 == 'b' || input2 == 'c')
   && (input1 !== input2)) {
    return true
  }
}

function isLegal(input1, input2) {
  // Your code here

   if ((stacks[input1].length > 0)
    && (stacks[input1].slice(-1) < stacks[input2].slice(-1))
    || (stacks[input2].length == 0)) {
      return true
   }
}

function checkForWin() {
  // Your code here
  if (stacks.b.length === 4 || stacks.c.length === 4){
     return true
  } else {
     return false
  }
}

function towersOfHanoi(startStack, endStack) {
  // Your code here

  let startStackFormatted = startStack.trim().toLowerCase();
  let endStackFormatted = endStack.trim().toLowerCase();

  if (isValid(startStackFormatted, endStackFormatted)) {
    if (isLegal(startStackFormatted, endStackFormatted)) {

      movePiece(startStackFormatted, endStackFormatted);

      if (checkForWin()){
        console.log('Winner!')
    }
  } else {
    console.log('Invalid move. Try again.')
  }
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
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
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
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
