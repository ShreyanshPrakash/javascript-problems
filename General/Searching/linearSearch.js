function linearSearch(nums, target) {
  const len = nums.length;

  for (let i = 0; i < len; i++) {
    let num = nums[i];

    if (num === target) {
      return i;
    }
  }

  return -1;
}

/*
 */

const nums = [1, 2, 3, 4, 5, 6];
const target = 4;

const result = linearSearch(nums, target);
console.log(result);
