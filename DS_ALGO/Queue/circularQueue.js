class CircularQueue {
  constructor(capacity = 0) {
    this.capacity = capacity;
    this.currentLength = 0;
    this.first = -1;
    this.tail = -1;

    this.queue = new Map();
  }

  isFull() {
    return this.currentLength === this.capacity;
  }

  isEmpty(){
    return this.currentLength === 0;
  }

  print() {
    let list = [];
    this.queue.forEach((item) => list.push(item));
    return list;
  }

  enqueue(item) {
    if (this.isFull()) {
      throw new Error("Circular queue is full");
    }

    if (this.first === -1) {
      this.first++;
    }

    this.tail++;
    this.currentLength++;
    this.queue.set(this.tail, item);
  }

  dequeue() {
    if (this.currentLength === 0) {
      throw new Error("Queue is Empty. Can't perform dequeue operation");
    }

    this.queue.delete(this.first);
    this.first++;
    this.currentLength--;

    if (this.isEmpty()) {
      this.first = -1;
      this.tail = -1;
    }
  }
}

/*

*/

let queue = new CircularQueue(2);
console.log(queue);

queue.enqueue(2);
queue.enqueue(1);

console.log(queue.print());

// queue.enqueue(1);

queue.dequeue();
console.log(queue.print());

queue.dequeue();
console.log(queue.print());
console.log(queue);

// queue.dequeue();