

/*
You are a professional robber planning to rob houses along a street. 
Each house has a certain amount of money stashed, the only constraint stopping you 
from robbing each of them is that adjacent houses have security systems connected 
and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, 
return the maximum amount of money you can rob tonight without alerting the police.

Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.


CONCEPTS :

- Like a fibonacci

-

*/


/**
 * @param {number[]} nums
 * @return {number}
 */
function rob2(nums) {
    let prev = 0, curr = 0;
    for (let num of nums) {
        // [prev, curr] = [curr, Math.max(curr, prev + num)];

        // let temp = curr;
        // curr = Math.max(curr, prev + num);
        // prev = temp;

        // or

        let nextCurr = Math.max(curr, prev + num);
        prev = curr;
        curr = nextCurr;

    }
    return curr;
}



function rob(nums) {

    if(nums.length === 1){
        return nums[0];
    }

    let result = new Array(nums.length).fill(0);
    result[0] = nums[0];
    result[1] = Math.max(nums[0], nums[1]);

    for(let i = 2; i < nums.length; i++){
        // upto ith index, what is the max robber can rob
        result[i] = Math.max(result[i - 1], nums[i] + result[i - 2]);
    }

    console.log(result);

    return result[nums.length - 1];
}

const nums = [2,1,1,2];
console.log(rob(nums));