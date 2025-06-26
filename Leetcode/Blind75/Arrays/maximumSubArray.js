/*

Given an integer array nums, find the subarray with the largest sum, and return its sum.

Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.

CONCEPTS : (copied from maxProductSubArray.. its the same concept but for sum)

- Sliding Window

- So, use for loop to runn the second pointer i
- use start to keep the first pointer
- MAIN : when the product decreases, thats the condition when start/ first pointer should move
- Now, we should do other things as well when this condition is met
- we keep a resultProduct => the final value
- we keep maxProduct or just product which the product of the subarray
- when the condition is met, we move the maxProduct to result product as that is the max as of now
- and we reset the maxProduct to 1

- MAIN : we also check for the max, before returning as the maxProduct can still hold some value
- Better check if the value hold by maxProduct is bigger than the result product
- Why ? cause say u got a dip in the product somewhere mid of the array
- Now, after that u reset and started calculation again
- And on keep doing so the value became bigger than the resultProduct.
- But since it never again dipped, it wont enter the if statement and no trasfer will happen

*/

/**
 * @param {number[]} nums
 * @return {number}
 * wrong sol;ution.....fails for many cases....
 * 
 */
var maxSubArrayOwn = function (nums) {
  let start = 0;
  let sum = nums[0];

  let maxSum = sum;

  for (let i = 1; i < nums.length; i++) {
    let currItem = nums[i];
    let newSum = sum + currItem;

    if (newSum < sum) {
      start = i;
      maxSum = Math.max(maxSum, sum);
      sum = 0;
    }

    sum = Math.max(newSum, sum);
  }

  return Math.max(maxSum, sum);
};




/*

*/


/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {

    let maxSum = minSum = result = -Infinity;

    for(let n of nums){
        const sum = maxSum + n; // use maxSum in every loop to get the newSum
        maxSum = Math.max(sum, minSum + n, n);
        minSum = Math.min(sum, minSum + n, n);

        result = Math.max(maxSum, result);
    }

    return result;
    
};

// DP... this and the next solution are almost same...
// try to visualize.... how an imaginary DP array is there and we are updating it as we go...upto that index
// so in below solution....if u were to print the nums array...u will see the sum of all the elements....
// upto that index.... that was like the first part of the problem....
// now once u have it...then u just need the max value that u got as u terated
var maxSubArray = function(nums) {
    // Initialize the max sum...
    let maxSum = nums[0];
    // Traverse all the element through the loop...
    for (let i = 1; i < nums.length; i++) {
        // nums[i] represents the largest sum of all subarrays ending with index i...
        // then its value should be the larger one between nums[i]...
        // nums[i-1] + nums[i] (largest sum plus current number with using prefix)...
        // calculate nums[0], nums[1]…, nums[n] while comparing each one with current largest sum...
        nums[i] = Math.max(0, nums[i - 1]) + nums[i];
        // why zero above ? main key here is that if u find that the runningSum is less than 0..reset to 0
        // if nums[i] > maxSum then maxSum = nums[i]...
        if (nums[i] > maxSum)
            maxSum = nums[i];
    }
    return maxSum;      // return the contiguous subarray which has the largest sum...
};


var maxSubArray = function(nums) {
    let res = nums[0];
    let total = 0;

    for (let n of nums) {
        // If the current sum becomes negative, it's better to start a new subarray.
        // If adding the current element to currSum gives a larger sum than the element itself, continue the subarray.
        // Otherwise, start a new subarray from the current element.
        if (total < 0) { // Main point.. run through the example to understand....its like an observation
            total = 0;
        }

        total += n;
        res = Math.max(res, total);
    }
    
    return res;    
};


/*
  DP Solution
  Find the max sum upto ith index...
  also keep track of the max u found throughout
  This takes 0N - as we are using the array....
  But now u can quickly convert this to a single variable...
  as to get the next value....we just need the previous value in the DP array..
  so no need to keep the whole array
*/

var maxSubArray = function (nums) {
    const len = nums.length;
    let dp = new Array(len).fill(0);
    dp[0] = nums[0];
    let max = dp[0];

    for(let i = 1; i < len; i++){
        dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
        max = Math.max(max, dp[i]);
    }

    return max;

};

/*
  We replaced dp's array with a variable....
  since we need just the previous value in the dp array to get the new sum
  we can just have a variable that stores the previous computed value
*/

var maxSubArray = function (nums) {
    const len = nums.length;
    let maxSum = nums[0];
    let sum = nums[0];

    for(let i = 1; i < len; i++){
        // Max sum upto that index...not sum of all elements upto that index
        sum = Math.max(nums[i], sum + nums[i]);
        maxSum = Math.max(maxSum, sum);
    }

    return maxSum;

};


const nums = [-2,1,-3,4,-1,2,1,-5,4];
console.log(maxSubArrayOwn(nums));