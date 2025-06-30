class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class LRUCache {
  #map;
  #head;
  #tail;

  constructor(capacity = 5) {
    this.capacity = capacity;

    this.#head = null; // Doubly Linked List
    this.#tail = null;

    this.#map = new Map();
    this.size = 0;
  }

  /*
    API methods
  */
  // take key and value and name the method as put
  add(value) {
    const node = new Node(value);
    if (this.isEmpty()) {
      this.#head = node;
      this.#tail = node;
      this.#map.set(value, this.#head);
      this.size++;
      return;
    }
    if (this.isFull()) {
      this.#removeLRUNode();
    }
    this.#addNewNode(node);
  }

  get(value) {
    const data = this.#map.get(value);
    if (data) {
      return data.value;
    }
    return null;
  }

  print() {
    let nodeList = [];
    let currentNode = this.#head;
    while (currentNode) {
      nodeList.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return nodeList;
  }

  /*
    Helper Methods
  */

  #addNewNode(node) {
    node.next = this.#head;
    this.#head.prev = node;
    this.#head = node;
    this.#map.set(node.value, this.#head);
    this.size++;
  }

  #removeLRUNode() {
    const lru = this.#tail;
    this.#map.delete(lru.value);
    this.#tail = this.#tail.prev;
    this.#tail.next = null;
    lru.prev = null;
    this.size--;
  }

  /*
    Utility Methods
  */

  isEmpty() {
    return this.#head == null;
  }

  isFull() {
    return this.size === this.capacity;
  }
}

/*

*/

const capacity = 3;
const lru = new LRUCache(capacity);

console.log(lru);

lru.add(2);
lru.add(3);
lru.add(4);
lru.add(5);
lru.add(6);

console.log(lru.print());
console.log(lru.get(2));
console.log(lru.get(4));
