
/*
33. Search in Rotated Sorted Array

There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.

Rotate basically mean we shifter values leftwards a given no of times....

say arr         [1,2,3,4,5,6,7,8] is rotated 4 times
first time =>   [2,3,4,5,6,7,8,1]
second time =>  [3,4,5,6,7,8,1,2]
third time =>   [4,5,6,7,8,1,2,3]
fourth time =>  [5,6,7,8,1,2,3,4] final


CONCEPTS :

- Binary Search Modified
*/


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

// This solution works only when all the fields have the all natural numbers
var search = function(nums, target) {

    const len = nums.length;

    const valueAtTarget = nums[target];
    const valueAtRotatedTarget = nums[valueAtTarget];

    if(valueAtRotatedTarget === target){
        return valueAtTarget;
    }

    return -1;

};


/*
    Secondarty Solution 
    Using Binary Search technique
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {

    
    let start = 0;
    let end = nums.length - 1;

    while(start <= end){

        const mid = start + (end - start) / 2;

        if(target === nums[mid]){
            return mid;
        }else if(target === nums[start]){
            return start;
        }else if(target === nums[end]){
            return end;
        }else {
             if(target > nums[start]){
                end = mid - 1;
            }else{
                start = mid + 1;
            }
        }

    }    

    return -1;


};