class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class MyLRUCache2 {
  #map;
  #head;
  #tail;
  #size;

  constructor(capacity) {
    this.capacity = capacity;

    this.#map = new Map();

    this.#head = null;
    this.#tail = null;
    this.#size = 0;
  }

  put(key, value) {
    if (this.#map.has(key)) {
      this.#deleteANode(key, this.#map.get(key));
    }

    let node = new Node(key, value);

    if (this.#isEmpty()) {
      this.#head = node;
      this.#tail = node;
      this.#size++;
      this.#map.set(key, node);
      return;
    }

    if (this.#isFull()) {
      this.#deleteANode(this.#tail.key, this.#tail);
    }

    this.#addANode(key, node);
  }

  get(key) {
    return this.#map.get(key) || null;
  }

  print() {
    let currentNode = this.#head;
    let list = [];

    while (currentNode) {
      list.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return list;
  }

  /*
        Utility Methods
    */

  #addANode(key, node) {
    this.#head.prev = node;
    node.next = this.#head;
    this.#head = node;
    this.#map.set(key, node);
    this.#size++;
  }

  #deleteANode(key, node) {
    if (this.#head === node) {
      this.#head = this.#head.next;
      node.next.prev = null;
      node.next = null;
    } else if (this.#tail === node) {
      this.#tail = this.#tail.prev;
      node.prev.next = null;
      node.prev = null;
    } else {
      node.prev.next = node.next;
      node.next.prev = node.prev;
      node.next = null;
      node.prev = null;
    }

    this.#map.delete(key);
    this.#size--;
  }

  #isEmpty() {
    return this.#head === null && this.#tail === null && this.#size === 0;
  }

  #isFull() {
    return this.#size === this.capacity;
  }
}

const capacity = 2;
const lru = new MyLRUCache2(capacity);

lru.put("1", 1);
lru.put("2", 2);
lru.put("3", 3);

console.log(lru.get("2"));

console.log(lru.print());
