/*
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
*/

const getTwoSum = (nums, target) => {
  let map = {};
  let pair = [];

  for (let num of nums) {
    const diff = target - num;
    if (map[num]) {
      pair = [map[num], num];
      break;
    } else {
      map[diff] = num;
    }
  }
  
  return pair;
};

const nums = [2,7,11,15];
const target = 9;
const result = getTwoSum(nums, target);
console.log(result);
