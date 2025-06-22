/*
Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.

A subarray is a contiguous non-empty sequence of elements within an array.

Input: nums = [1,1,1], k = 2
Output: 2

CONCEPTS :

- Prefix Sum

- Basically, here u will use the hasMap approach of two sum and
- Prefix sum together

- U might think of solving this using sliding window but that u will fail
- right way to do this is using prefix sum algo

*/

/*
    why currSum - k
    If you are having difficulty understanding this or wrapping your head around the solution, 
    maybe this might be a good way to think about it. The question asks how many subarray sum equals to k. 
    For a subarray to sum to k, you need a subarray, as in a part of the array from index 'a' to index 'b' to have a sum equal to k. 
    But when we reach any index 'b', we obviously do not know, if there was a subarray from index 'a' to index 'b' equal to k. 
    However we do have the sums from 0 to index 'a' in our hash map, because we have been storing 
    all sums starting from index '0' to every single index till now, and the count of them as the value of the key. 
    Now obviously sum_0_to_a + sum_a_to_b  = total sum so far (curSum). If we go to the original ask, which is we need a prefix 
    that is sum_a_to_b to be equal to k. For that to hold true, replace sum_a_to_b with 'k'. Hence, sum_0_to_a + k  = curSum. 
    Hence curSum - k = sum_0_to_a. And then since we have been storing all possible values of sum_0_to_a so far in the hashmap, 
    curSum - k must exist in the hashmap as a key, and we can simply add the value from the hashmap to add 
    number of prefixes from 0 to any index which equalled to curSum - k .
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  let result = 0; // for given K how many subArrays possible
  let currSum = 0; // sum upto the ith index - prefix sum
  let prefixSums = new Map();
  prefixSums.set(0, 1); // prefix for k as 0 is 1 => [] when no iteration happened
  // so basically added a prefix value to the array

  for (let i = 0; i < nums.length; i++) {
    currSum = currSum + nums[i];    // Keep on creating the sum at every index
    const diff = currSum - k; // find the diff
    // [MAIN] : its currSum - k V V important....
    // Also do note....u might get negative values in the array
    // why currSum - k and not the other way round ? https://www.youtube.com/watch?v=fFVZt-6sgyo
    // when we get a sum that is bigger than the k, then we have to chop of the diff size subArray 
    // so that we get back to our sum or target - answered above

    // I am doing this based on diff....which is computed based on the k value given
    // if say result is 0 and k is 7... at this point its same as 2 sum with hashMap
    // if diff (which was a currSum) is present in the has map...then add that to the old result
    // why we are adding ? we might get the same sum multiple times if there are negative values
    // hence in that case, the no of sub arrays will also increase
    result = result + (prefixSums.get(diff) || 0);

    // so for every sum value in currSum, I am keeping track of 
    /// the count for how many times I got the same sum
    // this is important as if there are negative values... u might revisit the same
    // calculated sum again
    // so if that sum exist, then increment it else mark it as 1
    prefixSums.set(currSum, (prefixSums.get(currSum) || 0) + 1);
  }

  return result;
};
