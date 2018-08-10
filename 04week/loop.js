'use strict';

// for loop
// Use a for loop to console.log each item in the array carsInReverse.
// Note: I don't know what is supposed to be in carsInReverse

const carsInReverse = ['honda', 'toyota', 'nissan', 'tesla']

for (i = 0; i < carsInReverse.length; i++){
  console.log(carsInReverse[i])
}

// for...in loop
// Create an object (an array with keys and values) called persons with the following data:
// firstName: "Jane"
// lastName: "Doe"
// birthDate: "Jan 5, 1925"
// gender: "female"


const persons = {
  firstName: "Jane",
  lastName: "Doe",
  birthDate: "Jan 5, 1925",
  gender: "female"
}


// Use a for...in loop to console.log each key.
for (let key in persons) {
  console.log(key)
}

// Then use a for...in loop and if state to console.log the value associated with the key birthDate.
for (let key in persons) {
  console.log(key)
  if (persons[key] === persons.birthDate){
    console.log(persons[key])
  }
}

// while loop
// Use a for loop to console.log the numbers 1 to 1000.
let numbers = 0;
while (numbers < 1000){
  numbers++;
  console.log(numbers)
}

// do...while loop
// Use a do...while loop to console.log the numbers from 1 to 1000.
do {
  numbers++;
  console.log(numbers)
} while (numbers < 1000)

// When is a for loop better than a while loop?
// Answer: A 'for' loop is better if we don't have a break point since it could potentially repeat forever. We can also add multiple conditions to a 'for' loop which is helpful in some scenarios.

// How is the readability of the code affected?
// Answer: Ease of syntax. Using 'while' helps the person reading your code know which condition being evaluated will end the loop.

// What is the difference between a for loop and a for...in loop?
// Answer: Syntax. A 'for...in' loop is easy to read. It is ideal for a simple iteration. A 'for' loop gives you a bit more control over the other parts of the loop like the length and indices.

// What is the difference between a while loop and a do...while loop?
// Answer: The conditional statement is at the beginning of a 'while' loop and at the end in a 'do...while' loop
