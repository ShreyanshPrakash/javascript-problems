class Node {
  constructor(value) {
    this.next = null;
    this.prev = null;
    this.value = value || null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.store = new Map();
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  get(key) {
    return this.store[key];
  }

  set(key, value) {
    this.store[key] = value;
  }

  getStore() {
    return this.store;
  }
}

const capacity = 2;
const lruChahe = new LRUCache(capacity);

lruChahe.set(1, 1);
lruChahe.set(2, 2);
lruChahe.set(3, 3);
lruChahe.set(4, 4);

let result = lruChahe.get(1);
console.log(result);

let store = lruChahe.getStore();
console.log(store);
