/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

// YOU dont have to find the point where the cycle is there
// Just that there is a cycle or not
// So consider that there is a race track and two people have different speeds
// first one is 20m/s and the second one is 40m/s
// If the race track is circular or cycle....then they will meet at some point in the track
// That is what u are trying to find...when they meet

/**
 * @param {ListNode} head
 * @return {boolean}
 * In this case we will use more space - o(n) this is not good
 */
var hasCycle = function (head) {
  let store = new Map();

  let runner = head;

  while (runner.next != null) {
    const value = runner.value;
    if (store.has(value)) {
      return true;
    } else {
      store.set(value, value);
      runner = runner.next;
    }
  }

  return false;
};

/*
    Fast and Slow pointer
    - Fast pointer will reach the null first, use that to exit the while
    - No Additional Space is required
*/

var hasCycle = function (head) {
  let slowPointer = head;
  let fastPointer = head.next;

  while (fastPointer && fastPointer.next) {
    slowPointer = slowPointer.next;
    fastPointer = fastPointer.next.next;

    if (slowPointer === fastPointer) {
      return true;
    }
  }

  return false;
};
