
/*
    Used Map/ Object to create the queue
    If we would have used arrays, then whenever we will dequeue using shift
    then the whole array items will shift one by one to the left
    that is time complexity of almost n - 1
*/

class Queue{
    constructor(){
        this.size = 0;
        this.first = -1;
        this.tail = -1;
        this.queue = new Map();
    }


    enQueue(item){
        this.tail++;
        this.queue.set(this.tail, item);
        this.size++;
        if(this.first === -1){
            this.first++;
        }
    }

    deQueue(){
        // FIFO
        this.queue.delete(this.first);
        this.size--;
        if(this.size === 0){
            this.first = -1;
            this.tail = -1;
        }
    }

    print(){
        let list = [];
        this.queue.forEach(item => list.push(item));
        return list;
    }
}


/*
*/

let queue = new Queue();
console.log(queue.print());

queue.enQueue(2);
console.log(queue.print());

queue.enQueue(1);
console.log(queue.print());
console.log(queue);

queue.deQueue();
console.log(queue.print());

