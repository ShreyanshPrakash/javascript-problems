/*
Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, 
find two numbers such that they add up to a specific target number. 
Let these two numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length.

Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.

The tests are generated such that there is exactly one solution. 
You may not use the same element twice.

Your solution must use only constant extra space.

*/

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 * This solution still uses a o(N) space
 */
var twoSum = function (numbers, target) {
  let store = new Map();

  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];
    const diff = target - num;
    if (store.has(diff)) {
      return [store.get(diff), i + 1];
    }

    store.set(num, i + 1);
  }

  return [];
};

/*
    Since its a sorted list, we can use two pointers to solve
*/

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  let start = 0;
  let end = numbers.length - 1;

  while (start < end) {
    const sum = numbers[start] + numbers[end];
    if (sum === target) {
      return [start + 1, end + 1];
    }

    if (sum > target) {
      end--;
    } else {
      start++;
    }
  }

  return [];
};
