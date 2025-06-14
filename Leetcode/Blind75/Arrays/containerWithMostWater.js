/*
You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

CONCEPTS :

- Sliding window

- In this case u have to preserve the max product and not max value or min value like in other questions
- So in sliding window, forget about when to move things....
- focus on what needs to be done considering if window size is same as the whole list, write that code first
- In this case, that means, I need to find the xDiff => space between the two points in x axis
- I need to find the min of the height in the y axis
- I need to get the area
- Then I need to use Math.max, to update the new maxArea

- This is my core logic
- Now I need to figure out the logic, based on which I need to either update the start index value or end index value
- In this case, since I am using a for loop, the end index is automatically moving every step
- I need to figure out when to move the start index
- So basically, whenever I find a bigger height than the height at the start index, I will move the start index
- So, basically, start index is preserving the max height or y - axis index
- So u are actually find the maxValue in the given array in the start index
*/

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let maxArea = 0;

  let start = 0;

  for (let i = 1; i < height.length; i++) {
    if (height[i] > height[start]) {
      start++;
    }

    const distance = i - start;
    const minHeight = Math.min(height[start], height[i]);
    const product = distance * minHeight;

    maxArea = Math.max(maxArea, product);
  }

  return maxArea;
};

/*

Two Pointer Solution

*/

var maxArea = function (height) {
  let maxArea = 0;
  let left = 0;
  let right = height.length - 1;

  while (left < right) {
    maxArea = Math.max(
      maxArea,
      (right - left) * Math.min(height[left], height[right])
    );

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxArea;
};
