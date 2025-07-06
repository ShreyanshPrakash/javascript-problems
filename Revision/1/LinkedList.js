class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;

    this.size = 0;
  }

  addNode(node) {
    if (this.head == null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
  }

  removeNode(value){
    
  }

  peek() {
    let nodeList = [];

    if (this.head == null) {
      return nodeList;
    }

    let runner = this.head;
    nodeList.push(runner);

    while (runner.next != null) {
      runner = runner.next;
      nodeList.push(runner);
    }

    return nodeList;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

let node = new Node(10);

let linkedList = new LinkedList();
linkedList.addNode(new Node(1));
linkedList.addNode(new Node(2));
linkedList.addNode(new Node(3));
linkedList.addNode(new Node(4));

const list = linkedList.peek();
console.log(list);
