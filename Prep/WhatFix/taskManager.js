class TaskManager {
  constructor(capacity) {
    this.capacity = capacity;
    this.onGoingJobs = 0;

    this.pendingTaskQueue = [];
  }

  addTask(task, ...args) {
    return new Promise((resolve, reject) => {
      async function taskRunner(...taskArgs) {
        this.onGoingJobs++;
        try {
          const result = await task.call(this, ...taskArgs);
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          this.onGoingJobs--;
          this.#runNextTask();
        }
      }

      if (this.#canRunTask()) {
        taskRunner.call(this, ...args);
      } else {
        this.pendingTaskQueue.push(taskRunner.bind(this, ...args));
      }
    });
  }

  /*
        Helper Methods
    */

  #runNextTask() {
    const nextTask = this.#getNextTask();
    if (nextTask) {
      nextTask();
    }
  }

  #getNextTask() {
    if (this.pendingTaskQueue.length) {
      return this.pendingTaskQueue.shift();
    }
    return null;
  }

  /*
        Utility Methods
    */

  #isEmpty() {
    return this.onGoingJobs === 0;
  }

  #canRunTask() {
    return this.onGoingJobs < this.capacity;
  }

  #isFull() {
    return this.onGoingJobs >= this.capacity;
  }
}

class AsyncTasks {
  constructor() {}

  getTask(delay) {
    return (...args) =>
      new Promise((resolve, reject) =>
        setTimeout(() => resolve(...args), delay)
      );
  }
}

const capacity = 2;
const manager = new TaskManager(capacity);

manager
  .addTask(new AsyncTasks().getTask(1 * 1000), 10)
  .then((res) => console.log(res))
  .catch((err) => console.log("First ", err));

manager
  .addTask(new AsyncTasks().getTask(4 * 1000))
  .then((res) => console.log(res))
  .catch((err) => console.log("Second ", err));

manager
  .addTask(new AsyncTasks().getTask(1 * 1000))
  .then((res) => console.log(res))
  .catch((err) => console.log("Third ", err));

manager
  .addTask(new AsyncTasks().getTask(1 * 1000))
  .then((res) => console.log(res))
  .catch((err) => console.log("Forth ", err));

manager
  .addTask(new AsyncTasks().getTask(1 * 1000))
  .then((res) => console.log(res))
  .catch((err) => console.log("Fifth ", err));
