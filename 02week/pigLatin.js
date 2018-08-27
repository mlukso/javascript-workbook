'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Check if the input exists, is a string, and isn't a number
// Trim any spaces and set characters to lowercase
// Break up the sting into an array with .split()
// Check each value of array for a vowel
// If first letter is a vowel, return and add 'yay'
// If not, find first vowel
// Use new array and push values from the original array until first vowel
// Use vowel location to parse the original array to remove values up to first vowel
// Return both arrays joined into a new string and add 'ay'

// TODOS:
// Find way to check for any characters that are not letters and throw error or remove them (no regex)

// Function that checks for vowels in an array and returns if a match is found
const checkForVowel = (array, index) => {
  const firstVowel = array.findIndex(letter => ['a', 'e', 'i', 'o', 'u'].includes(letter))
  return index === firstVowel
}

// Function to clean up the input by trimming spaces and converting to all lowercase characters
const wordLowerCaseTrim = (input) => {
  return input.trim().toLowerCase().split("")
}

// Function to check for 'y' as vowel. Doesn't work if 'y' is the first letter (probably needs some additional work because 'y' is weird)
const checkForY = (array, index) => {
  if (array[0] !== 'y') {
    return array[index] === 'y'
  }
}

const pigLatin = (word) => {
  if (!word || typeof word !== 'string' || !isNaN(word)) {
    return "Please enter a valid word"
  } else {
    const originalWordArray = wordLowerCaseTrim(word)
    const lettersToParseArray = [];
    let firstVowelIndex;

    // If first letter is vowel (but not 'y'), immedately just add 'yay' and return
    if (checkForVowel(originalWordArray, 0)) {
      return originalWordArray.join('') + 'yay'
    }

    // Find the location of the first vowel (or 'y' if no other vowel is found)
    for (let i = 0; i < originalWordArray.length; i++) {
      if (checkForVowel(originalWordArray, i)) {
        firstVowelIndex = i;
        break;
      } else if (checkForY(originalWordArray, i)) {
        firstVowelIndex = i;
        break;
      }
    }

    // Push letters from original word until first vowel to new array
    for (let j = 0; j < firstVowelIndex; j++) {
      lettersToParseArray.push(originalWordArray[j])
    }

    // Remove letters from original array until first vowel
    originalWordArray.splice(0, firstVowelIndex);

    // Combine two arrays into a new word, add 'ay'
    return originalWordArray.join('') + lettersToParseArray.join('') + 'ay'
  }
}


// Function that converts all words in a sentence to pigLatin
const pigLatinSentence = (sentence) => {
  return sentence.trim().split(' ').map(word => pigLatin(word)).join(' ')
}

function getPrompt() {
  rl.question('word ', (answer) => {
    console.log(pigLatin(answer));
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#pigLatin()', () => {
    it('should translate a simple word', () => {
      assert.equal(pigLatin('car'), 'arcay');
      assert.equal(pigLatin('dog'), 'ogday');
    });
    it('should translate a complex word', () => {
      assert.equal(pigLatin('create'), 'eatecray');
      assert.equal(pigLatin('valley'), 'alleyvay');
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigLatin('egg'), 'eggyay');
      assert.equal(pigLatin('emission'), 'emissionyay');
    });
    it('should lowercase and trim word before translation', () => {
      assert.equal(pigLatin('HeLlO '), 'ellohay');
      assert.equal(pigLatin(' RoCkEt'), 'ocketray');
    });
    it('should lowercase, trim and translate each word in a whole sentance to pig latin', () => {
      assert.equal(pigLatinSentence('My Name Is MATT  '), 'ymay amenay isyay attmay');
      assert.equal(pigLatinSentence('  it is SO HOT in AUSTIN '), 'ityay isyay osay othay inyay austinyay');
    });
  });
} else {

  getPrompt();

}
