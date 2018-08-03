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

function movePiece(startStack, endStack) {
  // Your code here
  // if ((endStack == 'a' || endStack == 'b' || endStack == 'c')
  //  && (startStack == 'a' || startStack == 'b' || startStack == 'c')) {
  //    return true
  //  }
}

function isLegal(startStack, endStack) {
  // Your code here
  if ((stacks[startStack].length > 0)
   && (stacks[startStack].slice(-1) < stacks[endStack].slice(-1))
   || (stacks[endStack].length == 0)) {
     return true
  } else {
     return false
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

        console.log('Start value: ' + stacks[startStack].slice(-1))
        console.log('End value: ' + stacks[endStack].slice(-1))

  if (isLegal(startStack, endStack)){

    stacks[endStack].push(stacks[startStack].pop(startStack))
    if (checkForWin()){
      console.log('Winner!')
    }
  } else {
    console.log('Try again')
  }

  console.log(stacks[startStack].slice(-1) > stacks[endStack].slice(-1))
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
