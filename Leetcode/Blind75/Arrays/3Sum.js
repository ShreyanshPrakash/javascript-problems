/*

Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.

CONCEPTS :

- Fix one of the item, then the problem becomes a two sum problem
- U can then consider the fixed item as kind of the target



*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 * wrong solution
 */
var threeSum = function (nums) {
  let res = [];
  let fix = nums[0];
  let store = new Map();

  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];
    const numToCheck = -(fix + num);

    if (store.has(num)) {
      res.push([fix, nums[store.get(num)], num]);
    }

    store.set(numToCheck, i);
  }

  console.log(store);

  return res;
};








/*
    A lot of comments
*/




function threeSum(nums) {
	const results = []

	// obviously irrelevant if we don't have at least 3 numbers to play with!
	if (nums.length < 3) return results

	// having the numbers in ascending order will make this problem much easier.
	// also, knowing the overall problem  will take at least O(N^2) time, we can
	// afford the O(NlogN) sort operation
	nums = nums.sort((a, b) => a - b)

    // if the question asks us for a custom target, we can control it here
	let target = 0

	for (let i = 0; i < nums.length - 2; i++) {
		// `i` represents the "left" most number in our sorted set.
		// once this number hits 0, there's no need to go further since
		// positive numbers cannot sum to a negative number
		if (nums[i] > target) break

		// we don't want repeats, so skip numbers we've already seen
		if (i > 0 && nums[i] === nums[i - 1]) continue

		// `j` represents the "middle" element between `i` and `k`.
		// we will increment this up through the array while `i` and `k`
		// are anchored to their positions. we will decrement `k` for
		// for each pass through the array, and finally increment `i`
		// once `j` and `k` meet.
		let j = i + 1

		// `k` represents the "right" most element
		let k = nums.length - 1
		
		// to summarize our setup, we have `i` that starts at the beginning,
		// `k` that starts at the end, and `j` that races in between the two.
		//
		// note that `i` is controlled by our outer for-loop and will move the slowest.
		// in the meantime, `j` and `k` will take turns inching towards each other depending
		// on some logic we'll set up below. once they collide, `i` will be incremented up
		// and we'll repeat the process.

		while (j < k) {
			let sum = nums[i] + nums[j] + nums[k]

			// if we find the target sum, increment `j` and decrement `k` for
			// other potential combos where `i` is the anchor
			if (sum === target) {
				// store the valid threesum
				results.push([nums[i], nums[j], nums[k]])

				// this is important! we need to continue to increment `j` and decrement `k`
				// as long as those values are duplicated. in other words, we wanna skip values
				// we've already seen. otherwise, an input array of [-2,0,0,2,2] would result in
				// [[-2,0,2], [-2,0,2]].
				//
				// (i'm not a fan of this part because we're doing a while loop as we're
				// already inside of another while loop...)
				while (nums[j] === nums[j + 1]) j++
				while (nums[k] === nums[k - 1]) k--

				// finally, we need to actually move `j` forward and `k` backward to the
				// next unique elements. the previous while loops will not handle this.
				j++
				k--

			// if the sum is too small, increment `j` to get closer to the target
			} else if (sum < target) {
				j++

			// if the sum is too large, decrement `k` to get closer to the target
			} else { // (sum > target)
				k--
			}
		}
	}

	return results
};



/**
 * @param {number[]} nums
 * @return {number[][]}
 * Better
 */
var threeSum = function(nums) {

    let res = [];
    nums.sort((a,b) => a - b); // sort so that u can use two pointers reliably


    for(let i = 0; i < nums.length; i++){
		// if there is a duplicate, then skip that
        if( i > 0 && nums[i] === nums[i - 1]){
            continue;
        }


        let j = i + 1; // left pointer
        let k = nums.length - 1; // right pointer


        while(j < k){

            let total = nums[i] + nums[j] + nums[k];

            if(total > 0){
                k--;
            }else if(total < 0){
                j++;
            }else{
                res.push([nums[i], nums[j], nums[k]]);
                j++; // Must incrmenet j

				// if there is duplicate, then skip..
				// j will always be 1 step ahead of i...
				// even though u have code to skip duplicate for i...
				// that will be till ith value
				// here I can iterate over till all duplicates are skipped
                while(nums[j] === nums[j - 1] && j < k){
                    j++;
                }

            }


        }


    }

    return res;
};