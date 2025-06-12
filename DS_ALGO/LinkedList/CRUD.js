class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null; // Many implementations wont have the tail

    this.length = 0;
  }

  addNode(node) {
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
  }

  findNodeByValue(value) {
    let runner = this.head;

    while (runner) {
      if (runner.value === value) {
        return runner;
      }
      runner = runner.next;
    }

    return null;
  }

  removeNodeByValue(value) {
    if (this.head.value === value) {
      this.head = runner.next;
      this.length--;
      return;
    }

    let runner = this.head;

    while (runner.next) {
      if (runner.next.value === value) {
        if (runner.next === this.tail) {
          this.tail = runner;
        }

        runner.next = runner.next.next;
        this.length--;
        return;
      }
      runner = runner.next;
    }
  }

  peek() {
    let runner = this.head;
    let nodeList = [];

    while (runner) {
      nodeList.push(runner.value);
      runner = runner.next;
    }

    return nodeList;
  }

  /*
    Additional Functionalities
  */

  reverse() {
    let prev = null;
    let runner = this.head;
    this.tail = this.head;

    while (runner) {
      this.head = runner;
      let temp = runner.next; // preserving the rest of the linked list
      runner.next = prev; // reversing the direction at this node
      prev = runner; // updating the prev node to current nodfe before moving to next node
      runner = temp; // moving to the next node
    }
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

/*
 */

let linkedList = new LinkedList();

linkedList.addNode(new Node(1));
linkedList.addNode(new Node(2));
linkedList.addNode(new Node(3));
linkedList.addNode(new Node(4));

const nodeList = linkedList.peek();
console.log(nodeList);

// const match = linkedList.findNodeByValue(3);
// console.log(match);

// linkedList.removeNodeByValue(4);
// console.log(linkedList.peek());

// console.log(linkedList);

linkedList.reverse();
console.log(linkedList.peek());