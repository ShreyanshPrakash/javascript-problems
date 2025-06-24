class TaskScheduler {
  constructor(capacity) {
    this.capacity = capacity;

    this.taskQueue = [];
    this.runningTaskCount = 0;

    this.addTask.bind(this);
  }

  addTask(task, ...args) {
    // why using promise ?
    // Benifit of using promise it that 
    // first, u can do .then/ catch on the addtask method
    // you dont have to worry about returning result or error
    // u can just call resolve or reject
    // Hence, once u add to the queue, and then shift it back...
    // kind of becomes difficult to return the result
    return new Promise((resolve, reject) => {
      async function taskRunner() {
        this.runningTaskCount++;
        try {
          const result = await task(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          this.runningTaskCount--;
          this.runNextTask();
        }
      }

      if (this.canRunTask()) {
        taskRunner.call(this);
      } else {
        this.taskQueue.push(taskRunner.bind(this));
      }
    });
  }

  /*
        Utility Methods
    */

  getNextTask() {
    if (!this.isTaskQueueEmpty() && this.canRunTask()) {
      return this.taskQueue.shift();
    }
  }

  runNextTask() {
    const nextTask = this.getNextTask();
    if (nextTask) {
      nextTask();
    }
  }

  isTaskQueueEmpty() {
    return this.taskQueue.length === 0;
  }

  canRunTask() {
    return this.runningTaskCount < this.capacity;
  }
}

class AsyncTask {
  constructor() {}

  getTask(delay) {
    return () =>
      new Promise((res) =>
        setTimeout(() => {
          //   console.log(res);
          res("Task");
        }, delay)
      );
  }
}

const limit = 2;
const scheduler = new TaskScheduler(2);

scheduler
  .addTask(new AsyncTask().getTask(1 * 1000))
  .then((res) => console.log("1 ", res));
scheduler
  .addTask(new AsyncTask().getTask(1 * 1000))
  .then((res) => console.log("2 ", res));
scheduler
  .addTask(new AsyncTask().getTask(1 * 1000))
  .then((res) => console.log("3 ", res));
scheduler
  .addTask(new AsyncTask().getTask(1 * 1000))
  .then((res) => console.log("4 ", res));
scheduler
  .addTask(new AsyncTask().getTask(1 * 1000))
  .then((res) => console.log("5 ", res));
// scheduler.addTask(new AsyncTask().getTask(1 * 2000));
// scheduler.addTask(new AsyncTask().getTask(1 * 1000));
// scheduler.addTask(new AsyncTask().getTask(1 * 2000));
