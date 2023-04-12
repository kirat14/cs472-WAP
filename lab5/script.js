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


  function filterWordsByLength(wordsArray, minLength) {
    return wordsArray.filter(function (word) {
      return word.length > minLength;
    });
  }
  
  function sumOfSquares(numbersArray) {
    return numbersArray.reduce(function (sum, number) {
      return sum + number * number;
    }, 0);
  }
  
  function printOddNumbersUsingForOf(numbersArray) {
    for (let number of numbersArray) {
      if (number % 2 !== 0) {
        console.log(number);
      }
    }
  }
  
  function printOddNumbers(numbersArray) {
    numbersArray.forEach(function (number) {
      if (number % 2 !== 0) {
        console.log(number);
      }
    });
  }
  
  function sumOfSquaresOfEvenNumbers(numbersArray) {
    return numbersArray
      .filter(function (number) {
        return number % 2 === 0;
      })
      .reduce(function (sum, number) {
        return sum + number * number;
      }, 0);
  }
  
  function findSecondLargestUsingForOf(numbersArray) {
    let largest = numbersArray[0];
    let secondLargest = numbersArray[0];
  
    for (let num of numbersArray) {
      if (num > largest) {
        secondLargest = largest;
        largest = num;
      } else if (num > secondLargest && num !== largest) {
        secondLargest = num;
      }
    }
  
    return secondLargest;
  }
  
  function findSecondLargest(numbersArray) {
    let largest = numbersArray[0];
    let secondLargest = numbersArray[0];
  
    for (let i = 1; i < numbersArray.length; i++) {
      if (numbersArray[i] > largest) {
        secondLargest = largest;
        largest = numbersArray[i];
      } else if (numbersArray[i] > secondLargest && numbersArray[i] !== largest) {
        secondLargest = numbersArray[i];
      }
    }
  
    return secondLargest;
  }
  
  function findSecondLargestUsingReduce(numbersArray) {
    const [largest, secondLargest] = numbersArray.reduce(
      ([max, secondMax], current) => {
        if (current > max) {
          return [current, max];
        } else if (current > secondMax && current !== max) {
          return [max, current];
        }
        return [max, secondMax];
      },
      [-Infinity, -Infinity]
    );
    return secondLargest;
  }
  
  function printFibonacciSequence(length, firstTerm, secondTerm) {
    let fib = [firstTerm, secondTerm];
    for (let i = 2; i < length; i++) {
      fib[i] = fib[i - 1] + fib[i - 2];
    }
    console.log(fib.join(", "));
  }
  
  function sumOfNumbersGreaterThanTwenty(numbersArray) {
    return numbersArray.filter((num) => num > 20).reduce((acc, num) => acc + num, 0);
  }
  
  const getWordsWithLengthAndLetter = function (wordsArray) {
    return wordsArray.filter((str) => str.length >= 5 && str.includes("a"));
  };
  



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