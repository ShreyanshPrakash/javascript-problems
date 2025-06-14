// Needs a sorted array to work
function binarySearch(nums, target) {
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    const mid = start + Math.floor((end - start) / 2);

    let itemAtMid = nums[mid];

    if (itemAtMid < target) {
      start = mid + 1;
    } else if (itemAtMid > target) {
      end = mid - 1;
    } else {
      return mid;
    }
  }

  return -1;
}

/*
 */

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const target = 5;

const result = binarySearch(nums, target);
console.log(result);
