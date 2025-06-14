/*
Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:

[4,5,6,7,0,1,2] if it was rotated 4 times.
[0,1,2,4,5,6,7] if it was rotated 7 times.
Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

Given the sorted rotated array nums of unique elements, return the minimum element of this array.

You must write an algorithm that runs in O(log n) time.

Same as searchRotated question

CONCEPTS :

- Modified Binary Search

- In this u are not getting any target to check against
- Ur target is the minValue variable....u will store them minimum value there
- find the mid
- u need mid just to help shifting start and end index nothing else
- if start index value is less than the end index value, then move end index to mid - 1
- if end index value is less than the start index value, then move start index to mid + 1
- now, find the min between => current minValue, value at start index, value at end index
- store that in the minValue variable 

*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  let minValue = nums[0];

  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    const mid = start + Math.floor((end - start) / 2);

    if (nums[start] < nums[end]) {
      end = mid - 1;
    } else if (nums[start] > nums[end]) {
      start = mid + 1;
    } else {
      return minValue;
    }
    minValue = Math.min(minValue, nums[start], nums[end]);
  }

  return minValue || 0;
};
