/*
Given an integer array nums, return the length of the longest strictly increasing subsequence.

Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.

Input: nums = [0,1,0,3,2,3]
Output: 4



*/

/**
 * @param {number[]} nums
 * @return {number}
 */
// This alog works if there are no duplicates
/*
- track the minVal, maxVal and their indexes
- if the distance between the minIndex and maxIndex is increasing...keep checcking in maxLength
- If duplicate minVal is found, then skip it, as we want the minIndex for minVal
- for maxVal, if there is duplicate, then update the maxIndex as we want the max value for the index for maxLength

- This logic fails for duplicates

*/
var lengthOfLIS2 = function (nums) {
  let start = 0;
  let minVal = nums[0];
  let maxVal = nums[0];

  let minIndex = 0;
  let maxIndex = 0;

  let maxLength = 1;

  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];

    if (minVal >= num) {
      if (minVal === num) {
        continue;
      }

      minVal = num;
      minIndex = i;
    }

    if (maxVal <= num) {
      maxVal = num;
      maxIndex = i;
    }

    maxLength = Math.max(maxLength, maxIndex - minIndex);
  }

  return maxLength;
};

/*

CONCEPTS :

- Binary Search

- create another array where u keep putting the numbers in sorted manner
- if u find a number that is lower than the last value of this new sorted array
- then do a binary search to figure out the index where u should replace this number in the sorted array

- now, we have created a new array, but I suppose u can do that same by updating the same array list
- perform the binary search on the left side of the array
- as the maxLength found will always be lesser of same as the length of the original array

*/

var lengthOfLIS = function (nums) {
  const res = [];

  const binarySearch = (arr, target) => {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] === target) {
        return mid; // if there is duplicate value, then at mid you will replace again
      } else if (arr[mid] > target) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return left; // left will point to the index where the value to be relaced
    // why ? at this index, u have a value that is lesser than the target
    // else you would find the index in the while loop itself.
    // if its not found in the while loop, then it will be the left index that works
  };

  for (const n of nums) {
    if (!res.length || res[res.length - 1] < n) {
      res.push(n);
    } else {
      const idx = binarySearch(res, n); // find where to put the number in the sorted list
      res[idx] = n; // replace the number
    }
  }

  return res.length;
};

const nums = [1, 5, 6, 3, 10, 4];

const result = lengthOfLIS(nums);
console.log(result);
