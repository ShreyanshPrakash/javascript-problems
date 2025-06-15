/*

You are given the head of a singly linked-list. The list can be represented as:

L0 → L1 → … → Ln - 1 → Ln
Reorder the list to be on the following form:

L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
You may not modify the values in the list's nodes. Only nodes themselves may be changed.

CONCEPTS :

- Reversing a linked list
- Finding the mid of linkedlist

- In this case we need to reverse the second half of the linked list
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
  if (!head || !head.next) return;

  let slow = head;
  let fast = head;

  // fast ism moving twice the speed...
  // hence mid will be half of it
  // hence I need to check if I can take two more steps
  // if yes then only I will increase the mid value
  // else, it might be odd case....and mid stays
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // reverse the second half
  let prev = null;
  let curr = slow.next;
  while (curr) {
    // not .next as I need to reverse the .next of every node
    let nextNode = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextNode;
  }
  slow.next = null;
  // slow still points to the mid of the list
  // so now that I have reversed the linked list, there will be a cycle
  // so make it null to break apart the linkedlist

  // after above, the prev will have the second half
  // that two from the other direction as we have reversed the second half
  // so 6 -> 5 -> 4 -> null

  // Merge the two halves
  let p1 = head;
  let p2 = prev;
  while (p1 && p2) {
    let nextP1 = p1.next;
    let nextP2 = p2.next;

    p1.next = p2;
    p2.next = nextP1;

    p1 = nextP1;
    p2 = nextP2;
  }
};
