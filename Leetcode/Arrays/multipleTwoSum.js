/*
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
*/

const getAllTwoSum = (nums, target) => {

    let result = [];
    let map = {};

    for(let num of nums){
        const diff = target - num;

        if(map[num]){
            const pair = [map[num], num];
            result.push(pair);
        }else{
            map[diff] = num
        }
        
    }

    return result

    
  };
  
  const nums = [2,7,11,15,1,8];
  const target = 9;
  const result = getAllTwoSum(nums, target);
  console.log(result);
  