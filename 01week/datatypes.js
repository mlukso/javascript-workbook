// 1. Write a JavaScript program to display the current day and time.

// Notes: method "Date()" can pull the current date/time

const currentTime=()=>{return Date()}

console.log(currentTime())


// 2. Write a JavaScript program to convert a number to a string.

// Notes: method "String()" can convert numbers to a string.

const numberToString=(value1)=>{return String(value1)}

console.log(numberToString(100))


// 3. Write a JavaScript program to convert a string to the number.

// Notes: method "Number()" can convert numbers to a number.

const stringToNumber=(value2)=>{return Number(value2)}

console.log(stringToNumber('10'))

//4. Write a JavaScript program that takes in different datatypes and prints out whether they are a:
// Boolean
// Null
// Undefined
// Number
// NaN
// String

// Notes: "typeof" can tell us the data type

const checkType=(value3)=>{return typeof value3}

console.log(checkType('test'))

// 5. Write a JavaScript program that adds 2 numbers together.

// Notes: write simple function to return sum of inputs

const sum=(num1, num2)=>{return Number(num1) + Number(num2)}
console.log(sum('10', 0))

// 6. Write a JavaScript program that runs only when 2 things are true.

// Notes: don't need to specifify "typeof" since it will only continue if both inputs are "truthy" when using &&

const bothTrue=(input1, input2)=>{
 if (input1 && input2) {
   return true
 }
}

console.log(bothTrue(1,"test"))

// 7. Write a JavaScript program that runs when 1 of 2 things are true.

// Notes: can use || to check if either input is "truthy"

const oneTrue=(input3, input4)=>{
 if (input3 || input4) {
   return true
 }
}

console.log(oneTrue(2,0))

// 8. Write a JavaScript program that runs when both things are not true.

// Notes: added an extra line to only continue if both values are "fasley"

const noneTrue=(input5, input6)=>{
  if (!input5 && !input6) {
    return true
  }
}

console.log(noneTrue(1,0))
