/*

You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6

CONCEPTS :

- Merge two sorted linked list

- Basically, u will iterate over the list of linked list 
- pick two list every time and merge them
- the merged list is added back to the initial lists array
- keep doing this till u have a single list

*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  if (lists.length === 0) {
    return null;
  }
  // Take two out of the list and merge them
  // then push the merged list back to the lists
  /// at the end all the lists are merged to 1 list
  // exit then while loop and the result is lists[0]
  while (lists.length > 1) {
    let a = lists.shift();
    let b = lists.shift();
    const merged = mergeLists(a, b);
    lists.push(merged);
  }

  return lists[0];
};

// Logic to merge two lists
function mergeLists(a, b) {
  // creating a node as the starting point of the third or merged list
  // keep adding the nodes from a or b to the next of this node
  // then return the dummy.next , which would skip the first dummy node
  let dummy = new ListNode(0);
  let temp = dummy; // third node...merged list

  while (a !== null && b !== null) {
    if (a.val < b.val) {
      temp.next = a;
      a = a.next;
    } else {
      temp.next = b;
      b = b.next;
    }
    // [IMP] : Once a node is added, I need to move and point to the added node
    temp = temp.next;
  }

  if (a !== null) {
    temp.next = a;
  }
  if (b !== null) {
    temp.next = b;
  }

  return dummy.next;
}
