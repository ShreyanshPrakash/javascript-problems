class Node {
  constructor(key, value) {
    this.value = value;
    this.key = key;
    this.next = null;
    this.prev = null;
  }
}

class LRUCacheTry {
  #head;
  #tail;

  constructor(capacity) {
    this.capacity = capacity;

    this.#head = null;
    this.#tail = null;

    this.size = 0;
    this.map = new Map();
  }

  put(key, value) {
    const node = new Node(key, value);
    if (this.isEmpty()) {
      this.#head = node;
      this.#tail = node;
      this.size++;
      this.map.set(key, node);
      return;
    }

    if (this.map.has(key)) {
      this.update(key, value);
      return;
    }

    if (this.isFull()) {
      this.#removeLRUNode();
    }

    this.#insertNode(node);
  }

  get(key) {
    if (this.map.has(key)) {
      return this.map.get(key).value;
    }
    return null;
  }

  update(key, value) {
    this.delete(key);
    this.put(key, value);
  }

  delete(key) {
    if (this.map.has(key)) {
      const node = this.map.get(key);

      if (node.key === this.#head.key) {
        this.#head = this.#head.next;
        this.#head.prev.next = null;
        this.#head.prev = null;
      } else if (node.key === this.#tail.key) {
        this.#tail = this.#tail.prev;
        this.#tail.next.prev = null;
        this.#tail.next = null;
      } else {
        let prevNode = node.prev;
        let nextNode = node.next;
        prevNode.next = nextNode;
        nextNode.prev = prevNode;
      }

      node.next = null;
      node.prev = null;

      this.map.delete(key);
      this.size--;
    }
  }

  print() {
    let currentNode = this.#head;
    let list = [];
    while (currentNode) {
      list.push({ key: currentNode.key, value: currentNode.value });
      currentNode = currentNode.next;
    }
    return list;
  }

  /*
        Helper Methods
    */

  #insertNode(node) {
    node.next = this.#head;
    this.#head.prev = node;
    this.#head = node;
    this.size++;
    this.map.set(node.key, node);
  }

  #removeLRUNode() {
    this.map.delete(this.#tail.key);
    this.#tail = this.#tail.prev;
    this.#tail.next.prev = null;
    this.#tail.next = null;
    this.size--;
  }

  /*
        Utility Methods
    */

  isEmpty() {
    return this.size === 0;
  }

  isFull() {
    return this.size >= this.capacity;
  }
}

const capacity = 3;
const lru = new LRUCacheTry(capacity);

lru.put("name", 2);
lru.put("id", 3);
lru.put("index", 4);
lru.put("index2", 5);
lru.put("index2", 7);
lru.put("index3", 7);

console.log(lru.print());
