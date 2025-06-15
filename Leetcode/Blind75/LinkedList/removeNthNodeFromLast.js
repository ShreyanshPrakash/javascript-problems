

/*

Given the head of a linked list, remove the nth node from the end of the list and return its head.

CONCEPTS :

- Added a dummy node before head
- This helps in the cases where there are only one node

- Now, we will have a slow and afast pointer
- First, we will move the fast pointer from 0 to n
- Then we keep moving both the pointer till fast pointer becomes null
- This means that fast has reached the end of linked list
- Remember that fast was ahead by n from the slow
- so once it reaches the end of linkedList, the slow is now at just before the nth node
- So now, u can just remove the next node

- return the dummy.next which is the head initially given

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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    const dummy = new ListNode(0);
    dummy.next = head;

    let slow = dummy;
    let fast = dummy;

    for(let i = 0; i <= n; i++){
        fast = fast.next;
    }

    while(fast !== null){
        slow = slow.next;
        fast = fast.next;
    }

    slow.next = slow.next.next

    return dummy.next;

    
};