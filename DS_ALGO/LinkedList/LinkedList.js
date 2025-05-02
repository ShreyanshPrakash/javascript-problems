class Node {
  constructor(value) {
    this.value = value || null;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.last = null;
  }

  add(node) {
    if (this.head == null) {
      this.last = node;
      this.head = node;
    } else {
      this.last.next = node;
      this.last = node;
    }
  }

  remove(value) {
    const runner = this.head;

    if(this.head.value === value){
        this.head = this.head.next;
        return;
    }

    while (runner.next !== null) {
      if (runner.next.value === value) {
        runner.next = runner.next.next;
        break;
      } else {
        runner = runner.next;
      }
    }
  }
}
