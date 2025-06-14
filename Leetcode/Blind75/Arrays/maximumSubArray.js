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
 */
var maxSubArray = function (nums) {
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