/*

Given an integer array nums, find a subarray that has the largest product, and return the product.

Input: nums = [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.

CONCEPTS :

- Sliding Window

- So, use for loop to runn the second pointer i
- use start to keep the first pointer
- MAIN : when the product decreases, thats the condition when start/ first pointer should move
- Now, we should do other things as well when this condition is met
- we keep a resultProduct => the final value
- we keep maxProduct or just product which the product of the subarray
- when the condition is met, we move the maxProduct to result product as that is the max as of now
- and we reset the maxProduct to 1

- MAIN : we also check for the max, before returning as the maxProduct can still hold some value
- Better check if the value hold by maxProduct is bigger than the result product
- Why ? cause say u got a dip in the product somewhere mid of the array
- Now, after that u reset and started calculation again
- And on keep doing so the value became bigger than the resultProduct.
- But since it never again dipped, it wont enter the if statement and no trasfer will happen

*/

/**
 * @param {number[]} nums
 * @return {number}
 * Wrong solution
 */
var maxProduct = function (nums) {
  let start = 0;
  let maxProduct = nums[0];

  let resultProduct = maxProduct;

  for (let i = 1; i < nums.length; i++) {
    let currItem = nums[i];
    let newProduct = maxProduct * currItem;

    if (newProduct < maxProduct) {
      start++; // or start = i
      resultProduct = maxProduct;
      maxProduct = 1;
    }

    maxProduct = Math.max(maxProduct, newProduct);
  }

  return Math.max(maxProduct, resultProduct);
};



/*

The key to solving this problem is understanding how negative numbers and zero affect the product of a subarray. 
A single negative number can turn the smallest product into the largest if multiplied correctly, 
so we must track both the maximum and minimum products at each step.

CONCEPTS :

- Normalla
- Basic idea is that if u multiple -ve with -ve it becomes positive
- If you multiply +ve with +ve, it becomes positive
- So u need to keep track of both the min and max product
- in line 82, 
    either the new prod with be bigger, 
    if the n is -ve there, then maybe -ve * -ve will become max
    else, it might be that the current index value itself is bigger than the product
    we need all to determine the max product
- Among the above three category, find the max and min value and keep going


The intuition is that we store the information about our previous maximum product, 
and as we iterate through the array, we keep using our previous maximum to calculate 
the new maximum product.
The tricky part of this problem is that negative numbers exist in the input array. 
This causes situations where the smallest previous product (a negative number) can become 
the largest product if the next number in line is also a negative number.
Since the minimum product may have a chance to become the maximum, we need to store 
the information about the previous minimum as well and take it into account 
when we are calculating our maximum product.
*/


var maxProduct = function(nums) {
    let res = nums[0];
    let curMaxPrd = 1, curMinPrd = 1;

    for (let n of nums) {
        let prod = curMaxPrd * n;
        // all the items in side the max method are basically options..
        // either the new prod calculate will be the new Max
        // or say current num is -ve and currMin is also -ve, hence thier product might be max
        // finally, the number itself can be bigger than both other available options
        curMaxPrd = Math.max(prod, curMinPrd * n, n);
        curMinPrd = Math.min(prod, curMinPrd * n, n);
        // the only reason we are calculating the minPrd also is because a min -ve value
        // can become the max value if the next value is also negative...
        // hence we consider the minPrd when we determine the maxPrd

        res = Math.max(res, curMaxPrd);
    }

    return res;    
};