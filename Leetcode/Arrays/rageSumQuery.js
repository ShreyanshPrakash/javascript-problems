


/*

Given an integer array nums, handle multiple queries of the following type:

Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.

*/


var NumArray = function(nums) {
    
    this.size = nums.length; //stores length of array
    this.prefixSum = Array( nums.length ).fill( 0 );//empty array
    this.prefixSum[0] = nums[0];//first value of prefix sum is the same as that of the first element of nums
    
    for( let i = 1; i < this.size ; i++ ){//traverse from left to right of array nums
        this.prefixSum[i] = this.prefixSum[i-1] + nums[i];
        /*stores sum of current value(nums) + previous sum value 
        at the index before it(prefixsum)*/
    }
    
    
};

/** 
 * @param {number} left 
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function(left, right) {
    
    if( left == 0 ){
        /* if left index isnt mentioned then we return the 
        sum up till the right index from the prefix sum array */
        return this.prefixSum[right];
    }else{
        //if the left index is given, then return the sum up 
        //till the right index minus the value of prefix sum at 
        //the index before the given left index i.e. value 
        //at the (left - 1) index
        return this.prefixSum[right] - this.prefixSum[left-1];
        // Why we go left - 1 ?
        // [MAIN] : Because we want inclusive of the left value
        // when the left value says 3, we want to include the value at index 3
        // so left points to the value at index 3, but if we want to include that value
        // into the sum...then we should go one index before....
        // think of it as if we are splitting the array....
        // if say the array has length of 10 [0,1,2,3,4,5,6,7,8,9]
        // and the range give is left => 3, right => 5
        // since we want to inclue the 3rd index value....
        // array will be split like => [1,2] [3,4,5] [6,7,8,9]
    }
    
    
};
