/*

You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Example 1:

Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps

Sol : Its basically a fibonacci series
*/

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  let firstStep = 1; // only one way to reach the 0th level....we are already there
  let secondStep = 1; // only One way to reach to the first step.... 1

  let thirdStep = 0;

  for (let i = 2; i <= n; i++) {
    thirdStep = firstStep + secondStep;

    firstStep = secondStep;
    secondStep = thirdStep;
  }

  return thirdStep;
};

/*
  Better

  why this series or this solutin is like fibonacci...
  think of it this way...
  it took me 3 way to reach step 3
  it took me 5 ways to reach step 4
  now...since I can jump either 1 or 2 stairs at a time....
  It means, if I am at 3rd step...then also I can reach 5th step directly
  or...if I am at step 4...then also i can reach step 5 directly...
  
  However many ways it took me to reach step 3, that many ways I can reach step 5 also
  Same with step 4....however many ways it took me to reach step 4, that many ways i can reach step 5 also
  why ? Beacause from both step 3 and 4...step 5 is accessible...
  Hence to get the total no of ways to reach the step 5....I will add wasy to reach 3 and wasy to reach 4
*/

var climbStairs = function (n) {
  // for first step, there is only one way to get there ...take 1 step
  // for 2nd step => 1 + 1 or 2step at a time
  // for 3rd step => (1 + 1 + 1), (1 + 2), (2 + 1)
  // for 4th => (1 + 1 + 1 + 1), (1 + 1 + 2), (1 + 2 + 1), (2 + 2), (2 + 1 + 1) // so not 4...
  // hence we can have a condition upto 3 steps only
  if (n <= 3) return n;

  // why I need previous two values to get the third ?
  // because there are two ways I can take a step.... 1 at a time or 2 at a time
  // if I could take 3 steps also... 1 or 2 or 3 at a time...then I would need another variable...
  // variables are better....but u can also do the same using an array...like in DP
  let prev1 = 3; // upto 3rd step, no of ways are 3
  let prev2 = 2; // upto 2nd step, no of wasy are 2
  let cur = 0; // this will store the next calculated value
  // u can consider curr 0 as if we have filled the DP array with 0 value

  // why i < n
  // so in DP, we create a array and use the index as the target.
  // so if the input is calculate for 4th step, then in the array that would mean 3rd index
  // so if we get n as 0, then return 0
  /// n = 1 => return 1, n => 2 return 2, n => 3 return 3
  // [0, 1, 2, 3, 0, 0, 0, .... n] => [1, 1, 2, 3, 0, 0, 0, ... n]
  // for 0th step...we have 0 ways to get there
  // for 1st step...we have 1 way to get there.....and so on..
  for (let i = 3; i < n; i++) {
    cur = prev1 + prev2;
    prev2 = prev1;
    prev1 = cur;
  }

  return cur;
};

/*
  DP solution
*/

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  if (n <= 1) {
    return 1;
  }

  let dp = Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i < dp.length; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
};

/*
  Recursive with Caching
*/

/**
 * @param {number} n
 * @return {number}
 */

let memo = new Map();
var climbStairs = function (n) {
  if (n <= 1) {
    return 1;
  }

  if (memo.has(n)) {
    return memo.get(n);
  } else {
    const result = climbStairs(n - 1) + climbStairs(n - 2);
    memo.set(n, result);
    return memo.get(n);
  }
};
