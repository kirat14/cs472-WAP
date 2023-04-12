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