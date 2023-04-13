'use strict'

/* Question 1 */
function max(x, y){
if (x >= y) {
    return x;
} else {
    return y
}
}

/* Question 2 */
function maxOfThree(x, y, z) {
if (x >= y && x >= z) {
    return x;
} else if (y >= x && y >= z) {
    return y;
} else {
    return z;
}
}

/* Q3 */  
function isVowel(char) {
const vowels = ['a', 'e', 'i', 'o', 'u'];

return vowels.includes(char.toLowerCase());
}

/* Q4 */
function sum(arr){
let sum = 0, temp;
for(const elem of arr){
    temp = Number(elem);
    if(!isNaN(temp))
        sum += temp;
}
return sum;
}

function multiply(arr){
let rslt = 1, i = 0;
while(i < arr.length){
    if(typeof(arr[i]) == 'number')
        rslt *= arr[i];
    i++;
}
return rslt;
}

/* Q5 */
function reverse(string) {
return string.split("").reverse().join("");
}

/* Q6 */
function findLongestWord(words) {
return words.reduce(function(longestWordLength, currentWord) {
    return Math.max(longestWordLength, currentWord.length);
}, 0);
}

/* Q7 */
function filterLongWords(words, i) {
return words.filter(word => {
    return word.length > i;
});
}

/* Q8 */
function computeSumOfSquares(arrayOfNumbers){
const sumOfSquares = arrayOfNumbers.reduce((acc, x) => {
    return acc + x * x;
}, 0);
return sumOfSquares;
}

/* Q9 */
function printOddNumbersOnly(arrayOfNumbers) {
arrayOfNumbers.forEach(n => {
    if(n % 2 !== 0)
        console.log(n);
});
}
/* Q10 */

function computeSumOfSquaresOfEvensOnly(arrayOfNumbers){
const sumOfSquares = arrayOfNumbers.reduce((acc, x) => {
    if(x % 2 === 0)
        return acc + x * x;
    else
        return acc;
}, 0);
return sumOfSquares;
}
/* Q11 */
function sum(arr){
    return arr.reduce((acc,x) => {
        return acc = acc + x;
    } ,0);
}

function multiply(arr){
    return arr.reduce((acc, x) => {
        return acc = acc * x;
    }, 1);
}
//console.log(multiply([4, 4, 2]));

/* Q12 */
function findSecondLargestUsingForOf(arr) {
    let max = -Infinity;
    let secondMax = -Infinity;
    arr.forEach(x => {
        if(x > max){
            secondMax = max;
            max = x;
        }
        if(x > secondMax && x < max){
            secondMax = x;
        }
    });
    return secondMax;
}

/* Q13 */
function printFibo(n, a, b) {
    let next = a + b;
    for (let index = 0; index < n; index++) {
        if(index == 0)
            console.log(a);
        else if(index == 1)
            console.log(b);
        else{
            console.log(next);
            a = b;
            b = next;
            next = a + b;
        }
    }
}

printFibo(6, 0, 1);



/* Extra */
const a = [1,3,5,3,3];

let processed = [];
let i = 0;
let t = a.map(function (x) {
if(!processed.includes(x))
{
    processed[i] = x;
    i++;
    let len = a.filter(function (y) {
        return x == y;
    });
    return len.length;
}
});