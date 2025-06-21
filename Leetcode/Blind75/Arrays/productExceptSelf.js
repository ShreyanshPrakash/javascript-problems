/*

Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.

Example 1:

Input: nums = [1,2,3,4]
Output: [24,12,8,6]
Example 2:

Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]

CONCEPTS :

- prefix and suffix

- Not very into this
- Basically you go from left to right and update the new array with the product
- Then u do the same in opposite direction
- Apprently, this solves the problem :-)

https://leetcode.com/problems/product-of-array-except-self/solutions/1342916/3-minute-read-mimicking-an-interview/

- In this its prefix and suffix
- Its basically I have access to the previous nos not the next nos.
- So as I go left to right....I will keep on making product and save it
*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  let result = Array(nums.length).fill(1);

  let left = 1;
  for (let i = 0; i < nums.length; i++) {
    result[i] = result[i] * left;
    left = left * nums[i];
  }

  let right = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] = result[i] * right;
    right = right * nums[i];
  }

  return result;
};

/*

Above is the better solution...its precise and takes less space

Below is more readable and helpful to understand what is actually happening above
https://www.youtube.com/watch?v=bNvIQI2wAjk
*/

var productExceptSelfTest = function (nums) {
  const n = nums.length;

  const prefix = new Array(n).fill(1);
  const suffix = new Array(n).fill(1);

  // we try to find multiplication of all the items upto but except that index
  // in this loop, we are doing left to right....so we keep looking to the left as we move
  // to get the product upto that point
  // Hence its called prefix
  // basically, u are computing prefix of array at every index (upto but except)
  for (let i = 1; i < n; i++) {
    // starts from 1 as we comapre with an index before
    prefix[i] = prefix[i - 1] * nums[i - 1];
  }

  // we try to find multiplication of all the items upto but except that index
  // in this loop, we are doing right to left....so we keep looking to the right as we move
  // to get the product upto that point
  // hence its called suffix
  // basically, u are coputing suffix of array at every index
  for (let i = n - 2; i >= 0; i--) {
    // n - 2...since we are comparing with an index before
    suffix[i] = suffix[i + 1] * nums[i + 1];
  }

  const answer = [];
  for (let i = 0; i < n; i++) {
    answer[i] = prefix[i] * suffix[i];
  }

  return answer;
};

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  // First, create a prefix array that moves from the left,
  // gathering the running product of the prefix at each index
  const prefix = [];

  // Move left in the input array
  for (let i = 0; i < nums.length; i++) {
    // If i === 0, start with `1`, since there is no prefix
    if (i === 0) {
      prefix[i] = 1;
    } else {
      // Otherwise, multiply nums[i-1] times the prefix at position i-1,
      // and add that to the prefix array at position i
      prefix[i] = nums[i - 1] * prefix[i - 1];
    }
  }

  // Then, let's create a suffix array
  const suffix = [];

  // Move right in the input array
  for (let i = nums.length - 1; i >= 0; i--) {
    // For the last index, we have no suffix, so just add a 1 to that position
    if (i === nums.length - 1) {
      suffix[i] = 1;
    } else {
      // Otherwise, we multiply nums[i+1] by the suffix at position i+1
      // and add that to the suffix array at position i
      suffix[i] = nums[i + 1] * suffix[i + 1];
    }
  }

  // Finally, our result array should be the products of prefix * suffix for each position
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    result[i] = prefix[i] * suffix[i];
  }

  return result;
};

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  // Set up an empty array as our result
  const result = [];

  // Initialize a prefix tracker at 1
  let prefix = 1;

  // Loop through the input array - for each position,
  // the result array should equal the prefix tracker.

  // Then, update the prefix tracker to be the product of itself,
  // multiplied by the input value at the position.
  for (let i = 0; i < nums.length; i++) {
    result[i] = prefix;
    prefix *= nums[i];
  }

  // Initialize a suffix tracker at 1
  let suffix = 1;

  // Loop backwards through the array.
  // For each iteration, set the result array to be
  // the product of itself multiplied by the suffix tracker.

  // Then, update the suffix tracker to be the product of itself,
  // multiplied by the input value at that position.
  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] *= suffix;
    suffix *= nums[i];
  }

  return result;
};

/*
    Diving deeper
    Brute Force
*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelfBruteForce = function (nums) {
  let result = [];
  for (let i = 0; i < nums.length; i++) {
    let product = 1;
    for (let j = 0; j < nums.length; j++) {
      if (i === j) {
        continue;
      }

      product *= nums[j];
    }

    result[i] = product;
  }

  return result;
};

/*
    This solution wont work if zero is there
*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelfDivideProductByNum = function (nums) {
  let totalProduct = 1;

  for (let num of nums) {
    totalProduct *= num;
  }

  for (let i = 0; i < nums.length; i++) {
    nums[i] = Math.floor(totalProduct / nums[i]);
  }

  return nums;
};

/*
    O(n) with 0 considered
    on(2n) space... try doing in o(n)
*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  let len = nums.length;
  let preffixArr = new Array(len).fill(0);
  let suffixArr = new Array(len).fill(0);

  preffixArr[0] = 1;
  suffixArr[len - 1] = 1;

  for (let i = 1; i < len; i++) {
    preffixArr[i] = preffixArr[i - 1] * nums[i - 1];
  }

  for (let i = len - 2; i >= 0; i--) {
    suffixArr[i] = suffixArr[i + 1] * nums[i + 1];
  }

  for (let i = 0; i < len; i++) {
    preffixArr[i] = preffixArr[i] * suffixArr[i];
  }

  return preffixArr;
};

/*
Best solution

*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  let len = nums.length;
  let result = Array(len).fill(1);

  let left = 1; // consider tthis left is before the zeroth index or start of our array
  for (let i = 0; i < len; i++) {
    result[i] = result[i] * left; // [MAIN] : This is like the final array we created by multiplying both prefix and suffi array
    left = left * nums[i]; // [MAIN] : This is like prefix array we created in previous solutions
    // [MAIN] If u would think, u dont need the whole suffix or prefix array (from previous solutions) to be available
    // to compute the product in final array, u just need the last prefix/ suffix value....
    // that is what we are doing here in left/ right
  }

  let right = 1; // consider this right is after the last index or end of our array
  for (let i = len - 1; i >= 0; i--) {
    // right is suffix
    // it means, It will store product of all the values in the array upto that point (i -> )
    // as we are moving from right to left..
    // so all the values product upto that point from the right to left
    // I will multiple the suffix value with the value in the result array to get the product upto that point
    result[i] = result[i] * right; // [MAIN] : This is like the final array we created by multiplying both prefix and suffi array
    // Now I will compute the new suffix...which is product of the current suffic * nums[i]
    right = right * nums[i]; // [MAIN] : this is like the suffix array we created in previous solutions
    // to calculate suffix/ prefix...U always need the nums array
    // as u are finding the suffix or prefix of the nums array at that point.
    // U multiple the value in the result array with the suffix or prefix array value
  }

  return result;
};

/*
    FINAL
*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  let len = nums.length;
  let result = Array(len).fill(1);

  let prefixProd = 1;
  for (let i = 0; i < len; i++) {
    result[i] = result[i] * prefixProd;
    prefixProd = prefixProd * nums[i];
  }

  let suffixProd = 1;
  for (let i = len - 1; i >= 0; i--) {
    result[i] = result[i] * suffixProd;
    suffixProd = suffixProd * nums[i];
  }

  return result;
};




/*
  Code Runner
*/

const nums = [1,2,3,4];
console.log(productExceptSelfTest(nums));