/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  let store = new Map();

  while (headA?.next || headB?.next) {
    if (store.has(headA) && headA) {
      return headA;
    } else if (store.has(headB) && headB) {
      return headB;
    } else {
      store.set(headA, headA);
      store.set(headB, headB);
    }

    headA = headA ? headA.next : headA;
    headB = headB ? headB.next : headB;
  }
};


/*
    Great Solution : https://leetcode.com/problems/intersection-of-two-linked-lists/solutions/1092898/js-python-java-c-easy-o-1-extra-space-solution-w-visual-explanation/

    Basically, we are adding

    So say A has the length of total 5, B has the length of total 6
    And then meet somewhere in between

    s0 we made -> newA = A + B => 11
               -> newB = B + A => 11
    Now the lengths are same, so keep iterating and if and where they meet/ intersect
    there we will have bot the head pointer match

*/

var getIntersectionNode = function(headA, headB) {
    let a = headA, b = headB
    while (a !== b) {
        // when A is exhanusted (null), then add B to it (headB)
        a = !a ? headB : a.next
        // when B is exhanusted (null), then add A to it (headA)
        b = !b ? headA : b.next
    }
    return a
};