/*
You are given an integer array nums and an integer k.

In one operation, you can pick two numbers from the array whose sum equals k and remove them from the array.

Return the maximum number of operations you can perform on the array.

Input: nums = [1,2,3,4], k = 5
Output: 2
Explanation: Starting with nums = [1,2,3,4]:
- Remove numbers 1 and 4, then nums = [2,3]
- Remove numbers 2 and 3, then nums = []
There are no more pairs that sum up to 5, hence a total of 2 operations.
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxOperations = function (nums, k) {
  let result = 0;
  let store = new Map();

  for (let num of nums) {
    const diff = k - num;

    if (store.has(diff)) {
      if (store.get(diff) === 1) {
        store.delete(diff);
      } else {
        store.set(diff, store.get(diff) - 1);
      }
      result += 1;
      continue;
    }

    // why we are keeping frequency of each number occurance ?
    // because say current num is 2 and k is 7
    // now to get to 7...we need 5 with 2....
    // since elements can be in random in the array given...
    // if might be the case that we get the 2 multiple times before 
    // we get its complementary number...
    // that too.... we might get mumtiple time 5...
    // Hence we can keeping the track of the each num occurance
    // and when we find the complementary, we decrement it...
    // that way we can count the multiple times the pairs comes
    store.set(num, (store.get(num) || 0) + 1);
  }

  return result;
};
