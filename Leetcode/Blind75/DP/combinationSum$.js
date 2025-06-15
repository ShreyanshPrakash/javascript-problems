

/*

Given an array of distinct integers nums and a target integer target, 
return the number of possible combinations that add up to target.

The test cases are generated so that the answer can fit in a 32-bit integer.

Input: nums = [1,2,3], target = 4
Output: 7
Explanation:
The possible combination ways are:
(1, 1, 1, 1)
(1, 1, 2)
(1, 2, 1)
(1, 3)
(2, 1, 1)
(2, 2)
(3, 1)
Note that different sequences are counted as different combinations.

CONCEPTS :

- like fibonacci

*/



/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function(nums, target) {

    const dp = new Array(target + 1).fill(0);
    dp[0] = 1;

    for (let i = 1; i <= target; i++) {
        for (let num of nums) {
            // trying to solve for subset
            // so at i represents the values till target
            // so say I am solving for 1 first, then for 2 then for 3
            // till target
            // and for each I need a solution

            // so if the i value or subSet of target is lesser than num
            // or other way round....if num is greated than the subSet of target
            // then that num cannot be part of the solution
            // so we need to filter that out...no operation then

            // this condition can be true multiple times
            // hence adding to the same index the no of combinations
            if (num <= i) {
                dp[i] += dp[i - num];
            }

            //  if (i - num >= 0) {
            //     dp[i] += dp[i - num];
            // }
        }
    }

    return dp[target];

};